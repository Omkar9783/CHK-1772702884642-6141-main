// Mock Database Data

let mockHistory = [
  {
    _id: "report1",
    crop: "Tomato",
    disease: "Early Blight",
    status: "Moderate",
    confidence: "88%",
    date: "2023-10-14T10:30:00Z",
  },
  {
    _id: "report2",
    crop: "Rice",
    disease: "Brown Spot",
    status: "Severe",
    confidence: "92%",
    date: "2023-09-21T14:15:00Z",
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
  {
    id: 1,
    crop: "Tomato",
    name: "Late Blight",
    symptoms:
      "Dark lesions on leaves, white fungal growth on undersides in humid weather.",
    causes: "Phytophthora infestans (fungus-like organism)",
    prevention: "Apply copper-based fungicides, avoid overhead watering.",
  },
  {
    id: 2,
    crop: "Potato",
    name: "Early Blight",
    symptoms:
      "Brown spots with concentric rings (target spots) on older leaves.",
    causes: "Alternaria solani (fungus)",
    prevention:
      "Crop rotation, ensure adequate nitrogen, apply fungicides early.",
  },
  {
    id: 3,
    crop: "Wheat",
    name: "Rust",
    symptoms: "Yellow, orange, or reddish-brown powdery pustules on leaves.",
    causes: "Puccinia spp. (fungus)",
    prevention: "Plant resistant varieties, apply foliar fungicides timely.",
  },
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

// Real Application Services
export const predictCropDisease = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to get prediction from server");
    }

    const data = await response.json();
    return {
      ...data,
      description: "AI-powered analysis from the CNN model.",
      recommendations: {
        immediate: [
          "Consult with a local expert for specific treatment advice.",
        ],
        organic: ["Apply neem oil or other organic fungicides."],
        chemical: [
          "Use appropriate fungicides as per local agricultural guidelines.",
        ],
        preventive: ["Ensure proper crop rotation and soil health management."],
      },
    };
  } catch (error) {
    console.error("Prediction error:", error);
    // Fallback to mock for development if server is down
    return {
      cropName: "Error",
      diseaseName: "Server Unreachable",
      severity: "N/A",
      confidence: "0%",
      description:
        "Could not connect to the backend server. Please ensure the FastAPI server is running.",
      recommendations: { immediate: ["Check backend status"] },
    };
  }
};

export const chatWithBot = async (message) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let reply =
        "I am a simple mock AI. Please try asking about tomatoes, fungus, or fertilizer.";
      const lower = message.toLowerCase();

      if (lower.includes("yellow") && lower.includes("tomato")) {
        reply =
          "Yellowing tomato leaves often indicate a nutrient deficiency (like nitrogen) or early blight. Ensure your plants receive adequate water without waterlogging, and consider a balanced fertilizer.";
      } else if (lower.includes("fungal")) {
        reply =
          "For fungal infections, immediate removal of infected leaves is crucial. Improve air circulation and consider copper-based organic fungicides.";
      } else if (lower.includes("fertilizer")) {
        reply =
          "A balanced NPK fertilizer (like 10-10-10) is a good start. However, if your soil lacks specific nutrients, organic compost or targeted fertilizers are better.";
      }

      resolve({ reply });
    }, 1000);
  });
};

export const getHistory = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockHistory), 800);
  });
};

export const getWeatherData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        temp: "28°C",
        humidity: "85%",
        rain: "60%",
        wind: "12 km/h",
        alert: "High humidity detected - fungal risk",
      });
    }, 500);
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
