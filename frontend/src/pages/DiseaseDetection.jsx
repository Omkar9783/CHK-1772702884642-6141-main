import React, { useState } from "react";
import {
  UploadCloud,
  Loader2,
  Activity,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Leaf,
  Info,
  X,
} from "lucide-react";
import { predictCropDisease, saveToHistory } from "../services/api";
import { useTranslation } from "react-i18next";
import AIResultCard from "../components/AIResultCard";
import DiseaseInformationPanel from "../components/DiseaseInformationPanel";
import RecommendationPanel from "../components/RecommendationPanel";
import NearbyShops from "../components/NearbyShops";

// Supported crops shown as hints in the UI
const SUPPORTED_CROPS = [
  "Apple",
  "Blueberry",
  "Cherry",
  "Corn",
  "Grape",
  "Orange",
  "Peach",
  "Bell Pepper",
  "Potato",
  "Raspberry",
  "Soybean",
  "Squash",
  "Strawberry",
  "Tomato",
];

const DiseaseDetection = () => {
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showCropHints, setShowCropHints] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setResult(null);
      setError(null);
      setShowRecommendations(false);
    }
  };

  const analyzeImage = async () => {
    if (!imageFile) return;
    setIsAnalyzing(true);
    setResult(null);
    setError(null);
    setShowRecommendations(false);
    try {
      // Pass the current selected language to the backend
      const res = await predictCropDisease(imageFile, i18n.language);

      // Check if the API returned a validation error
      if (res.validationError) {
        setError(
          res.detail ||
            "Image does not appear to be a crop leaf. Please upload a clear plant leaf photo."
        );
        return;
      }

      setResult(res);
      await saveToHistory(res);
    } catch (err) {
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAll = () => {
    setSelectedImage(null);
    setImageFile(null);
    setResult(null);
    setError(null);
    setShowRecommendations(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in slide-in-from-bottom-5 duration-700">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="text-center space-y-4 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-400/10 blur-3xl rounded-full" />
        <h1 className="text-4xl md:text-6xl font-black text-emerald-900 tracking-tight relative">
          {t("detection.title")}
        </h1>
        <p className="text-emerald-800/60 font-bold max-w-xl mx-auto text-lg leading-relaxed">
          {t("detection.subtitle")}
        </p>
      </div>

      {/* ── Input Guidance Banner ───────────────────────────────────────── */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 flex gap-3 items-start">
        <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1 text-sm text-blue-800">
          <p className="font-bold mb-1">📸 {t("detection.infoTitle")}</p>
          <ul className="list-disc list-inside space-y-0.5 font-medium text-blue-700">
            <li>{t("detection.tip1")}</li>
            <li>{t("detection.tip2")}</li>
            <li>{t("detection.tip3")}</li>
          </ul>
          <button
            onClick={() => setShowCropHints((v) => !v)}
            className="mt-2 text-blue-600 hover:text-blue-800 font-bold underline text-xs">
            {showCropHints ? "Hide" : "View"} {t("detection.supportedCrops")} ▾
          </button>
          {showCropHints && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {SUPPORTED_CROPS.map((crop) => (
                <span
                  key={crop}
                  className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full border border-blue-200">
                  🌿 {crop}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* ── Upload Column ─────────────────────────────────────────────── */}
        <section className="lg:col-span-5 space-y-6">
          <div className="glass-card p-3">
            <div className="bg-emerald-50/30 rounded-[20px] border-2 border-dashed border-emerald-200 p-8 text-center transition-all hover:bg-emerald-50/60 hover:border-emerald-400 group relative overflow-hidden">
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                title="Upload a crop leaf image only"
              />

              {selectedImage ? (
                <div className="relative z-10 space-y-4">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src={selectedImage}
                      alt="Crop Leaf Preview"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Sparkles className="text-white w-12 h-12" />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button className="bg-emerald-100 text-emerald-700 font-black px-5 py-2 rounded-xl text-sm transition-all hover:bg-emerald-200">
                      Replace Photo
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        resetAll();
                      }}
                      className="bg-red-100 text-red-600 font-black px-3 py-2 rounded-xl text-sm transition-all hover:bg-red-200">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-10 flex flex-col items-center">
                  <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mb-5 shadow-xl shadow-emerald-100 group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <Leaf className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-black text-emerald-900">
                    {t("detection.uploadLabel")}
                  </h3>
                  <p className="text-emerald-600/60 font-bold mt-2 text-sm">
                    {t("detection.uploadHint")}
                  </p>
                  <p className="text-emerald-500/50 font-medium mt-1 text-xs">
                    JPEG · PNG · WebP · Crop leaves only
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
                {t("detection.analyzing")}
              </>
            ) : (
              <>
                <Activity className="w-6 h-6" />
                {t("detection.title")}
              </>
            )}
          </button>
        </section>

        {/* ── Results Column ────────────────────────────────────────────── */}
        <section className="lg:col-span-7 space-y-8">
          {isAnalyzing ? (
            <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[500px] text-center space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-600/5 animate-pulse" />
              <div className="w-40 h-40 rounded-full border-8 border-emerald-50 border-t-emerald-600 animate-spin relative">
                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                  <Activity className="w-14 h-14 text-emerald-600" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-emerald-900">
                  {t("detection.scanningMap")}
                </h3>
                <p className="text-emerald-700/60 font-bold mt-2 italic">
                  {t("detection.aiReference")}
                </p>
              </div>
            </div>
          ) : error ? (
            /* ── Validation / Error Card ─────────────────────────────────── */
            <div className="animate-in slide-in-from-right-10 duration-700">
              <div className="glass-card p-10 flex flex-col items-center justify-center min-h-[400px] text-center space-y-6 border-2 border-red-200 bg-red-50/60">
                <div className="bg-red-100 p-5 rounded-full shadow-lg">
                  <AlertTriangle className="w-16 h-16 text-red-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-red-700">
                    Image Not Recognized
                  </h3>
                  <p className="text-red-600/80 font-semibold mt-3 max-w-sm mx-auto text-sm leading-relaxed">
                    {error}
                  </p>
                </div>
                <div className="bg-white border border-red-200 rounded-2xl p-4 w-full text-left space-y-2">
                  <p className="text-sm font-black text-red-800">
                    ✅ What to do
                  </p>
                  <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                    <li>
                      Use a <strong>close-up photo of a plant leaf</strong>
                    </li>
                    <li>Ensure good lighting and the leaf fills the frame</li>
                    <li>
                      Do <strong>not</strong> upload vehicles, people, or
                      unrelated objects
                    </li>
                  </ul>
                </div>
                <button
                  onClick={resetAll}
                  className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3 rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg">
                  {t("detection.tryAnother")}
                </button>
              </div>
            </div>
          ) : result ? (
            <div className="relative">
              {/* ── Results View State 1: Analysis Report ─────────────────── */}
              {!showRecommendations ? (
                <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                  <AIResultCard result={result} />
                  <DiseaseInformationPanel result={result} />
                  
                  <div className="flex justify-center mt-8 pt-4">
                    <button 
                      onClick={() => setShowRecommendations(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-xl shadow-emerald-200 hover:-translate-y-1 flex items-center gap-3 text-lg w-full md:w-auto"
                    >
                      <ShieldCheck className="w-6 h-6" />
                      View Recommendations & Local Shops
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-500">
                  {/* ── Results View State 2: Recommendations ───────────────── */}
                  <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                    <h3 className="font-bold text-emerald-900">Treatment Plan for {result.diseaseName}</h3>
                    <button 
                      onClick={() => setShowRecommendations(false)}
                      className="text-emerald-700 bg-emerald-100/50 hover:bg-emerald-200 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                      ← Back to Analysis
                    </button>
                  </div>
                  
                  <RecommendationPanel recommendations={result.recommendations} />
                  <NearbyShops cropName={result.cropName} />
                </div>
              )}
            </div>
          ) : (
            /* ── Idle / Waiting ──────────────────────────────────────────── */
            <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[500px] text-center border-2 border-dashed border-emerald-100 bg-white/40">
              <div className="bg-emerald-50 p-6 rounded-full mb-6">
                <ShieldCheck className="w-16 h-16 text-emerald-200" />
              </div>
              <h3 className="text-2xl font-black text-emerald-900">
                Ready to Diagnose
              </h3>
              <p className="text-emerald-800/40 font-bold max-w-xs mx-auto mt-2 text-sm">
                Upload a clear crop leaf photo on the left, then click{" "}
                <em>Diagnose Disease</em>.
              </p>
              <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-xs">
                {[
                  "🍅 Tomato",
                  "🌽 Corn",
                  "🍇 Grape",
                  "🥔 Potato",
                  "🍎 Apple",
                ].map((c) => (
                  <span
                    key={c}
                    className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DiseaseDetection;
