import React, { useState, useEffect } from "react";
import { getHistory } from "../services/api";
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertOctagon,
  Activity,
} from "lucide-react";

const FarmerHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory().then((data) => {
      setHistory(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="mb-8 border-l-4 border-l-blue-500 pl-4">
        <h1 className="text-3xl font-extrabold text-gray-900 border-b-2 border-transparent pb-1 inline-block">
          Analysis History
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Review your past crop scans and AI recommendations.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-100 rounded-2xl w-full"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((record) => (
              <div
                key={record.id}
                className="border border-gray-200 rounded-2xl p-5 hover:bg-gray-50 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-full text-blue-600 shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {record.crop} - {record.disease}
                    </h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4" /> {new Date(record.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} • ID: {record._id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0">
                  <div
                    className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 ${
                      record.status === "Severe"
                        ? "bg-red-100 text-red-700"
                        : record.status === "Moderate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}>
                    {record.status === "Severe" ? (
                      <AlertOctagon className="w-4 h-4" />
                    ) : (
                      <Activity className="w-4 h-4" />
                    )}
                    {record.status}
                  </div>

                  <button className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ml-auto md:ml-0 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerHistory;
