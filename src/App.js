import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Assessment from './components/Assessment';
import { assessmentQuestions } from './Data/questions';
import ResultsDisplay from './components/Results';

function App() {
  const [phase, setPhase] = useState('welcome');
  const [professionalAnswers, setProfessionalAnswers] = useState([]);
  const [technicalAnswers, setTechnicalAnswers] = useState([]);
  const [mbtiResult, setMbtiResult] = useState(null);

  const startAssessment = () => {
    setPhase('professional');
  };

  const calculateMBTI = (professionalAnswers, technicalAnswers) => {
    const mbtiScores = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    // Process professional answers
    professionalAnswers.forEach((answer) => {
      // Example scoring logic - adjust based on your question structure
      if (answer.includes('analytical')) mbtiScores.T++;
      if (answer.includes('empathetic')) mbtiScores.F++;
      if (answer.includes('structured')) mbtiScores.J++;
      if (answer.includes('flexible')) mbtiScores.P++;
      if (answer.includes('group')) mbtiScores.E++;
      if (answer.includes('alone')) mbtiScores.I++;
      // Add more scoring rules based on your questions
    });

    // Process technical answers
    technicalAnswers.forEach((answer) => {
      // Add scoring logic for technical questions
      if (answer.includes('innovative')) mbtiScores.N++;
      if (answer.includes('practical')) mbtiScores.S++;
      // Add more scoring rules based on your questions
    });

    // Determine type
    const type = [
      mbtiScores.E > mbtiScores.I ? 'E' : 'I',
      mbtiScores.S > mbtiScores.N ? 'S' : 'N',
      mbtiScores.T > mbtiScores.F ? 'T' : 'F',
      mbtiScores.J > mbtiScores.P ? 'J' : 'P'
    ].join('');

    // Calculate percentages
    const total = {
      EI: mbtiScores.E + mbtiScores.I,
      SN: mbtiScores.S + mbtiScores.N,
      TF: mbtiScores.T + mbtiScores.F,
      JP: mbtiScores.J + mbtiScores.P
    };

    const percentages = {
      'E/I': Math.round((mbtiScores.E / total.EI) * 100),
      'S/N': Math.round((mbtiScores.S / total.SN) * 100),
      'T/F': Math.round((mbtiScores.T / total.TF) * 100),
      'J/P': Math.round((mbtiScores.J / total.JP) * 100)
    };

    return {
      mbtiType: type,
      percentages: percentages
    };
  };

  const handleProfessionalComplete = (answers) => {
    setProfessionalAnswers(answers);
    setPhase('technical');
  };

  const handleTechnicalComplete = (answers) => {
    setTechnicalAnswers(answers);
    const result = calculateMBTI(professionalAnswers, answers);
    setMbtiResult(result);
    setPhase('results');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {phase === 'welcome' && <Welcome onStart={startAssessment} />}
      
      {phase === 'professional' && (
        <Assessment
          questions={assessmentQuestions.professional}
          phase={phase}
          onComplete={handleProfessionalComplete}
        />
      )}
      
      {phase === 'technical' && (
        <Assessment
          questions={assessmentQuestions.technical}
          phase={phase}
          onComplete={handleTechnicalComplete}
        />
      )}

      {phase === 'results' && <ResultsDisplay results={mbtiResult} />}
    </div>
  );
}

export default App;