import React from 'react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-semibold text-gray-800 text-lg">Teacher Dashboard</span>
            </div>

            <nav className="flex gap-2">
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === 'dashboard' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setCurrentPage('quiz-studio')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === 'quiz-studio' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Quiz Studio
              </button>
              <button 
                onClick={() => setCurrentPage('analytics')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === 'analytics' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Analytics
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
              <span>Saint Jean Ingenieur</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
              SB
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;