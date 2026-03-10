// Mock Database Data

let mockHistory = [
  {
    _id: "report1",
    crop: "Tomato",
    disease: "Early Blight",
    status: "Moderate",
    confidence: "88%",
    date: "2023-10-14T10:30:00Z",
    description: "AI analysis detected 'Early Blight' on Tomato with 88% confidence.",
    recommendations: {
      immediate: ["Remove visibly infected leaves/fruit immediately.", "Improve air circulation by pruning dense foliage."],
      organic: ["Apply Sulfur-based fungicides (UPL Sulflox) or Potassium Bicarbonate sprays.", "Use compost tea to boost plant immunity."],
      chemical: ["Apply broad-spectrum fungicides like Syngenta Amistar (Azoxystrobin) or Bayer Luna Sensation.", "Use systemic fungicides like Ridomil Gold for deep-seated infections."],
      preventive: ["Avoid watering foliage; use drip irrigation.", "Rotate crops to non-host plants for 3 years.", "Contact your nearby fertilizer retailer to purchase high-quality drip irrigation supplies."]
    }
  },
  {
    _id: "report2",
    crop: "Rice",
    disease: "Brown Spot",
    status: "Severe",
    confidence: "92%",
    date: "2023-09-21T14:15:00Z",
    description: "AI analysis detected 'Brown Spot' on Rice with 92% confidence.",
    recommendations: {
      immediate: ["Remove visibly infected leaves/fruit immediately."],
      organic: ["Apply Potassium Bicarbonate sprays."],
      chemical: ["Apply appropriate fungicides every 7-14 days.", "Use systemic fungicides for deep-seated infections."],
      preventive: ["Avoid watering foliage; use drip irrigation.", "Rotate crops to non-host plants for 3 years."]
    }
  },
];

export const saveToHistory = async (report) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReport = {
        _id: `report${Date.now()}`,
        crop: report.cropName || "Unknown Crop",
        disease: report.diseaseName || "Unknown Disease",
        status: report.severity || "Moderate",
        confidence: report.confidence || "0%",
        date: new Date().toISOString(),
      };
      // Add to the beginning of the array so newest is first
      mockHistory = [newReport, ...mockHistory];
      resolve({ success: true, report: newReport });
    }, 500);
  });
};

