import React from 'react';

const Welcome = ({ onStart }) => {
  return (
    <div className="max-w-2xl mx-auto text-center p-8">
      <h1 className="text-3xl font-bold mb-6">
        Accenture Analyst Assessment
      </h1>
      <p className="text-gray-600 mb-8">
        Discover your ideal role at Accenture through our personalized assessment process.
      </p>
      <button
        onClick={onStart}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
      >
        Begin Assessment
      </button>
    </div>
  );
};

export default Welcome;