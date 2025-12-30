import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FusionTrendChart = () => {
  const data = [
    { date: 'Jan 13', fusionScore: 68, pedagogy: 70, administration: 65 },
    { date: 'Jan 20', fusionScore: 72, pedagogy: 73, administration: 70 },
    { date: 'Jan 27', fusionScore: 75, pedagogy: 76, administration: 73 },
    { date: 'Feb 3', fusionScore: 78, pedagogy: 80, administration: 75 },
    { date: 'Feb 10', fusionScore: 81, pedagogy: 83, administration: 78 },
    { date: 'Feb 17', fusionScore: 84, pedagogy: 85, administration: 82 },
    { date: 'Feb 24', fusionScore: 87, pedagogy: 88, administration: 85 },
    { date: 'Mar 3', fusionScore: 89, pedagogy: 90, administration: 87 },
    { date: 'Mar 10', fusionScore: 91, pedagogy: 92, administration: 89 },
  ];

  return (
    <div className="bg-white rounded-lg p-lg shadow-level-1">
      <div className="flex items-start justify-between mb-md">
        <div>
          <h3 className="text-[33px] font-semibold text-gray-800">Fusion Score Trend</h3>
          <p className="text-sm text-gray-600 mt-1">Historical performance scores at all dimensions</p>
        </div>
        <div className="flex gap-2">
          <button className="px-2 py-1 text-xs bg-primary-50 text-primary-600 rounded hover:bg-primary-100">
            Fusion Score
          </button>
          <button className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded">
            Pedagogy
          </button>
          <button className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded">
            Administration
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
              domain={[60, 100]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="fusionScore" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', r: 4 }}
              activeDot={{ r: 6 }}
              name="Fusion Score"
            />
            <Line 
              type="monotone" 
              dataKey="pedagogy" 
              stroke="#14B8A6" 
              strokeWidth={2}
              dot={{ fill: '#14B8A6', r: 3 }}
              name="Pedagogy"
            />
            <Line 
              type="monotone" 
              dataKey="administration" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              dot={{ fill: '#8B5CF6', r: 3 }}
              name="Administration"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FusionTrendChart;