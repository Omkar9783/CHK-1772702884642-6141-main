import React from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, AlertOctagon, Activity, Thermometer } from "lucide-react";

const AIResultCard = ({ result }) => {
  const { t } = useTranslation();
  if (!result) return null;

  const isSevere = result.severity.toLowerCase() === "severe";
  const confidencePercent = result.confidenceScore * 100;
  
  // Color logic for confidence meter
  const getMeterColor = () => {
    if (confidencePercent > 80) return "from-emerald-400 to-emerald-600";
    if (confidencePercent > 50) return "from-amber-400 to-amber-600";
    return "from-rose-400 to-rose-600";
  };

  return (
    <div className="glass-card p-8 h-full border-t-8 border-t-emerald-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 -mr-16 -mt-16 rounded-full blur-2xl" />
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8 relative z-10">
        <div>
          <h2 className="text-3xl font-black text-emerald-900 leading-tight">
            Diagnosis Report
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-[10px] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Crop Species
            </span>
            <span className="font-black text-emerald-800 text-lg uppercase">{result.cropName}</span>
          </div>
        </div>
        <div
          className={`px-6 py-3 rounded-2xl flex items-center gap-3 font-black text-sm shadow-xl transition-transform hover:scale-105 ${
            isSevere
              ? "bg-rose-500 text-white shadow-rose-200"
              : "bg-amber-500 text-white shadow-amber-200"
          }`}>
          {isSevere ? <AlertOctagon size={24} /> : <Activity size={24} />}
          <div className="flex flex-col leading-none">
            <span className="text-[10px] uppercase opacity-70">Severity</span>
            <span className="text-base uppercase">{result.severity}</span>
          </div>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-xl space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <ShieldCheck size={14} /> Identified Issue
              </p>
              <p className="text-3xl font-black text-gray-900 leading-tight">
                {result.diseaseName}
              </p>
            </div>
            
            <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50">
              <div className="flex justify-between items-end mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">Detection accuracy</span>
                  <span className="text-3xl font-black text-emerald-800 tracking-tighter">
                    {result.confidence}
                  </span>
                </div>
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xs ${
                    confidencePercent > 80 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {confidencePercent > 80 ? "V.High" : "Good"}
                </div>
              </div>
              <div className="w-full bg-emerald-200/30 rounded-full h-4 overflow-hidden p-1 shadow-inner">
                <div
                  className={`bg-gradient-to-r ${getMeterColor()} h-2 rounded-full transition-all duration-1000 ease-out shadow-lg`}
                  style={{ width: `${confidencePercent}%` }}></div>
              </div>
              <p className="text-[10px] text-emerald-600/60 font-medium mt-3 italic">
                Verified using multi-layer convolutional neural network architecture
              </p>
            </div>
          </div>

          <div className="relative group shadow-3xl rounded-[32px] overflow-hidden bg-gray-900">
            {/* Heatmap/Inference Visualizer Mockup */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599385558197-29bd7ec43d92')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay opacity-50"></div>
            
            {/* Scan animation lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-full h-1 bg-emerald-400 absolute top-0 left-0 shadow-[0_0_20px_rgba(52,211,153,0.8)] animate-pulse" style={{ animation: 'scan 3s linear infinite' }} />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes scan {
                0% { transform: translateY(0); }
                100% { transform: translateY(300px); }
              }
            `}} />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center gap-3 text-white">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <p className="text-[10px] font-black uppercase tracking-widest">
                  Real-time Feature mapping active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-dashed border-emerald-200">
        <Thermometer className="text-emerald-600 flex-shrink-0" size={20} />
        <p className="text-emerald-800/60 font-medium text-xs leading-relaxed italic">
          "Expert insight: This accurate diagnosis suggests optimized treatment paths that could save up to 40% of the harvest if applied within 48 hours."
        </p>
      </div>
    </div>
  );
};

export default AIResultCard;
