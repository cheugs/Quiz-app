import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

const VerbatimFeedback = () => {
  const feedback = [
    {
      id: 1,
      sentiment: 'positive',
      text: 'The explanations were incredibly clear and engaging. The examples really help understand the complex topics.',
      course: 'CS101',
      date: 'Fall 2024',
      responses: '142'
    },
    {
      id: 2,
      sentiment: 'positive',
      text: "Explain lectures are incredibly clear and engaging. The examples really help understand the complex topics.",
      course: 'CS202',
      date: 'Fall 2024',
      responses: '98'
    },
    {
      id: 3,
      sentiment: 'warning',
      text: 'Could improve the pacing. Sometimes we rush through the last slides.',
      course: 'CS101',
      date: 'Fall 2024',
      responses: '142'
    },
    {
      id: 4,
      sentiment: 'negative',
      text: "Office hours conflict with my other classes, hard to get help.",
      course: 'CS202',
      date: 'Fall 2024',
      responses: '98'
    }
  ];

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="w-5 h-5 text-success-600" />;
      case 'warning':
        return <Meh className="w-5 h-5 text-warning-600" />;
      case 'negative':
        return <Frown className="w-5 h-5 text-error-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-lg shadow-level-1">
      <div className="flex items-center justify-between mb-md">
        <h3 className="text-[33px] font-semibold text-gray-800">Verbatim Feedback</h3>
        <div className="flex gap-2 text-xs">
          <button className="px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">All</button>
          <button className="px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">Positive</button>
          <button className="px-2 py-1 text-gray-600 hover:bg-gray-50 rounded">Critical</button>
        </div>
      </div>

      <div className="space-y-sm">
        {feedback.map((item) => (
          <div
            key={item.id}
            className="p-md border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start gap-sm">
              <div className="mt-0.5">
                {getSentimentIcon(item.sentiment)}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-2">{item.text}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{item.course}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.responses} responses</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-md text-sm text-primary-600 hover:text-primary-700 font-medium">
        Load more feedback
      </button>
    </div>
  );
};

export default VerbatimFeedback;