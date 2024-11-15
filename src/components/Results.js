import React from 'react';

const ResultsDisplay = ({ results }) => {
  const getStrengths = (type) => {
    const strengths = {
      INTJ: [
        "Strategic thinking and long-term planning",
        "Complex problem solving",
        "Independent analysis and innovation",
        "Systems thinking and architecture"
      ],
      INTP: [
        "Deep technical analysis",
        "Innovation and conceptual thinking",
        "Complex problem solving",
        "Logical system design"
      ],
      // Add more MBTI types as needed
    };
    return strengths[type] || [
      "Analytical thinking",
      "Problem solving",
      "Technical aptitude",
      "Adaptability"
    ];
  };

  const getCareerPaths = (type) => {
    return [
      {
        role: "Technical Architecture",
        confidence: 0.9,
        fit: [
          "Strong analytical capabilities",
          "Natural system thinking abilities",
          "Strategic problem-solving approach"
        ],
        generalPath: "Connect with Technical Architecture Senior Manager",
        specificPath: "Focus on Cloud Architecture specialization",
        certifications: [
          "AWS Solutions Architect",
          "Azure Solutions Architect",
          "Google Cloud Professional Architect"
        ],
        nextSteps: [
          "Complete cloud certification",
          "Join architecture community",
          "Build proof-of-concept projects",
          "Network with senior architects"
        ]
      },
      {
        role: "Technical Consulting",
        confidence: 0.85,
        fit: [
          "Strong problem-solving skills",
          "Analytical mindset",
          "Technical expertise"
        ],
        generalPath: "Connect with Technical Consulting Manager",
        specificPath: "Develop consulting skills in specific technology domain",
        certifications: [
          "Relevant technology certifications",
          "Consulting methodology certifications"
        ],
        nextSteps: [
          "Build domain expertise",
          "Develop client communication skills",
          "Join consulting communities"
        ]
      }
    ];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* MBTI Type Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Your MBTI Type: {results.mbtiType}
        </h3>

        {/* Personality Breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(results.percentages).map(([dimension, value]) => (
            <div key={dimension} className="bg-purple-50 rounded-lg p-4">
              <div className="font-medium text-gray-900">{dimension}</div>
              <div className="text-sm text-gray-600">{value}%</div>
            </div>
          ))}
        </div>

        {/* Strengths */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Key Strengths</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getStrengths(results.mbtiType).map((strength, idx) => (
              <div key={idx} className="bg-purple-50 rounded-lg p-3">
                <span className="text-purple-900">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Paths Section */}
      {getCareerPaths(results.mbtiType).map((path, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h4 className="text-xl font-bold text-gray-900">{path.role}</h4>
            <div className="text-sm text-purple-600 mt-1">
              Match Score: {Math.round(path.confidence * 100)}%
            </div>
          </div>

          <div className="space-y-6">
            {/* Why This Role Fits */}
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Why This Role Fits You</h5>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {path.fit.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Career Path */}
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Recommended Path</h5>
              <p className="text-gray-600">{path.generalPath}</p>
              <p className="text-gray-600 mt-1">{path.specificPath}</p>
            </div>

            {/* Certifications */}
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Recommended Certifications</h5>
              <ul className="list-disc list-inside text-gray-600">
                {path.certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Next Steps</h5>
              <ul className="list-disc list-inside text-gray-600">
                {path.nextSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      {/* Reset Button */}
      <div className="text-center">
        <button 
          onClick={() => window.location.reload()}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          Start New Assessment
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;