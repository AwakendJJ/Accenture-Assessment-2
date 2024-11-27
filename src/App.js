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
      // E vs I keywords
      if (answer.includes('team') || answer.includes('group') || 
          answer.includes('social') || answer.includes('collaborative') ||
          answer.includes('outgoing') || answer.includes('interactive')) {
        mbtiScores.E++;
      }
      if (answer.includes('alone') || answer.includes('independent') || 
          answer.includes('quiet') || answer.includes('private') ||
          answer.includes('solitary') || answer.includes('reflection')) {
        mbtiScores.I++;
      }
  
      // S vs N keywords
      if (answer.includes('practical') || answer.includes('concrete') || 
          answer.includes('detailed') || answer.includes('specific') ||
          answer.includes('realistic') || answer.includes('facts')) {
        mbtiScores.S++;
      }
      if (answer.includes('abstract') || answer.includes('innovative') || 
          answer.includes('future') || answer.includes('possibilities') ||
          answer.includes('creative') || answer.includes('theoretical')) {
        mbtiScores.N++;
      }
  
      // T vs F keywords
      if (answer.includes('logical') || answer.includes('analytical') || 
          answer.includes('objective') || answer.includes('rational') ||
          answer.includes('systematic') || answer.includes('efficient')) {
        mbtiScores.T++;
      }
      if (answer.includes('empathetic') || answer.includes('feeling') || 
          answer.includes('harmony') || answer.includes('personal') ||
          answer.includes('values') || answer.includes('supportive')) {
        mbtiScores.F++;
      }
  
      // J vs P keywords
      if (answer.includes('organized') || answer.includes('planned') || 
          answer.includes('structured') || answer.includes('decisive') ||
          answer.includes('routine') || answer.includes('schedule')) {
        mbtiScores.J++;
      }
      if (answer.includes('flexible') || answer.includes('adaptable') || 
          answer.includes('spontaneous') || answer.includes('open-ended') ||
          answer.includes('exploring') || answer.includes('casual')) {
        mbtiScores.P++;
      }
    });
  
    // Process technical answers
    technicalAnswers.forEach((answer) => {
      // Technical-specific keywords
      if (answer.includes('detail') || answer.includes('step-by-step') ||
          answer.includes('proven') || answer.includes('methodical')) {
        mbtiScores.S++;
      }
      if (answer.includes('pattern') || answer.includes('big picture') ||
          answer.includes('concept') || answer.includes('innovative')) {
        mbtiScores.N++;
      }
      if (answer.includes('analysis') || answer.includes('logic') ||
          answer.includes('problem-solving') || answer.includes('efficiency')) {
        mbtiScores.T++;
      }
      if (answer.includes('user experience') || answer.includes('team impact') ||
          answer.includes('collaboration') || answer.includes('user needs')) {
        mbtiScores.F++;
      }
    });
  
    // Calculate type
    const type = [
      mbtiScores.E > mbtiScores.I ? 'E' : 'I',
      mbtiScores.S > mbtiScores.N ? 'S' : 'N',
      mbtiScores.T > mbtiScores.F ? 'T' : 'F',
      mbtiScores.J > mbtiScores.P ? 'J' : 'P'
    ].join('');
  
    // Calculate percentages
    const calculatePercentage = (score1, score2) => {
      const total = score1 + score2;
      return total === 0 ? 50 : Math.round((score1 / total) * 100);
    };
  
    const percentages = {
      'E/I': calculatePercentage(mbtiScores.E, mbtiScores.I),
      'S/N': calculatePercentage(mbtiScores.S, mbtiScores.N),
      'T/F': calculatePercentage(mbtiScores.T, mbtiScores.F),
      'J/P': calculatePercentage(mbtiScores.J, mbtiScores.P)
    };
  
    return {
      mbtiType: type,
      percentages: percentages,
      scores: mbtiScores // Helpful for debugging
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