import React from "react";
import { Info, AlertCircle } from "lucide-react";

const DiseaseInformationPanel = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200/60 shadow-sm transition-all hover:shadow-md">
      <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2 mb-4">
        <Info className="w-6 h-6 text-amber-600" />
        Disease Explanation
      </h3>

      <div className="space-y-5">
        <div>
          <h4 className="font-semibold text-amber-800 mb-1 flex items-center gap-2">
            Description
          </h4>
          <p className="text-gray-700 leading-relaxed bg-white/60 p-4 rounded-xl border border-amber-100">
            {result.description}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-amber-800 mb-1 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            Possible Causes
          </h4>
          <p className="text-gray-700 leading-relaxed bg-white/60 p-4 rounded-xl border border-amber-100">
            {result.causes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiseaseInformationPanel;
