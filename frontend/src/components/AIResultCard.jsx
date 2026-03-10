import React from "react";
import { ShieldCheck, AlertOctagon, Activity } from "lucide-react";

const AIResultCard = ({ result }) => {
  if (!result) return null;

  const isSevere = result.severity.toLowerCase() === "severe";

  return (
    <div className="glass-card p-8 h-full border-t-4 border-t-emerald-600">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-black text-emerald-900 leading-tight">
            Analysis Report
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Crop Target
            </span>
            <span className="font-black text-gray-700">{result.cropName}</span>
          </div>
        </div>
        <div
          className={`px-5 py-3 rounded-2xl flex items-center gap-3 font-black text-sm shadow-xl ${
            isSevere
              ? "bg-rose-500 text-white shadow-rose-200"
              : "bg-amber-500 text-white shadow-amber-200"
          }`}>
          {isSevere ? <AlertOctagon size={20} /> : <Activity size={20} />}
          {result.severity} Priority
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-[24px] p-8 border border-white/40 shadow-inner space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">
                Identified Issue
              </p>
              <p className="text-2xl font-black text-gray-900 leading-tight">
                {result.diseaseName}
              </p>
            </div>
            <div>
              <div className="flex justify-between items-end mb-3">
                <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">
                  Confidence
                </p>
                <span className="font-black text-emerald-700 text-xl">
                  {result.confidence}
                </span>
              </div>
              <div className="w-full bg-emerald-100/50 rounded-full h-4 overflow-hidden p-1">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full shadow-lg shadow-emerald-400"
                  style={{ width: result.confidence }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-gray-900 rounded-2xl aspect-video relative overflow-hidden group shadow-2xl">
            {/* Mocking the Heatmap Visualization with a better overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599385558197-29bd7ec43d92')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay opacity-50"></div>
            <div className="absolute inset-0 bg-rose-500/30 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-md p-4 flex items-center justify-between">
              <p className="text-white text-[10px] font-black uppercase tracking-wider italic">
                Scanning Thermal Map
              </p>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-gray-500 font-medium text-sm leading-relaxed border-l-4 border-emerald-200 pl-4 italic">
        "Our AI has cross-referenced your sample with over 50,000 agricultural
        data points."
      </p>
    </div>
  );
};

export default AIResultCard;
