import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getWeatherData } from "../services/api";
import {
  Camera,
  BookOpen,
  Clock,
  ThermometerSun,
  Droplets,
  CloudRain,
  AlertTriangle,
  Leaf,
} from "lucide-react";
import { Link } from "react-router-dom";

import HelpCenter from "../components/HelpCenter";
import ExpertCard from "../components/ExpertCard";

const Home = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeatherData().then((data) => setWeather(data));
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[32px] bg-emerald-900 text-white p-8 md:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/20 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            {t("hero.title")}{" "}
            <span className="text-yellow-400">{t("hero.titleAccent")}</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 mb-8 font-medium">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/detect" className="btn-primary px-8 py-4 text-lg">
              <Camera className="w-6 h-6" /> {t("hero.startBtn")}
            </Link>
            <Link
              to="/library"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold transition-all border border-white/20">
              {t("hero.browseBtn")}
            </Link>
          </div>
        </div>
        <Leaf className="absolute -bottom-12 -right-12 w-64 h-64 text-emerald-800/40 rotate-12" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weather Widget (Glassmorphism) */}
        <section className="glass-card p-8 group">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-gray-900">
              {t("dashboard.weather")}
            </h2>
            <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
              <ThermometerSun className="w-6 h-6" />
            </div>
          </div>

          {weather ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white/40 p-5 rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <Droplets className="text-blue-500 w-5 h-5" />
                  <span className="font-bold text-gray-600">
                    {t("dashboard.humidity")}
                  </span>
                </div>
                <span className="text-2xl font-black text-gray-900">
                  {weather.humidity}
                </span>
              </div>

              <div className="flex items-center justify-between bg-white/40 p-5 rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <CloudRain className="text-slate-500 w-5 h-5" />
                  <span className="font-bold text-gray-600">
                    {t("dashboard.rainRisk")}
                  </span>
                </div>
                <span className="text-2xl font-black text-gray-900">
                  {weather.rain}
                </span>
              </div>

              {weather.alert && (
                <div className="mt-6 bg-rose-50/50 backdrop-blur-sm text-rose-700 p-5 rounded-2xl border border-rose-100 flex items-start gap-4">
                  <AlertTriangle className="shrink-0 mt-0.5 w-5 h-5" />
                  <p className="font-bold text-sm leading-relaxed">
                    {weather.alert}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-20 bg-gray-100 rounded-2xl"></div>
              <div className="h-20 bg-gray-100 rounded-2xl"></div>
              <div className="h-20 bg-gray-100 rounded-2xl"></div>
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to="/detect"
            className="glass-card p-8 overflow-hidden relative flex flex-col justify-between min-h-[220px]">
            <div className="relative z-10">
              <div className="bg-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-200">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                {t("dashboard.scanTitle")}
              </h3>
              <p className="text-gray-500 font-medium italic">
                {t("dashboard.scanDesc")}
              </p>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-5">
              <Camera className="w-48 h-48" />
            </div>
          </Link>

          <Link
            to="/library"
            className="glass-card p-8 overflow-hidden relative flex flex-col justify-between min-h-[220px]">
            <div className="relative z-10">
              <div className="bg-amber-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-amber-200">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                {t("dashboard.libraryTitle")}
              </h3>
              <p className="text-gray-500 font-medium italic">
                {t("dashboard.libraryDesc")}
              </p>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-5">
              <BookOpen className="w-48 h-48" />
            </div>
          </Link>

          <Link
            to="/history"
            className="md:col-span-2 glass-card p-8 flex items-center justify-between border-b-4 border-b-emerald-600">
            <div className="flex items-center gap-6">
              <div className="bg-blue-500 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">
                  {t("dashboard.historyTitle")}
                </h3>
                <p className="text-gray-500 font-medium">
                  {t("dashboard.historyDesc")}
                </p>
              </div>
            </div>
            <div className="bg-emerald-600 p-4 rounded-2xl font-black text-white">
              →
            </div>
          </Link>
        </div>
      </div>

      {/* Help Center Assistant */}
      <section className="mt-12">
        <HelpCenter />
      </section>

      {/* Community & Expert Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-black text-emerald-900 tracking-tight">
              {t("experts.title")}
            </h2>
            <p className="text-emerald-800/60 font-bold mt-2">
              {t("experts.subtitle")}
            </p>
          </div>
          <button className="text-emerald-600 font-extrabold hover:underline flex items-center gap-2">
            {t("experts.viewAll")} <span className="text-xl">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Aris Sudarsono",
              role: "Plant Pathologist",
              location: "Indonesia",
              status: "online",
              img: "https://images.unsplash.com/photo-1559839734-2b71f1536783",
              knowledge: ["Rice Blast", "Tomato Blight", "Cassava Mosaic", "Fungal Infections"],
              bio: "Dr. Sudarsono has over 15 years of experience diagnosing tropical and sub-tropical crop diseases. He specializes in fungal pathogens affecting staple crops and advocates for organic remediation techniques."
            },
            {
              name: "Sarah Jenkins",
              role: "Soil Health Expert",
              location: "United States",
              status: "online",
              img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
              knowledge: ["Nutrient Deficiencies", "Soil pH", "Corn Smut", "Crop Rotation"],
              bio: "Sarah is an agronomist focusing on regenerative agriculture. She helps farmers balance soil chemistry to naturally resist bacterial outbeaks in high-yield crops like corn and wheat."
            },
            {
              name: "Rahul Sharma",
              role: "Precision Agronomist",
              location: "India",
              status: "offline",
              img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
              knowledge: ["Pest Management", "Mango Hopper", "Apple Scab", "Drip Irrigation"],
              bio: "Rahul leverages modern sensing technology to detect micro-climate changes that lead to pest infestations. He provides actionable insights for orchards and fruit crops."
            },
          ].map((expert, i) => (
            <ExpertCard key={i} expert={expert} />
          ))}
        </div>

        <div className="glass-card p-1 bg-gradient-to-r from-emerald-600 to-emerald-800">
          <div className="bg-white/10 backdrop-blur-md rounded-[22px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black">{t("experts.forumTitle")}</h3>
              <p className="text-emerald-100 font-medium">
                {t("experts.forumDesc")}
              </p>
            </div>
            <button className="bg-white text-emerald-900 px-10 py-4 rounded-2xl font-black shadow-2xl whitespace-nowrap">
              {t("experts.forumBtn")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
