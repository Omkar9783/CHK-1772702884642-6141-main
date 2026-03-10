import React from "react";
import { useTranslation } from "react-i18next";
import { HelpCircle } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto glass-card p-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left space-y-2">
          <h3 className="text-3xl font-black text-emerald-900 tracking-tight">
            {t("appTitle")}
          </h3>
          <p className="text-emerald-800/60 font-bold">{t("footer.text")}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-emerald-100 transition-all active:scale-95 flex items-center gap-3">
            <HelpCircle className="w-5 h-5" />
            {t("dashboard.actionHelp")}
          </button>
          <div className="flex items-center gap-4 px-6 py-4 bg-white/40 rounded-2xl border border-white/20 backdrop-blur-sm">
            <span className="text-emerald-900 font-black text-sm">
              Follow us
            </span>
            <div className="w-8 h-8 bg-emerald-100 rounded-full"></div>
            <div className="w-8 h-8 bg-emerald-100 rounded-full"></div>
          </div>
        </div>
      </div>
      <p className="text-center mt-8 text-emerald-800/40 font-black text-xs uppercase tracking-[0.3em]">
        © 2026 CropCare AI • Sustainable Farming for the Future
      </p>
    </footer>
  );
};

export default Footer;
