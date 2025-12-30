import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const RecentFeedback = () => {
  const feedbackItems = [
    {
      id: 1,
      type: 'positive',
      title: 'Excellent clarity on concepts',
      quote: 'The way you explained recursion was really helpful...',
      course: 'CS101',
      quiz: 'Q3.2',
      time: '2d ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Pacing was a bit fast',
      quote: 'Could we slow down on the graph theory slides next time?',
      course: 'CS202',
      quiz: 'Q5.1',
      time: '3d ago'
    },
    {
      id: 3,
      type: 'positive',
      title: 'Great practical examples',
      quote: 'Loved the live coding session today.',
      course: 'CS101',
      quiz: 'Q3.8',
      time: '4d ago'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Recent Feedback</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {feedbackItems.map((item) => (
          <div 
            key={item.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className={item.type === 'positive' ? 'text-green-600' : 'text-yellow-600'}>
                {item.type === 'positive' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-gray-600 text-sm italic mb-2">"{item.quote}"</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{item.course}</span>
                  <span>•</span>
                  <span>{item.quiz}</span>
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

export default RecentFeedback;