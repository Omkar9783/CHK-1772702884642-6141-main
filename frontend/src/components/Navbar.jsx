import React from "react";
import { useTranslation } from "react-i18next";
import { Leaf, Globe, UserCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto glass-card px-6 h-16 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-xl animate-float">
            <Leaf className="w-6 h-6 text-yellow-300" />
          </div>
          <Link to="/" className="text-2xl font-black tracking-tight text-emerald-900">
            {t("appTitle")}
          </Link>
        </div>

        <div className="hidden md:flex space-x-2 items-center">
          <Link to="/" className="nav-link text-gray-700 hover:text-emerald-700">
            {t("nav.home")}
          </Link>
          <Link
            to="/detect"
            className="nav-link text-gray-700 hover:text-emerald-700">
            {t("nav.detect")}
          </Link>
          <Link
            to="/library"
            className="nav-link text-gray-700 hover:text-emerald-700">
            {t("nav.library")}
          </Link>
          <Link
            to="/history"
            className="nav-link text-gray-700 hover:text-emerald-700">
            {t("nav.history")}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 bg-emerald-50/50 px-3 py-1.5 rounded-xl border border-emerald-100">
            <Globe className="w-4 h-4 text-emerald-600" />
            <select
              className="bg-transparent text-emerald-900 border-none outline-none cursor-pointer font-bold text-sm"
              onChange={changeLanguage}
              value={i18n.language}>
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="mr">MR</option>
            </select>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block font-bold text-emerald-900">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-rose-500 hover:bg-rose-600 text-white p-2.5 rounded-xl transition-all shadow-md shadow-rose-100"
                title="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="font-bold text-gray-600 hover:text-emerald-700">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-emerald-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <div className="md:hidden flex overflow-x-auto py-2 space-x-4 pb-3 scrollbar-hide">
        <Link
          to="/"
          className="whitespace-nowrap bg-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
          {t("nav.home")}
        </Link>
        <Link
          to="/detect"
          className="whitespace-nowrap bg-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
          {t("nav.detect")}
        </Link>
        <Link
          to="/library"
          className="whitespace-nowrap bg-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
          {t("nav.library")}
        </Link>
        <Link
          to="/history"
          className="whitespace-nowrap bg-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
          {t("nav.history")}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
