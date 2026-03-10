import os
import uvicorn
import numpy as np
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
# Real model is now trained, enabling TensorFlow inference!
TENSORFLOW_AVAILABLE = True

if TENSORFLOW_AVAILABLE:
    try:
        import tensorflow as tf
    except Exception as e:
        print(f"Warning: TensorFlow could not be initialized ({e})")
        TENSORFLOW_AVAILABLE = False
else:
    print("Backend running in optimized demo mode (ML inference disabled to prevent system conflicts)")

app = FastAPI(title="CropCare AI Diagnosis Engine")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "crop_disease_model.h5"
LABELS_PATH = "labels.txt"

# Global variables for model and labels
model = None
labels = []

def load_resources():
    global model, labels
    if TENSORFLOW_AVAILABLE and os.path.exists(MODEL_PATH):
        try:
            model = tf.keras.models.load_model(MODEL_PATH)
            print(f"Model loaded from {MODEL_PATH}")
        except Exception as e:
            print(f"Error loading model: {e}")
    
    if os.path.exists(LABELS_PATH):
        with open(LABELS_PATH, "r") as f:
            labels = [line.strip() for line in f.readlines()]
        print(f"Labels loaded: {len(labels)} classes")

@app.on_event("startup")
async def startup_event():
    load_resources()

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        contents = await file.read()
        processed_image = preprocess_image(contents)
        
        if model:
            predictions = model.predict(processed_image)
            class_idx = np.argmax(predictions[0])
            confidence = float(np.max(predictions[0]))
            disease_name = labels[class_idx] if labels else f"Class {class_idx}"
        else:
            # Mock fallback if model is not yet trained
            disease_name = "Tomato - Early Blight (Mock)"
            confidence = 0.95
            
        return {
            "success": True,
            "cropName": disease_name.split("___")[0].replace("_", " "),
            "diseaseName": disease_name.split("___")[-1].replace("_", " "),
            "confidence": f"{confidence*100:.1f}%",
            "severity": "Moderate" if confidence > 0.8 else "Severe"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "ok", "model_loaded": model is not None}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
