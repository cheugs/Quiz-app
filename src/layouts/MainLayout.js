import React from 'react';
import { NavLink } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="font-semibold text-gray-800">EduDash</span>
              </div>

              <nav className="flex gap-1">
                <NavLink to="/dashboard" className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Dashboard
                </NavLink>
                <NavLink to="/quiz-studio" className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Quiz Studio
                </NavLink>
                <NavLink to="/analytics" className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Analytics
                </NavLink>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;