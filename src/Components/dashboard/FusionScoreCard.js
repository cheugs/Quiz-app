import React from 'react';
import { TrendingUp } from 'lucide-react';

const FusionScoreCard = () => {
  const score = 78;
  const change = 3.2;
  const pedagogy = 82;
  const administration = 74;

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-6xl font-bold text-gray-800">{score}</span>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold">+{change}%</span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Fusion Score</h3>
          <p className="text-gray-600">Your teaching effectiveness is trending upward</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Next Evaluation</p>
          <p className="font-semibold text-gray-800">Oct 15, 2024</p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Pedagogy</p>
            <p className="text-2xl font-bold text-blue-600">{pedagogy}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Administration</p>
            <p className="text-2xl font-bold text-green-600">{administration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FusionScoreCard;