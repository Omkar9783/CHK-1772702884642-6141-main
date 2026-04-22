import os
import uvicorn
import numpy as np
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

# ── TensorFlow ────────────────────────────────────────────────────────────────
try:
    import tensorflow as tf
    TENSORFLOW_AVAILABLE = True
    print("✅ TensorFlow loaded successfully")
except Exception as e:
    TENSORFLOW_AVAILABLE = False
    print(f"⚠️  TensorFlow unavailable ({e}) – running in mock mode")

app = FastAPI(title="CropCare AI Diagnosis Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "crop_disease_model_new.h5" if os.path.exists("crop_disease_model_new.h5") else "crop_disease_model.h5"
LABELS_PATH = "labels_new.txt" if os.path.exists("labels_new.txt") else "labels.txt"

model = None
labels = []

from recommendations import get_recommendations

# Minimum confidence to accept a prediction as a valid crop image
CONFIDENCE_THRESHOLD = 0.10

# Label that signals the image has no leaf / is not a crop photo
NON_LEAF_LABEL = "Background_without_leaves"


def load_resources():
    global model, labels

    if os.path.exists(LABELS_PATH):
        with open(LABELS_PATH, "r") as f:
            labels = [line.strip() for line in f.readlines() if line.strip()]
        print(f"✅ Labels loaded: {len(labels)} classes")

    if TENSORFLOW_AVAILABLE and os.path.exists(MODEL_PATH):
        model = tf.keras.models.load_model(MODEL_PATH)
        print(f"✅ Model loaded from {MODEL_PATH}")
    else:
        print("⚠️  Model not loaded – demo mode active (run train.py to train the model)")


@app.on_event("startup")
async def startup_event():
    load_resources()


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img).astype(np.float32)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


from fastapi import FastAPI, UploadFile, File, HTTPException, Form

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    lang: str = Form("en")
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image (JPEG, PNG, etc.)")

    try:
        contents = await file.read()
        processed_image = preprocess_image(contents)

        if model is not None:
            # ── Real model inference ──────────────────────────────────────────
            predictions = model.predict(processed_image, verbose=0)
            class_idx = int(np.argmax(predictions[0]))
            confidence = float(np.max(predictions[0]))
            disease_label = labels[class_idx] if labels else f"Class_{class_idx}"

            # ── Crop / leaf validation ────────────────────────────────────────
            # Reject if confidence is too low (not a recognisable crop image)
            if confidence < CONFIDENCE_THRESHOLD:
                raise HTTPException(
                    status_code=422,
                    detail=(
                        "Image does not appear to contain a crop leaf. "
                        "Please upload a clear, close-up photo of a plant leaf."
                    ),
                )

            # Reject if the model thinks there is no leaf at all
            if NON_LEAF_LABEL in disease_label:
                raise HTTPException(
                    status_code=422,
                    detail=(
                        "No crop leaf detected in the image. "
                        "Please upload a photo that clearly shows a plant leaf."
                    ),
                )

        else:
            # ── Demo / mock fallback (model not trained yet) ──────────────────
            disease_label = "Tomato___Early_blight"
            confidence = 0.91

        crop_name = disease_label.split("___")[0].replace("_", " ")
        disease_name = disease_label.split("___")[-1].replace("_", " ") if "___" in disease_label else disease_label

        severity = "Mild" if confidence > 0.90 else "Moderate" if confidence > 0.70 else "Severe"
        
        # Using the new disease-specific recommendations engine
        recommendations = get_recommendations(disease_label, lang)
        
        # Override original names with translated/formatted names from recommendations
        if "disease_name" in recommendations:
            disease_name = recommendations["disease_name"]

        # Base description
        description_text = (
            f"AI analysis detected '{disease_name}' on {crop_name} "
            f"with {confidence * 100:.1f}% confidence."
        )

        # Translate description if necessary
        if lang != "en":
            from deep_translator import GoogleTranslator
            try:
                translator = GoogleTranslator(source="en", target=lang)
                description_text = translator.translate(description_text)
                
                # Also translate crop name
                crop_name = translator.translate(crop_name)
                
                # severity translation
                severity = translator.translate(severity)
            except Exception as e:
                print(f"Error translating description/names: {e}")

        return {
            "success": True,
            "cropName": crop_name,
            "diseaseName": disease_name,
            "confidence": f"{confidence * 100:.1f}%",
            "confidenceScore": confidence, # Passing raw float for the UI meter
            "severity": severity,
            "description": description_text,
            "symptoms": recommendations.get("symptoms", ""),
            "cause": recommendations.get("cause", ""),
            "recommendations": {
                "biological": recommendations.get("biological", []),
                "chemical": recommendations.get("chemical", []),
                "preventive": recommendations.get("preventive", [])
            },
        }


    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "model_loaded": model is not None,
        "tensorflow_available": TENSORFLOW_AVAILABLE,
        "num_classes": len(labels),
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
