
import React from "react";
import {
  Globe,
  CalendarDays,
  Bell,
  ChevronDown,
  Menu,
  User
} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-8 py-4">

      <div className="flex items-center justify-between gap-4">

        {/* Left Section */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu */}
          <button className="lg:hidden text-gray-600">
            <Menu size={24} />
          </button>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">
              Website Overview
            </h1>

            <p className="text-sm text-gray-500 hidden sm:block">
              Monitor your website performance
            </p>
          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Website Selector */}
          <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <Globe size={18} className="text-gray-600" />

            <span className="text-sm font-medium text-gray-700">
              demo.ritzmedia.com
            </span>

            <ChevronDown size={16} />
          </button>

          {/* Date Selector */}
          <button className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">

            <CalendarDays size={18} className="text-gray-600" />

            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              Last 30 Days
            </span>

            <ChevronDown size={16} />

          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <Bell size={21} className="text-gray-600" />

            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <button className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-700 transition">
            <User size={20} />
          </button>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;
