import React from 'react';

const DimensionBreakdown = ({ title, dimension }) => {
  const data = dimension === 'pedagogy' ? [
    { label: 'Content Clarity', score: 91, max: 100 },
    { label: 'Practical Examples', score: 87, max: 100 },
    { label: 'Learning Materials', score: 84, max: 100 }
  ] : [
    { label: 'Grading Fairness', score: 89, max: 100 },
    { label: 'Feedback Timeliness', score: 85, max: 100 },
    { label: 'Course Organization', score: 82, max: 100 }
  ];

  const color = dimension === 'pedagogy' ? '#14B8A6' : '#8B5CF6';

  return (
    <div className="bg-white rounded-lg p-lg shadow-level-1">
      <h3 className="text-[33px] font-semibold text-gray-800 mb-md">{title}</h3>
      
      <div className="space-y-md">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-sm font-bold text-gray-800">{item.score}/{item.max}</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(item.score / item.max) * 100}%`,
                  backgroundColor: color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DimensionBreakdown;