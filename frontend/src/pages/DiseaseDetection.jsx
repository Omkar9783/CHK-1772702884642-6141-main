import React, { useState } from "react";
import {
  UploadCloud,
  Camera,
  Loader2,
  Image as ImageIcon,
  Activity,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { predictCropDisease, saveToHistory } from "../services/api";
import AIResultCard from "../components/AIResultCard";
import DiseaseInformationPanel from "../components/DiseaseInformationPanel";
import RecommendationPanel from "../components/RecommendationPanel";

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setResult(null); // Reset previous result
    }
  };

  const analyzeImage = async () => {
    if (!imageFile) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const res = await predictCropDisease(imageFile);
      setResult(res);
      // Save to history automatically
      await saveToHistory(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in slide-in-from-bottom-5 duration-700">
      {/* Header section with glassmorphism accent */}
      <div className="text-center space-y-4 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-400/10 blur-3xl rounded-full"></div>
        <h1 className="text-4xl md:text-6xl font-black text-emerald-900 tracking-tight relative">
          AI-Powered <span className="text-emerald-600">Diagnosis</span>
        </h1>
        <p className="text-emerald-800/60 font-bold max-w-xl mx-auto text-lg leading-relaxed">
          Unlock the power of Neural Networks to protect your farm. Simply
          upload a leaf photo for instant results.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Upload Column */}
        <section className="lg:col-span-5 space-y-8">
          <div className="glass-card p-3">
            <div className="bg-emerald-50/30 rounded-[20px] border-2 border-dashed border-emerald-200 p-8 text-center transition-all hover:bg-emerald-50/60 hover:border-emerald-400 group relative overflow-hidden">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />

              {selectedImage ? (
                <div className="relative z-10 space-y-6">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src={selectedImage}
                      alt="Crop Preview"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Sparkles className="text-white w-12 h-12" />
                    </div>
                  </div>
                  <button className="bg-emerald-100 text-emerald-700 font-black px-6 py-2 rounded-xl text-sm transition-all hover:bg-emerald-200">
                    Replace Image
                  </button>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center">
                  <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-100 group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <UploadCloud className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-black text-emerald-900">
                    Upload Photo
                  </h3>
                  <p className="text-emerald-600/60 font-bold mt-2">
                    Tap to browse or drag & drop
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={analyzeImage}
            disabled={!selectedImage || isAnalyzing}
            className={`w-full py-5 text-xl font-black rounded-[24px] transition-all flex items-center justify-center gap-4 relative overflow-hidden ${
              !selectedImage
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : isAnalyzing
                ? "bg-emerald-900 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl shadow-emerald-200 hover:-translate-y-1"
            }`}>
            {isAnalyzing ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Activity className="w-6 h-6" />
                Analyze Health
              </>
            )}
          </button>
        </section>

        {/* Results Column */}
        <section className="lg:col-span-7 space-y-8">
          {isAnalyzing ? (
            <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[500px] text-center space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-600/5 animate-pulse"></div>
              <div className="w-48 h-48 rounded-full border-8 border-emerald-50 border-t-emerald-600 animate-spin relative">
                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                  <Activity className="w-16 h-16 text-emerald-600" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-emerald-900">
                  Scanning Patterns...
                </h3>
                <p className="text-emerald-700/60 font-bold mt-2 italic">
                  Matching symptoms with CNN datasets
                </p>
              </div>
            </div>
          ) : result ? (
            <div className="animate-in slide-in-from-right-10 duration-700 space-y-8">
              <AIResultCard result={result} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DiseaseInformationPanel result={result} />
                <RecommendationPanel recommendations={result.recommendations} />
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[500px] text-center border-2 border-dashed border-emerald-100 bg-white/40">
              <div className="bg-emerald-50 p-6 rounded-full mb-6">
                <ShieldCheck className="w-16 h-16 text-emerald-200" />
              </div>
              <h3 className="text-2xl font-black text-emerald-900">
                Ready to Diagnose
              </h3>
              <p className="text-emerald-800/40 font-bold max-w-xs mx-auto mt-2">
                Upload an image on the left to start the AI analysis process.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DiseaseDetection;
