import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, CheckCircle, AlertCircle, FileText, Users, Clock } from 'lucide-react';

const FusionScoreCard = () => {
  const score = 78;
  const change = 4.2;
  const pedagogy = 82;
  const administration = 74;
  
  const circumference = 2 * Math.PI * 45;
  const progress = ((score / 100) * circumference);

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="45" stroke="#E5E7EB" strokeWidth="10" fill="none" />
              <circle cx="64" cy="64" r="45" stroke="#3B82F6" strokeWidth="10" fill="none"
                strokeDasharray={circumference} strokeDashoffset={circumference - progress} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">{score}</span>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-semibold text-gray-800 mb-2">Fusion Score</h3>
            <p className="text-gray-600 mb-4">Your teaching effectiveness is trending upward.<br/>Student engagement has improved.</p>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold">+{change}% vs last cycle</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Next Evaluation</p>
          <p className="font-semibold text-gray-800">Oct 15, 2024</p>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
            View Breakdown
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Pedagogy</p>
            <p className="text-3xl font-bold text-blue-600">{pedagogy}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Administration</p>
            <p className="text-3xl font-bold text-green-600">{administration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PerformanceTrend = () => {
  const data = [
    { cycle: 'Cycle 1', score: 65, deptAvg: 63 },
    { cycle: 'Cycle 2', score: 68, deptAvg: 64 },
    { cycle: 'Cycle 3', score: 72, deptAvg: 66 },
    { cycle: 'Cycle 4', score: 75, deptAvg: 67 },
    { cycle: 'Cycle 5', score: 78, deptAvg: 68 },
    { cycle: 'Current', score: 82, deptAvg: 69 },
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Performance Trend</h3>
        <div className="flex gap-2 text-xs">
          <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md font-medium">You</button>
          <button className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded-md">Dept. Avg</button>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="cycle" tick={{ fontSize: 12, fill: '#6B7280' }} />
            <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} domain={[60, 90]} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 5 }} />
            <Line type="monotone" dataKey="deptAvg" stroke="#93C5FD" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        Top <span className="font-semibold text-green-600">15%</span> of Department
      </p>
    </div>
  );
};

const RecentFeedback = () => {
  const feedbackItems = [
    { id: 1, type: 'positive', title: 'Excellent clarity on concepts', quote: 'The way you explained recursion was really helpful...', course: 'CS101', quiz: 'Q3.2', time: '2d ago' },
    { id: 2, type: 'warning', title: 'Pacing was a bit fast', quote: 'Could we slow down on the graph theory slides?', course: 'CS202', quiz: 'Q5.1', time: '3d ago' },
    { id: 3, type: 'positive', title: 'Great practical examples', quote: 'Loved the live coding session today.', course: 'CS101', quiz: 'Q3.8', time: '4d ago' }
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Recent Feedback</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</button>
      </div>

      <div className="space-y-4">
        {feedbackItems.map((item) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
            <div className="flex items-start gap-3">
              <div className={item.type === 'positive' ? 'text-green-600 mt-1' : 'text-yellow-600 mt-1'}>
                {item.type === 'positive' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-gray-600 text-sm italic mb-2">"{item.quote}"</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{item.course}</span><span>•</span><span>{item.quiz}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatsCard = ({ icon, value, label, bgColor, textColor }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${bgColor}`}>{icon}</div>
      <div>
        <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span>Fall 2024</span><span>•</span>
            <span>CS101: Intro to CS</span><span>•</span>
            <span>Last 30 Days</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          <FileText className="w-4 h-4" />
          <span className="text-sm font-medium">Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FusionScoreCard />
        <PerformanceTrend />
      </div>

      <RecentFeedback />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard icon={<FileText className="w-6 h-6 text-blue-600" />} value="3" label="Active Quizzes" bgColor="bg-blue-50" textColor="text-blue-600" />
        <StatsCard icon={<Clock className="w-6 h-6 text-yellow-600" />} value="2 Days" label="Next Deadline" bgColor="bg-yellow-50" textColor="text-yellow-600" />
        <StatsCard icon={<Users className="w-6 h-6 text-green-600" />} value="142" label="Students Enrolled" bgColor="bg-green-50" textColor="text-green-600" />
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm">
          <span className="text-xl">+</span>
          <span className="font-medium">Create Quiz</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;