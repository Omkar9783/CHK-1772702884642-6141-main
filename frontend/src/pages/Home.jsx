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
  Leaf
} from "lucide-react";
import { Link } from "react-router-dom";

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
            Protect Your Crops with{" "}
            <span className="text-yellow-400">AI Precision.</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 mb-8 font-medium">
            Empowering farmers with state-of-the-art CNN technology for instant
            disease detection and smart treatment recommendations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/detect" className="btn-primary px-8 py-4 text-lg">
              <Camera className="w-6 h-6" /> Start Detection
            </Link>
            <Link
              to="/library"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold transition-all border border-white/20">
              Browse Library
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
                  <span className="font-bold text-gray-600">Humidity</span>
                </div>
                <span className="text-2xl font-black text-gray-900">
                  {weather.humidity}
                </span>
              </div>

              <div className="flex items-center justify-between bg-white/40 p-5 rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <CloudRain className="text-slate-500 w-5 h-5" />
                  <span className="font-bold text-gray-600">Rain risk</span>
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
                Scan Your Crop
              </h3>
              <p className="text-gray-500 font-medium italic">
                Get instant AI results and expert treatment advice in seconds.
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
                Knowledge Base
              </h3>
              <p className="text-gray-500 font-medium italic">
                Master crop health with our expansive disease identification
                library.
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
                  Analysis Archive
                </h3>
                <p className="text-gray-500 font-medium">
                  Track and monitor your farm's health history over time.
                </p>
              </div>
            </div>
            <div className="bg-emerald-600 p-4 rounded-2xl font-black text-white">
              →
            </div>
          </Link>
        </div>
      </div>

      {/* Community & Expert Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-black text-emerald-900 tracking-tight">
              Community & Expert Advice
            </h2>
            <p className="text-emerald-800/60 font-bold mt-2">
              Connect with leading agricultural scientists and fellow farmers.
            </p>
          </div>
          <button className="text-emerald-600 font-extrabold hover:underline flex items-center gap-2">
            View All Experts <span className="text-xl">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Aris Sudarsono",
              role: "Plant Pathologist",
              img: "https://images.unsplash.com/photo-1559839734-2b71f1536783",
            },
            {
              name: "Sarah Jenkins",
              role: "Soil Scientist",
              img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
            },
            {
              name: "Rahul Sharma",
              role: "Precision Farming Specialist",
              img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
            },
          ].map((expert, i) => (
            <div
              key={i}
              className="glass-card p-6 flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white flex-shrink-0">
                <img
                  src={expert.img}
                  alt={expert.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-black text-gray-900 leading-tight">
                  {expert.name}
                </h4>
                <p className="text-emerald-600 text-sm font-bold">
                  {expert.role}
                </p>
                <div className="mt-2 flex gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase">
                    Online
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-1 bg-gradient-to-r from-emerald-600 to-emerald-800">
          <div className="bg-white/10 backdrop-blur-md rounded-[22px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black">Join the Farmer's Forum</h3>
              <p className="text-emerald-100 font-medium">
                Discuss disease prevention and share your success stories with
                10k+ farmers.
              </p>
            </div>
            <button className="bg-white text-emerald-900 px-10 py-4 rounded-2xl font-black shadow-2xl whitespace-nowrap">
              Access Forum
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
