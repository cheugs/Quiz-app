import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Download, Smile, Meh, Frown } from 'lucide-react';

const Analytics = () => {
  const trendData = [
    { cycle: 'Jan 23', fusion: 68, pedagogy: 70, admin: 65 },
    { cycle: 'Mar 23', fusion: 72, pedagogy: 73, admin: 70 },
    { cycle: 'Jun 23', fusion: 75, pedagogy: 76, admin: 73 },
    { cycle: 'Sep 23', fusion: 78, pedagogy: 80, admin: 75 },
    { cycle: 'Dec 23', fusion: 81, pedagogy: 83, admin: 78 },
    { cycle: 'Mar 24', fusion: 84, pedagogy: 85, admin: 82 },
    { cycle: 'Current', fusion: 87, pedagogy: 88, admin: 85 }
  ];

  const sentimentData = [
    { name: 'Positive', value: 72, color: '#10B981' },
    { name: 'Neutral', value: 18, color: '#F59E0B' },
    { name: 'Negative', value: 10, color: '#EF4444' }
  ];

  const pedagogyData = [
    { component: 'Clarity', score: 88, dept: 82 },
    { component: 'Engagement', score: 92, dept: 85 },
    { component: 'Materials', score: 85, dept: 80 }
  ];

  const adminData = [
    { component: 'Punctuality', score: 95, dept: 89 },
    { component: 'Availability', score: 90, dept: 84 },
    { component: 'Grading', score: 93, dept: 87 }
  ];

  const peerComparison = [
    { metric: 'Fusion Score', you: 92, dept: 87, inst: 84 },
    { metric: 'Pedagogy', you: 91, dept: 85, inst: 82 },
    { metric: 'Administration', you: 94, dept: 89, inst: 86 },
    { metric: 'Satisfaction', you: 4.8, dept: 4.5, inst: 4.3 }
  ];

  const feedbackList = [
    { 
      id: 1, 
      sentiment: 'positive', 
      text: 'Dr. Bilogui\'s lectures are incredibly clear and engaging. The examples really help understand the complex topics.', 
      course: 'CS101', 
      cycle: 'Fall 2024',
      rating: 5 
    },
    { 
      id: 2, 
      sentiment: 'neutral', 
      text: 'Good content but could improve pacing. Sometimes we rush through the last slides.', 
      course: 'CS202', 
      cycle: 'Fall 2024',
      rating: 3 
    },
    { 
      id: 3, 
      sentiment: 'positive', 
      text: 'The assignments were very practical and helpful for the final project.', 
      course: 'CS101', 
      cycle: 'Fall 2024',
      rating: 5 
    },
    { 
      id: 4, 
      sentiment: 'negative', 
      text: 'Office hours conflict with my other classes, hard to get help.', 
      course: 'CS202', 
      cycle: 'Fall 2024',
      rating: 2 
    }
  ];

  const getSentimentIcon = (sentiment) => {
    const iconClass = "w-5 h-5";
    if (sentiment === 'positive') return <Smile className={`${iconClass} text-green-600`} />;
    if (sentiment === 'neutral') return <Meh className={`${iconClass} text-yellow-600`} />;
    return <Frown className={`${iconClass} text-red-600`} />;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-gray-800">Performance</h1>
          <h2 className="text-4xl font-semibold text-gray-700 mt-1">Analytics</h2>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Export Report</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
          <option>Last 3 Cycles</option>
          <option>Last 6 Cycles</option>
          <option>Last Year</option>
          <option>All Time</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
          <option>All Courses</option>
          <option>CS101: Intro to CS</option>
          <option>CS202: Data Structures</option>
        </select>
        <button className="text-sm text-gray-600 hover:text-gray-800">Clear all</button>
      </div>

      {/* Fusion Score Trend */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Fusion Score Trend</h3>
            <p className="text-sm text-gray-600 mt-1">Historical performance across all dimensions</p>
          </div>
          <div className="flex gap-2 text-xs">
            <button className="px-3 py-1 bg-purple-50 text-purple-600 rounded-md font-medium">Fusion Score</button>
            <button className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded-md">Pedagogy</button>
            <button className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded-md">Administration</button>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="cycle" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} domain={[60, 100]} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '8px 12px'
                }}
              />
              <Line type="monotone" dataKey="fusion" stroke="#8B5CF6" strokeWidth={3} name="Fusion Score" dot={{ fill: '#8B5CF6', r: 5 }} />
              <Line type="monotone" dataKey="pedagogy" stroke="#3B82F6" strokeWidth={2} name="Pedagogy" dot={{ fill: '#3B82F6', r: 4 }} />
              <Line type="monotone" dataKey="admin" stroke="#10B981" strokeWidth={2} name="Administration" dot={{ fill: '#10B981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dimension Breakdowns */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Pedagogy Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pedagogyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="component" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="score" fill="#3B82F6" name="You" radius={[8, 8, 0, 0]} />
                <Bar dataKey="dept" fill="#93C5FD" name="Dept Avg" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Administration Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adminData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="component" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="score" fill="#10B981" name="You" radius={[8, 8, 0, 0]} />
                <Bar dataKey="dept" fill="#6EE7B7" name="Dept Avg" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sentiment & Peer Comparison */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Sentiment & Themes</h3>
            <p className="text-xs text-gray-600">142 responses</p>
          </div>

          <div className="flex gap-2 mb-6">
            <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded font-medium">Clear explanations</button>
            <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded">Engaging</button>
            <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded">Pacing</button>
            <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded">Helpful</button>
          </div>

          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-4xl font-bold text-gray-800">72%</p>
              <p className="text-xs text-gray-600">Positive</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            {sentimentData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Peer Benchmarks</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Metric</th>
                  <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">You</th>
                  <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">Dept</th>
                  <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">Inst</th>
                  <th className="text-right py-2 px-2 text-sm font-semibold text-gray-700">Rank</th>
                </tr>
              </thead>
              <tbody>
                {peerComparison.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm text-gray-800">{row.metric}</td>
                    <td className="py-3 px-2 text-sm font-semibold text-gray-800 text-right">{row.you}</td>
                    <td className="py-3 px-2 text-sm text-gray-600 text-right">{row.dept}</td>
                    <td className="py-3 px-2 text-sm text-gray-600 text-right">{row.inst}</td>
                    <td className="py-3 px-2 text-right">
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Top 15%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Verbatim Feedback */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Verbatim Feedback</h3>
          <div className="flex gap-2 text-xs">
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium">All</button>
            <button className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded">Positive</button>
            <button className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded">Critical</button>
          </div>
        </div>

        <div className="space-y-4">
          {feedbackList.map((item) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getSentimentIcon(item.sentiment)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 mb-2">{item.text}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{item.course}</span>
                    <span>•</span>
                    <span>{item.cycle}</span>
                    <span>•</span>
                    <span>Rating: {item.rating}/5</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
          Load more feedback
        </button>
      </div>
    </div>
  );
};

export default Analytics;