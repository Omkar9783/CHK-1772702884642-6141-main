import React, { useState, useEffect } from "react";
import { Search, Loader2, BookOpen, ChevronRight } from "lucide-react";
import { getDiseaseLibrary } from "../services/api";

const DiseaseLibrary = () => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getDiseaseLibrary().then((data) => {
      setDiseases(data);
      setLoading(false);
    });
  }, []);

  const filtered = diseases.filter(
    (d) =>
      d.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 border-b-4 border-amber-500 inline-block pb-1">
            Crop Disease Library
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Browse our comprehensive database of plant diseases.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search crop or disease..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 outline-none transition-colors text-lg"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-amber-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all group cursor-pointer">
                <div className="bg-amber-100/50 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                  <BookOpen className="text-amber-700 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-emerald-700 font-medium text-sm mb-4">
                  Affects: {item.crop}
                </p>

                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Symptoms
                    </h4>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {item.symptoms}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Prevention
                    </h4>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {item.prevention}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-amber-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Full Guide <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-gray-500">
              <p className="text-xl font-medium">
                No diseases found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiseaseLibrary;
