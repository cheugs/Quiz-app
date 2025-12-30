import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import QuizStudio from './pages/QuizStudio';
import Analytics from './pages/Analytics';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="max-w-7xl mx-auto px-8 py-8">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'quiz-studio' && <QuizStudio />}
        {currentPage === 'analytics' && <Analytics />}
      </main>
    </div>
  );
}

export default App;