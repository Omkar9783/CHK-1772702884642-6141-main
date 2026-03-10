import React from "react";
import { ShieldAlert, Leaf, TestTube, Recycle } from "lucide-react";

// eslint-disable-next-line no-unused-vars
const OptionCard = ({ title, items, icon: Icon, colorClass, bgClass }) => (
  <div
    className={`p-5 rounded-xl border-l-4 ${colorClass} ${bgClass} transition-shadow hover:shadow-sm`}>
    <h4 className="font-bold flex items-center gap-2 mb-3 text-gray-900">
      <Icon className="w-5 h-5 opacity-70" />
      {title}
    </h4>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-2 text-gray-700">
          <span className="font-bold opacity-50">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const RecommendationPanel = ({ recommendations }) => {
  if (!recommendations) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
        Preventive Recommendations
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OptionCard
          title="Immediate Actions"
          items={recommendations.immediate}
          icon={ShieldAlert}
          colorClass="border-red-500"
          bgClass="bg-red-50/50"
        />
        <OptionCard
          title="Organic Solutions"
          items={recommendations.organic}
          icon={Leaf}
          colorClass="border-emerald-500"
          bgClass="bg-emerald-50/50"
        />
        <OptionCard
          title="Chemical Treatment"
          items={recommendations.chemical}
          icon={TestTube}
          colorClass="border-blue-500"
          bgClass="bg-blue-50/50"
        />
        <OptionCard
          title="Preventive Practices"
          items={recommendations.preventive}
          icon={Recycle}
          colorClass="border-purple-500"
          bgClass="bg-purple-50/50"
        />
      </div>
    </div>
  );
};

export default RecommendationPanel;
