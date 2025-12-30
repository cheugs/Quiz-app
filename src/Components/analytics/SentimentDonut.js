import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const SentimentDonut = () => {
  const data = [
    { name: 'Positive', value: 72, color: '#10B981' },
    { name: 'Neutral', value: 18, color: '#F59E0B' },
    { name: 'Negative', value: 10, color: '#EF4444' }
  ];

  const tabs = ['Clear explanations', 'Engaging', 'Pacing', 'Helpful'];

  return (
    <div className="bg-white rounded-lg p-lg shadow-level-1">
      <div className="mb-md">
        <h3 className="text-[33px] font-semibold text-gray-800 mb-2">Sentiment & Themes</h3>
        <p className="text-xs text-gray-600">142 responses</p>
      </div>

      <div className="flex gap-2 mb-md">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-3 py-1 text-xs rounded ${
              index === 0
                ? 'bg-primary-100 text-primary-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="h-48 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry) => (
                <span className="text-sm text-gray-700">
                  {value} <span className="font-semibold">({entry.payload.value}%)</span>
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center -mt-32 pointer-events-none">
        <p className="text-4xl font-bold text-gray-800">72%</p>
        <p className="text-xs text-gray-600">Positive</p>
      </div>
    </div>
  );
};

export default SentimentDonut;