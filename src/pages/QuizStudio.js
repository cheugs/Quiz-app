import React, { useState } from 'react';
import QuestionBank from '../components/quiz-studio/QuestionBank';
import SelectedQuestions from '../components/quiz-studio/SelectedQuestions';

const QuizStudio = () => {
  const [quizTitle, setQuizTitle] = useState('Mid-Term Evaluation: Data Structures');
  const [course, setCourse] = useState('CS101: Intro to CS');
  const [duration, setDuration] = useState('45');
  const [shuffle, setShuffle] = useState(true);
  const [allowReview, setAllowReview] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([
    { id: 'Q1', type: 'MCQ', text: 'Which of the following is an advantage of a linked list over an array?' },
    { id: 'Q2', type: 'Short', text: 'Explain the base case in a recursive function.' },
    { id: 'Q3', type: 'MCQ', text: 'What is the output of the following code snippet regarding stacks?' },
    { id: 'Q4', type: 'TF', text: 'Binary search trees are always balanced.' }
  ]);

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-lg">
        <h1 className="text-[51px] font-bold text-gray-800 leading-tight">Create New Quiz</h1>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Student Preview
        </button>
      </div>

      {/* Quiz Configuration Form */}
      <div className="bg-white rounded-lg p-lg shadow-level-1 mb-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {/* Quiz Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Title
            </label>
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option>CS101: Intro to CS</option>
              <option>CS202: Data Structures</option>
              <option>CS301: Algorithms</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (min)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Settings Toggles */}
        <div className="flex gap-md mt-md pt-md border-t border-gray-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={shuffle}
              onChange={(e) => setShuffle(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Shuffle</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={allowReview}
              onChange={(e) => setAllowReview(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Allow Review</span>
          </label>
        </div>
      </div>

      {/* Question Bank & Selected Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <div className="lg:col-span-2">
          <QuestionBank />
        </div>
        <div>
          <SelectedQuestions 
            questions={selectedQuestions} 
            onRemove={(id) => setSelectedQuestions(selectedQuestions.filter(q => q.id !== id))}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-sm mt-lg">
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium">
          Save Draft
        </button>
        <button className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 active:bg-primary-700 transition-all shadow-level-1 hover:shadow-level-2 font-medium">
          Publish Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizStudio;