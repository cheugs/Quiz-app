import React, { useState } from 'react';

const QuestionBank = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [topicFilter, setTopicFilter] = useState('Any');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  const questions = [
    {
      id: 1,
      type: 'MCQ',
      category: 'ARRAYS',
      text: 'What is the time complexity of accessing an element in an array by its index?',
      uses: 4,
      tags: ['AI Q31', 'B) O(n)', 'C) O(log n)']
    },
    {
      id: 2,
      type: 'MCQ',
      category: 'LINKED LISTS',
      text: 'Which of the following is an advantage of a linked list over an array?',
      uses: 5,
      tags: ['A) Faster access time', 'B) Dynamic size', 'C) Memory efficiency']
    },
    {
      id: 3,
      type: 'TF',
      category: 'STACKS',
      text: 'A stack follows the First-In-First-Out (FIFO) principle.',
      uses: 1,
      tags: ['True / False']
    },
    {
      id: 4,
      type: 'SHORT',
      category: 'RECURSION',
      text: 'Explain the base case in a recursive function.',
      uses: 1,
      tags: []
    },
    {
      id: 5,
      type: 'MCQ',
      category: 'SORTING',
      text: 'Which sorting algorithm has the best average time complexity?',
      uses: 8,
      tags: []
    }
  ];

  return (
    <div className="bg-white rounded-lg p-lg shadow-level-1">
      <h2 className="text-[33px] font-semibold text-gray-800 mb-md">Question Bank</h2>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-sm mb-md">
        <input
          type="text"
          placeholder="Search topics or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        />
        <select
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        >
          <option>Topic: Any</option>
          <option>Arrays</option>
          <option>Linked Lists</option>
          <option>Stacks</option>
          <option>Recursion</option>
        </select>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        >
          <option value="">Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-sm max-h-[600px] overflow-y-auto">
        {questions.map((question) => (
          <div
            key={question.id}
            className="p-md border-2 border-primary-500 rounded-md hover:bg-primary-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                  {question.type}
                </span>
                <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded">
                  {question.category}
                </span>
              </div>
              <span className="text-xs text-gray-500">Used {question.uses} times</span>
            </div>
            <p className="text-sm text-gray-800 font-medium">{question.text}</p>
            {question.tags.length > 0 && (
              <div className="flex gap-1 mt-2">
                {question.tags.map((tag, index) => (
                  <span key={index} className="text-xs text-gray-600">
                    {tag}
                    {index < question.tags.length - 1 && ' •'}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="mt-md text-sm text-primary-600 hover:text-primary-700 font-medium">
        Load more questions
      </button>
    </div>
  );
};

export default QuestionBank;