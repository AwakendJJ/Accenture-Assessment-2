import React, { useState } from 'react';

const Assessment = ({ questions, phase, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {phase === 'professional' ? 'Professional Style Assessment' : 'Technical Preferences'}
        </h2>
        <p className="text-gray-600">
          Phase {phase === 'professional' ? '1' : '2'} of 2
        </p>
        <div className="mt-4 bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl mb-6">{currentQ.text}</h3>
        <div className="space-y-4">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assessment;