const mockLibrary = [
  // Apple
  { id: 1, crop: "Apple", name: "Apple Scab", symptoms: "Dull black or olive-green spots on leaves and fruit.", causes: "Venturia inaequalis (fungus)", prevention: "Apply fungicides like Myclobutanil; prune for better airflow." },
  { id: 2, crop: "Apple", name: "Black Rot", symptoms: "Purple spots on leaves; brown rotting on fruit; cankers on branches.", causes: "Botryosphaeria obtusa (fungus)", prevention: "Remove dead wood and mummified fruit; apply Captan fungicide." },
  { id: 3, crop: "Apple", name: "Cedar Apple Rust", symptoms: "Bright orange-yellow rust spots on leaves.", causes: "Gymnosporangium spp. (fungus)", prevention: "Remove nearby cedar hosts; apply protectant fungicides early." },
  { id: 4, crop: "Apple", name: "Healthy", symptoms: "No visible signs of disease.", causes: "N/A", prevention: "Maintain regular pruning and fertilization." },

  // Blueberry
  { id: 5, crop: "Blueberry", name: "Healthy", symptoms: "No visible signs of disease.", causes: "N/A", prevention: "Maintain acidic soil pH and water regularly." },

  // Cherry
  { id: 6, crop: "Cherry", name: "Powdery Mildew", symptoms: "White powdery patches on leaves; distorted new growth.", causes: "Podosphaera clandestina (fungus)", prevention: "Improve air circulation; apply sulfur or potassium bicarbonate sprays." },
  { id: 7, crop: "Cherry", name: "Healthy", symptoms: "Rich green leaves indicating good health.", causes: "N/A", prevention: "Water at the base and schedule winter pruning." },

  // Corn
  { id: 8, crop: "Corn", name: "Cercospora Leaf Spot (Gray Leaf Spot)", symptoms: "Rectangular, pale brown or gray lesions on lower leaves.", causes: "Cercospora zeae-maydis (fungus)", prevention: "Use resistant hybrids; practice crop rotation and tillage." },
  { id: 9, crop: "Corn", name: "Common Rust", symptoms: "Small, circular brown or rust-colored pustules on leaves.", causes: "Puccinia sorghi (fungus)", prevention: "Plant rust-resistant hybrids; apply foliar fungicide if severe." },
  { id: 10, crop: "Corn", name: "Northern Leaf Blight", symptoms: "Long, elliptical, grayish-green or tan lesions.", causes: "Exserohilum turcicum (fungus)", prevention: "Use resistant varieties; practice crop rotation to break the cycle." },
  { id: 11, crop: "Corn", name: "Healthy", symptoms: "Sturdy green stalks and wide leaves.", causes: "N/A", prevention: "Ensure adequate nitrogen supply." },

  // Grape
  { id: 12, crop: "Grape", name: "Black Rot", symptoms: "Reddish-brown leaf spots; shriveled, mummified black grapes.", causes: "Guignardia bidwellii (fungus)", prevention: "Prune heavily to increase airflow; use Mancozeb fungicides." },
  { id: 13, crop: "Grape", name: "Esca (Black Measles)", symptoms: "Tiger-stripe patterns on leaves; spotting on berries.", causes: "Various fungi (Phaeomoniella, Phaeoacremonium)", prevention: "Remove and burn infected vines; apply wound paste after pruning." },
  { id: 14, crop: "Grape", name: "Leaf Blight", symptoms: "Large necrotic patches on leaves.", causes: "Pseudocercospora vitis (fungus)", prevention: "Apply copper-based fungicides; clean up vineyard debris." },
  { id: 15, crop: "Grape", name: "Healthy", symptoms: "Vibrant leaves and robust clusters.", causes: "N/A", prevention: "Use drip irrigation to keep foliage dry." },

  // Orange
  { id: 16, crop: "Orange", name: "Haunglongbing (Citrus Greening)", symptoms: "Asymmetrical yellow mottling on leaves; bitter, green fruit.", causes: "Candidatus Liberibacter (bacteria transmitted by psyllids)", prevention: "Control Asian citrus psyllid populations; use certified clean trees." },

  // Peach
  { id: 17, crop: "Peach", name: "Bacterial Spot", symptoms: "Small, water-soaked spots that turn purple-black; fruit pitting.", causes: "Xanthomonas campestris (bacteria)", prevention: "Plant resistant varieties; apply fixed copper early in the season." },
  { id: 18, crop: "Peach", name: "Healthy", symptoms: "Lush, unblemished leaves.", causes: "N/A", prevention: "Apply dormant oil sprays in winter." },

  // Bell Pepper
  { id: 19, crop: "Bell Pepper", name: "Bacterial Spot", symptoms: "Small brown spots surrounded by yellow halos; leaves drop early.", causes: "Xanthomonas campestris (bacteria)", prevention: "Use certified seeds; avoid overhead irrigation; apply copper sprays." },
  { id: 20, crop: "Bell Pepper", name: "Healthy", symptoms: "Dark green, firm leaves.", causes: "N/A", prevention: "Rotate crops away from other nightshades." },

  // Potato
  { id: 21, crop: "Potato", name: "Early Blight", symptoms: "Brown target-like concentric rings on older leaves.", causes: "Alternaria solani (fungus)", prevention: "Ensure adequate nitrogen; apply Chlorothalonil early." },
  { id: 22, crop: "Potato", name: "Late Blight", symptoms: "Dark, water-soaked lesions; white fungal growth on undersides.", causes: "Phytophthora infestans (fungus-like organism)", prevention: "Plant certified potato seeds; apply preventative copper fungicides." },
  { id: 23, crop: "Potato", name: "Healthy", symptoms: "Vigorous green foliage.", causes: "N/A", prevention: "Huddle soil around the base to protect tubers." },

  // Raspberry
  { id: 24, crop: "Raspberry", name: "Healthy", symptoms: "Strong canes and healthy leaves.", causes: "N/A", prevention: "Prune old floricanes immediately after fruiting." },

  // Soybean
  { id: 25, crop: "Soybean", name: "Healthy", symptoms: "Unblemished green leaves.", causes: "N/A", prevention: "Maintain good drainage to prevent root rot." },

  // Squash
  { id: 26, crop: "Squash", name: "Powdery Mildew", symptoms: "White, powdery fungal spots on upper leaf surfaces.", causes: "Podosphaera xanthii (fungus)", prevention: "Use resistant seeds; apply Neem oil or sulfur dust." },

  // Strawberry
  { id: 27, crop: "Strawberry", name: "Leaf Scorch", symptoms: "Irregular purple to solid brown blotches on leaves.", causes: "Diplocarpon earlianum (fungus)", prevention: "Remove dead leaves in winter; thin plants for better airflow." },
  { id: 28, crop: "Strawberry", name: "Healthy", symptoms: "Bright green leaves; zero fungal spots.", causes: "N/A", prevention: "Use straw mulch to keep berries off the damp soil." },

  // Tomato
  { id: 29, crop: "Tomato", name: "Bacterial Spot", symptoms: "Small water-soaked spots on leaves that turn brown with yellow halos.", causes: "Xanthomonas vesicatoria (bacteria)", prevention: "Use pathogen-free seed; avoid overhead watering; copper sprays." },
  { id: 30, crop: "Tomato", name: "Early Blight", symptoms: "Brown spots with concentric rings on lower leaves first.", causes: "Alternaria solani (fungus)", prevention: "Stake or cage plants; maintain a regular fungicide regimen." },
  { id: 31, crop: "Tomato", name: "Late Blight", symptoms: "Large dark patches; rapid wilting and white mold in humidity.", causes: "Phytophthora infestans (fungus-like)", prevention: "Preventative copper fungicide; pull and bag infected plants." },
  { id: 32, crop: "Tomato", name: "Leaf Mold", symptoms: "Pale green to yellow spots on top; olive-green mold on the bottom of leaves.", causes: "Passalora fulva (fungus)", prevention: "Improve greenhouse ventilation; space plants widely." },
  { id: 33, crop: "Tomato", name: "Septoria Leaf Spot", symptoms: "Numerous small circular spots with dark borders and tan centers.", causes: "Septoria lycopersici (fungus)", prevention: "Mulch soil surface; prune lower leaves; apply Chlorothalonil." },
  { id: 34, crop: "Tomato", name: "Spider Mites", symptoms: "Stippled, yellowing leaves; very fine webbing visible under leaves.", causes: "Tetranychus urticae (pest/arachnid)", prevention: "Spray leaves with water forcefully; apply horticultural oils or miticides." },
  { id: 35, crop: "Tomato", name: "Target Spot", symptoms: "Dark brown spots with lighter centers; fruits have sunken lesions.", causes: "Corynespora cassiicola (fungus)", prevention: "Increase airflow; apply targeted fungicides." },
  { id: 36, crop: "Tomato", name: "Yellow Leaf Curl Virus", symptoms: "Upward curling leaves, yellowing margins, stunted growth.", causes: "Begomovirus (transmitted by Whiteflies)", prevention: "Control whiteflies with Imidacloprid; use reflective mulch." },
  { id: 37, crop: "Tomato", name: "Mosaic Virus", symptoms: "Mottled light and dark green areas on leaves; fern-like appearance.", causes: "Tomato Mosaic Virus (ToMV)", prevention: "Disinfect tools; wash hands after handling tobacco; remove infected plants." },
  { id: 38, crop: "Tomato", name: "Healthy", symptoms: "Rich green, unblemished foliage with no wilting.", causes: "N/A", prevention: "Consistent watering to avoid blossom end rot; fertilize deeply." },
];

