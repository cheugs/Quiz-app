import React from 'react';
import { TrendingDown } from 'lucide-react';

const FusionScoreCard = () => {
  const score = 78;
  const change = -4.2;
  const previousScore = 82;
  const nextEvaluation = 'Oct 15, 2024';
  
  // Calculate circle progress (SVG circle)
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - score) / 100) * circumference;

  return (
    <div className="bg-white rounded-lg p-lg shadow-level-1">
      <div className="flex items-start justify-between mb-md">
        {/* Circle Score */}
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#3B82F6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          {/* Score Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[64px] font-bold text-gray-800">{score}</span>
          </div>
        </div>

        {/* Evaluation Info */}
        <div className="text-right">
          <p className="text-sm text-gray-600 mb-1">Next Evaluation</p>
          <p className="text-base font-semibold text-gray-800">{nextEvaluation}</p>
          <button className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium">
            View Detailed Breakdown
          </button>
        </div>
      </div>

      {/* Fusion Score Label & Description */}
      <div>
        <h3 className="text-[33px] font-semibold text-gray-800 mb-2">Fusion Score</h3>
        <p className="text-base text-gray-600 leading-relaxed mb-md">
          Your teaching effectiveness is trending upward. Student engagement in recent quizzes has significantly improved.
        </p>
      </div>

      {/* Score Change Indicator */}
      <div className="flex items-center gap-xs pt-md border-t border-gray-200">
        <div className="flex items-center gap-1 text-error-600">
          <TrendingDown className="w-4 h-4" />
          <span className="text-sm font-medium">{Math.abs(change)}% vs last cycle</span>
        </div>
        <span className="text-sm text-gray-500">Previous:</span>
        <span className="text-sm font-semibold text-gray-700">{previousScore}</span>
      </div>
    </div>
  );
};

export default FusionScoreCard;