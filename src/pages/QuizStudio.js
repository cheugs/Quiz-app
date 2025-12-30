import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const QuizStudio = () => {
  const [quizTitle, setQuizTitle] = useState('Mid-Term Evaluation: Data Structures');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([
    { id: 'Q1', type: 'MCQ', text: 'Which of the following is an advantage of a linked list?' },
    { id: 'Q2', type: 'Short', text: 'Explain the base case in a recursive function.' }
  ]);

  const questions = [
    { id: 'Q3', type: 'MCQ', topic: 'ARRAYS', text: 'What is the time complexity of accessing an array element?', used: 4 },
    { id: 'Q4', type: 'TF', topic: 'STACKS', text: 'A stack follows the FIFO principle.', used: 1 },
    { id: 'Q5', type: 'MCQ', topic: 'SORTING', text: 'Which algorithm has best average time complexity?', used: 8 },
    { id: 'Q6', type: 'Short', topic: 'RECURSION', text: 'Explain tail recursion with an example.', used: 3 },
    { id: 'Q7', type: 'MCQ', topic: 'LINKED LISTS', text: 'Advantage of doubly linked list over singly linked list?', used: 5 }
  ];

  const removeQuestion = (id) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold text-gray-800">Create New Quiz</h1>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Student Preview
        </button>
      </div>

      {/* Quiz Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quiz Title
            </label>
            <input 
              type="text" 
              value={quizTitle} 
              onChange={(e) => setQuizTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>CS101: Intro to CS</option>
              <option>CS202: Data Structures</option>
              <option>CS301: Algorithms</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (min)
            </label>
            <input 
              type="number" 
              defaultValue="45"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-6 mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm text-gray-700">Shuffle Questions</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm text-gray-700">Allow Review</span>
          </label>
        </div>
      </div>

      {/* Question Bank & Selected Questions */}
      <div className="grid grid-cols-3 gap-8">
        {/* Question Bank */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Question Bank</h3>
            
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search topics or keywords..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Topic: Any</option>
                <option>Arrays</option>
                <option>Linked Lists</option>
                <option>Stacks</option>
                <option>Sorting</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Difficulty</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {questions.map((q) => (
                <div 
                  key={q.id} 
                  className="p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium">
                        {q.type}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                        {q.topic}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">Used {q.used} times</span>
                  </div>
                  <p className="text-sm text-gray-800 font-medium">{q.text}</p>
                </div>
              ))}
            </div>

            <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
              Load more questions
            </button>
          </div>
        </div>

        {/* Selected Questions Panel */}
        <div>
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Selected Questions</h3>
              <span className="text-sm text-gray-600">{selectedQuestions.length} / 20</span>
            </div>

            <p className="text-sm text-gray-600 mb-4">Target: 15-20 questions</p>

            <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
              {selectedQuestions.map((q, idx) => (
                <div key={q.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800 text-sm">{idx + 1}.</span>
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                          {q.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">{q.text}</p>
                    </div>
                    <button 
                      onClick={() => removeQuestion(q.id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {selectedQuestions.length < 10 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">Insufficient questions.</span><br/>
                  Add at least {10 - selectedQuestions.length} more questions to publish.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                Save Draft
              </button>
              <button 
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedQuestions.length >= 10
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={selectedQuestions.length < 10}
              >
                Publish Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStudio;