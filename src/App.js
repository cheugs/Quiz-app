import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import QuizStudio from './pages/QuizStudio';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz-studio" element={<QuizStudio />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;