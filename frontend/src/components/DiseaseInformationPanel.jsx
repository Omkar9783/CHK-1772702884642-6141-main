import React from "react";
import { useTranslation } from "react-i18next";
import { Info, HelpCircle, AlertOctagon, Bug } from "lucide-react";

const InfoSection = ({ title, content, icon: Icon, color }) => {
  const colorMaps = {
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      textH4: 'text-emerald-900',
      iconText: 'text-emerald-600',
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      textH4: 'text-amber-900',
      iconText: 'text-amber-600',
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
      textH4: 'text-indigo-900',
      iconText: 'text-indigo-600',
    },
  };

  const currentColors = colorMaps[color] || colorMaps.emerald;

  return (
    <div className={`p-6 rounded-[24px] ${currentColors.bg} border ${currentColors.border} transition-all hover:scale-[1.01] hover:shadow-lg`}>
      <h4 className={`font-black ${currentColors.textH4} mb-3 flex items-center gap-3 uppercase text-xs tracking-widest`}>
        <Icon size={18} className={currentColors.iconText} />
        {title}
      </h4>
      <p className="text-gray-700 font-medium leading-relaxed">
        {content || "No detailed information available for this specific case."}
      </p>
    </div>
  );
};

const DiseaseInformationPanel = ({ result }) => {
  const { t } = useTranslation();
  if (!result) return null;

  return (
    <div className="space-y-6 animate-in slide-in-from-right-5 duration-700 delay-200">
      <div className="flex items-center gap-4 mb-2">
        <div className="bg-emerald-600 p-2 rounded-xl text-white">
          <Info size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-gray-900 leading-none">Understanding the Issue</h3>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-tighter mt-1 italic">Based on high-confidence dataset analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoSection 
          title="Analysis Summary" 
          content={result.description} 
          icon={HelpCircle} 
          color="emerald" 
        />
        <InfoSection 
          title="Typical Symptoms" 
          content={result.symptoms} 
          icon={AlertOctagon} 
          color="amber" 
        />
      </div>
      
      <div className="w-full">
        <InfoSection 
          title="Primary Cause" 
          content={result.cause} 
          icon={Bug} 
          color="indigo" 
        />
      </div>
    </div>
  );
};

export default DiseaseInformationPanel;