// Mock Auth
export const registerUser = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: { name: userData.name || "Farmer", email: userData.email },
      });
    }, 1000);
  });
};

export const loginUser = async (credentials) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: { name: "Test Farmer", email: credentials.email },
      });
    }, 1000);
  });
};

export const predictCropDisease = async (imageFile, lang = "en") => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("lang", lang);

  try {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData,
    });

    // 422 = crop validation rejected (not a leaf image)
    if (response.status === 422) {
      const errorData = await response.json();
      return {
        validationError: true,
        detail:
          errorData.detail ||
          "Image does not appear to be a crop leaf. Please upload a clear plant leaf photo.",
      };
    }

    if (!response.ok) {
      throw new Error(`Server error (${response.status}). Please try again.`);
    }

    const data = await response.json();
    // Recommendations are now returned by the backend itself;
    // fall back to generics only if absent.
    return {
      ...data,
      description:
        data.description || "AI-powered analysis from the CNN model.",
      recommendations: data.recommendations || {
        immediate: ["Consult with a local agricultural expert."],
        organic: ["Apply neem oil or other organic fungicides."],
        chemical: ["Use fungicides as per local agricultural guidelines."],
        preventive: ["Ensure proper crop rotation and soil health management."],
      },
    };
  } catch (error) {
    console.error("Prediction error:", error);
    throw new Error(
      error.message ||
        "Could not connect to the backend server. Please ensure the FastAPI server is running on port 8000."
    );
  }
};

