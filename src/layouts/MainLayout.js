import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell } from 'lucide-react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Navigation */}
            <div className="flex items-center gap-lg">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="font-semibold text-gray-800 text-lg">EduDash</span>
              </div>

              {/* Navigation Tabs */}
              <nav className="flex gap-1">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/quiz-studio"
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`
                  }
                >
                  Quiz Studio
                </NavLink>
                <NavLink
                  to="/analytics"
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`
                  }
                >
                  Analytics
                </NavLink>
              </nav>
            </div>

            {/* Right Side: Institution Selector + Notifications + Profile */}
            <div className="flex items-center gap-4">
              {/* Institution Selector */}
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                <span>Stanford Univ.</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Notifications */}
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors">
                <Bell className="w-5 h-5" />
              </button>

              {/* Profile Avatar */}
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-xl py-xl">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;