import React from 'react';

const PeerBenchmarks = () => {
  const benchmarks = [
    { metric: 'Fusion Score', you: 87, deptAvg: 82, percentile: '+6%' },
    { metric: 'Pedagogy', you: 89, deptAvg: 83, percentile: '+7%' },
    { metric: 'Administration', you: 84, deptAvg: 81, percentile: '+4%' },
    { metric: 'Satisfaction', you: 4.5, deptAvg: 4.1, percentile: '+10%' }
  ];

  return (
    <div className="bg-white rounded-lg p-lg shadow-level-1">
      <h3 className="text-[33px] font-semibold text-gray-800 mb-md">Peer Benchmarks</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Metric</th>
              <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">You</th>
              <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">Dept. Avg</th>
              <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">Percentile</th>
            </tr>
          </thead>
          <tbody>
            {benchmarks.map((row, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 text-sm text-gray-800">{row.metric}</td>
                <td className="py-3 px-2 text-sm font-semibold text-gray-800 text-right">{row.you}</td>
                <td className="py-3 px-2 text-sm text-gray-600 text-right">{row.deptAvg}</td>
                <td className="py-3 px-2 text-right">
                  <span className="text-sm font-medium text-success-600">{row.percentile}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PeerBenchmarks;