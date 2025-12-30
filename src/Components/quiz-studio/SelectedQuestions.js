import React from 'react';
import { X } from 'lucide-react';

const SelectedQuestions = ({ questions, onRemove }) => {
  const minRequired = 10;
  const needMore = Math.max(0, minRequired - questions.length);

  return (
    <div className="bg-white rounded-lg p-lg shadow-level-1">
      <div className="flex items-center justify-between mb-md">
        <h3 className="text-[26px] font-semibold text-gray-800">Selected Questions</h3>
        <span className="text-sm text-gray-600">{questions.length} / 20</span>
      </div>

      <p className="text-sm text-gray-600 mb-md">Target: 15-20 questions</p>

      {/* Selected Questions List */}
      <div className="space-y-sm mb-md">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="p-sm border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800 text-sm">{question.id}</span>
                  <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                    {question.type}
                  </span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{question.text}</p>
              </div>
              <button
                onClick={() => onRemove(question.id)}
                className="p-1 text-gray-400 hover:text-error-600 hover:bg-error-50 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Warning if insufficient questions */}
      {needMore > 0 && (
        <div className="p-sm bg-warning-50 border border-warning-200 rounded-md">
          <p className="text-sm text-warning-800">
            <span className="font-semibold">Insufficient questions.</span><br />
            Add at least {needMore} more questions to publish.
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectedQuestions;