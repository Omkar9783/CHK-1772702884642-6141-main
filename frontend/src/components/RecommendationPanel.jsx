import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Leaf, FlaskConical, ShieldCheck, Info } from "lucide-react";

const TreatmentItem = ({ item }) => (
  <div className="flex gap-4 p-4 bg-white/50 rounded-2xl border border-gray-100 group transition-all hover:border-emerald-200 hover:shadow-md">
    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
    <span className="text-gray-700 font-medium text-sm leading-relaxed">{item}</span>
  </div>
);

const RecommendationPanel = ({ recommendations }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('biological');

  if (!recommendations) return null;

  const tabs = [
    { id: 'biological', label: 'Biological', icon: Leaf, color: 'emerald', data: recommendations.biological },
    { id: 'chemical', label: 'Chemical', icon: FlaskConical, color: 'blue', data: recommendations.chemical },
    { id: 'preventive', label: 'Preventive', icon: ShieldCheck, color: 'purple', data: recommendations.preventive },
  ];

  return (
    <div className="glass-card p-1 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="p-8 pb-4">
        <h3 className="text-2xl font-black text-emerald-900 mb-2">Available Treatments</h3>
        <p className="text-emerald-700/60 font-bold text-xs uppercase tracking-widest">Select a method for more details</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-100 px-4">
        {tabs.map((tab) => {
          // Explicitly map colors to their tailwind classes for safelisting
          const colorClasses = {
            emerald: { text: 'text-emerald-600', bg: 'bg-emerald-500' },
            blue: { text: 'text-blue-600', bg: 'bg-blue-500' },
            purple: { text: 'text-purple-600', bg: 'bg-purple-500' },
          };
          const textColorClass = activeTab === tab.id ? colorClasses[tab.color].text : 'text-gray-400 hover:text-gray-600';
          const bgColorClass = colorClasses[tab.color].bg;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-3 py-5 font-black text-sm transition-all relative ${textColorClass}`}
            >
              <tab.icon size={18} />
              {tab.label}
              {activeTab === tab.id && (
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${bgColorClass} rounded-t-full`} />
              )}
            </button>
          );
        })}
      </div>

      <div className="p-8 bg-gray-50/30">
        <div className="max-w-2xl mx-auto space-y-4">
          {tabs.find(t => t.id === activeTab)?.data?.length > 0 ? (
            tabs.find(t => t.id === activeTab).data.map((item, idx) => (
              <TreatmentItem key={idx} item={item} />
            ))
          ) : (
            <div className="py-12 flex flex-col items-center text-center">
              <Info className="text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 font-bold">No specific {activeTab} treatments available.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-amber-50 p-6 border-t border-amber-100 flex items-start gap-4">
        <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
          <Info size={20} />
        </div>
        <div>
          <h4 className="font-black text-amber-900 text-sm">Farmer's Note</h4>
          <p className="text-amber-800/70 text-xs font-bold mt-1 leading-relaxed">
            Always read labels carefully and follow local regulations before applying chemical treatments. Use protective gear.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPanel;