const OPENAI_API_KEY =
  import.meta.env.VITE_OPENAI_API_KEY || "PULL_FROM_ENV_OR_REPLACE_WITH_YOUR_KEY";

const GEMINI_API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY || "PULL_FROM_ENV_OR_REPLACE_WITH_YOUR_KEY";

const SYSTEM_PROMPT = `You are CropCare AI, an expert agricultural assistant specializing in crop diseases, plant health, and farming best practices. You help farmers identify diseases, understand symptoms, and get actionable advice on:
- Crop disease diagnosis and treatment
- Organic and chemical remedies
- Fertilizer and soil health recommendations
- Preventive farming practices
- Weather impact on crops
Keep your answers concise, practical, and farmer-friendly. If a question is unrelated to agriculture, politely redirect the conversation back to farming topics.`;

export const chatWithBot = async (message) => {
  // Try Gemini First if available
  if (GEMINI_API_KEY && GEMINI_API_KEY !== "PULL_FROM_ENV_OR_REPLACE_WITH_YOUR_KEY") {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: message }],
              },
            ],
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            generationConfig: {
              maxOutputTokens: 300,
              temperature: 0.7,
            },
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || "Gemini API error");
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      return { reply: reply || "Sorry, I couldn't generate a response. Please try again." };
    } catch (error) {
      console.error("Gemini Chatbot error:", error);
      console.log("Falling back to OpenAI...");
    }
  }

  // Fallback to OpenAI
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "OpenAI API error");
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();
    return { reply: reply || "Sorry, I couldn't generate a response. Please try again." };
  } catch (error) {
    console.error("OpenAI Chatbot error:", error);
    return {
      reply: `Connection Error: ${error.message}`,
    };
  }
};

export const getHistory = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockHistory), 800);
  });
};

export const getWeatherData = async () => {
  return new Promise((resolve) => {
    // Helper function to fetch from Open-Meteo
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m`
        );
        const data = await response.json();
        const current = data.current;
        
        let alert = "Conditions are normal";
        if (current.relative_humidity_2m > 80) {
          alert = "High humidity detected - fungal risk!";
        } else if (current.precipitation > 5) {
          alert = "Heavy rain expected - delay chemical sprays.";
        }

        resolve({
          temp: `${Math.round(current.temperature_2m)}°C`,
          humidity: `${current.relative_humidity_2m}%`,
          rain: `${current.precipitation} mm`,
          wind: `${Math.round(current.wind_speed_10m)} km/h`,
          alert: alert,
        });
      } catch (err) {
        console.error("Failed to fetch live weather", err);
        // Fallback mock
        resolve({
          temp: "28°C",
          humidity: "85%",
          rain: "0 mm",
          wind: "12 km/h",
          alert: "High humidity detected - fungal risk (Mock)",
        });
      }
    };

    // Try to get user's location, fallback to Mumbai if denied/failed
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Default to Mumbai
          fetchWeather(19.0760, 72.8777);
        },
        { timeout: 5000 }
      );
    } else {
      fetchWeather(19.0760, 72.8777);
    }
  });
};

export const getDiseaseLibrary = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockLibrary), 600);
  });
};

export default {
  registerUser,
  loginUser,
  predictCropDisease,
  chatWithBot,
  saveToHistory,
  getHistory,
  getWeatherData,
  getDiseaseLibrary,
};
