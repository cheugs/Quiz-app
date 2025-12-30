import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceTrend = () => {
  const data = [
    { cycle: 'Cycle 1', score: 65 },
    { cycle: 'Cycle 2', score: 68 },
    { cycle: 'Cycle 3', score: 72 },
    { cycle: 'Cycle 4', score: 75 },
    { cycle: 'Cycle 5', score: 78 },
    { cycle: 'Current', score: 82 },
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Performance Trend</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="cycle" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              domain={[60, 100]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        Top <span className="font-semibold text-green-600">15%</span> of Department
      </p>
    </div>
  );
};

export default PerformanceTrend;