import React, { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const ExpertCard = ({ expert }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`glass-card p-6 transition-all duration-300 cursor-pointer ${isExpanded ? 'ring-2 ring-emerald-500 shadow-xl' : 'hover:shadow-lg hover:-translate-y-1'}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md border-2 border-white shrink-0">
            <img
              src={expert.img}
              alt={expert.name}
              className="w-full h-full object-cover"
            />
          </div>
          {expert.status === 'online' && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Basic Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-black text-gray-900 leading-tight text-lg">
                {expert.name}
              </h4>
              <p className="text-emerald-600 text-sm font-bold flex items-center gap-1 mt-0.5">
                <Award size={14} /> {expert.role}
              </p>
            </div>
            <button className="text-emerald-500 hover:text-emerald-700 transition-colors p-1">
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-1 text-gray-400 text-xs mt-1 font-medium">
            <MapPin size={12} />
            {expert.location}
          </div>
        </div>
      </div>

      {/* Specialty Tags (Always visible or visible on expand depending on design, let's keep them visible for immediate dynamic feel) */}
      <div className="mt-4 flex flex-wrap gap-2">
        {expert.knowledge.slice(0, isExpanded ? expert.knowledge.length : 3).map((tag, idx) => (
          <span 
            key={idx} 
            className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-md tracking-wide uppercase"
          >
            {tag}
          </span>
        ))}
        {!isExpanded && expert.knowledge.length > 3 && (
          <span className="bg-gray-50 border border-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-md">
            +{expert.knowledge.length - 3}
          </span>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-emerald-100/50 animate-in fade-in slide-in-from-top-2 duration-200">
          <h5 className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-2">Detailed Biography</h5>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {expert.bio}
          </p>
          
          <button 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-sm transition-colors shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing card when clicking button
              alert(`Messaging ${expert.name} (Feature coming soon)`);
            }}
          >
            Ask a Question
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpertCard;
