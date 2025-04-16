import React, { useState } from 'react';

const FreedomFrameworkAssessment = () => {
  // Basic state management
  const [currentStep, setCurrentStep] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [email, setEmail] = useState('');
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Questions data
  const questions = [
    { id: 'fulfillment1', text: 'How often do you find yourself mentally drained, feeling like your work made no difference?', category: 'Fulfillment', reverse: true },
    { id: 'fulfillment2', text: 'When was the last time you felt excited about the impact your work is having?', category: 'Fulfillment' },
    { id: 'finances1', text: 'How frequently do you check your bank account with anxiety or limit choices due to finances?', category: 'Finances', reverse: true },
    { id: 'finances2', text: 'Do you feel resentment when saying yes to work just because you need the money?', category: 'Finances', reverse: true },
    { id: 'freedom1', text: 'How often do you sacrifice personal priorities because your work demands it?', category: 'Freedom', reverse: true },
    { id: 'freedom2', text: 'When did you last feel trapped by decisions others made about your work?', category: 'Freedom', reverse: true },
    { id: 'faithfulness1', text: 'Do you often say or do things professionally that feel out of alignment with your values?', category: 'Faithfulness', reverse: true },
    { id: 'faithfulness2', text: 'How often do you silence your true opinions in work situations?', category: 'Faithfulness', reverse: true },
    { id: 'fusion1', text: 'Do you feel tension between maintaining relationships and pursuing professional goals?', category: 'Fusion', reverse: true },
    { id: 'fusion2', text: 'How often do you feel like you lead separate lives between work and personal self?', category: 'Fusion', reverse: true }
  ];

  // Basic event handlers
  const handleRatingChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: parseInt(value)
    });
  };

  const getQuestionLabels = (question) => {
    return question.reverse 
      ? { low: 'Frequently', high: 'Rarely' }
      : { low: 'Rarely', high: 'Frequently' };
  };

  const startAssessment = () => {
    setShowEmailPopup(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setShowEmailPopup(false);
    setCurrentStep('questions');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetAssessment = () => {
    setAnswers({});
    setResults(null);
    setCurrentStep('intro');
    setCurrentQuestionIndex(0);
    setShowEmailPopup(false);
  };

  // Calculate results
  const calculateResults = () => {
    const categories = ['Fulfillment', 'Finances', 'Freedom', 'Faithfulness', 'Fusion'];
    const categoryScores = {};

    // Calculate score for each category
    categories.forEach(category => {
      const categoryQuestions = questions.filter(q => q.category === category);
      let total = 0;
      let count = 0;

      categoryQuestions.forEach(question => {
        if (answers[question.id]) {
          const value = question.reverse 
            ? 11 - answers[question.id] 
            : answers[question.id];
          
          total += value;
          count++;
        }
      });

      categoryScores[category] = count > 0 ? total / count : 0;
    });

    // Get priority, insights and suggestions
    const sortedCategories = Object.entries(categoryScores)
      .sort((a, b) => b[1] - a[1])
      .map(([category, score]) => {
        let priority, insight, improvement;
        
        if (score < 4) {
          priority = 'High Priority (Needs Attention)';
          insight = `Your ${category.toLowerCase()} needs significant attention and may be causing stress.`;
          improvement = getImprovement(category, 'low');
        } else if (score < 7) {
          priority = 'Medium Priority';
          insight = `Your ${category.toLowerCase()} is adequate but could be improved.`;
          improvement = getImprovement(category, 'medium');
        } else {
          priority = 'Low Priority (Strength)';
          insight = `Your ${category.toLowerCase()} is a strength area. Continue building on this foundation.`;
          improvement = null;
        }

        return {
          category,
          score,
          priority,
          insight,
          improvement
        };
      });

    setResults(sortedCategories);
    setCurrentStep('results');
  };

  // Get specific improvement suggestion based on category and level
  const getImprovement = (category, level) => {
    const improvements = {
      Fulfillment: {
        low: "Create a 'Meaning Journal' where you track moments that feel purposeful. Review weekly to identify patterns and deliberately create more of these moments.",
        medium: "Identify one project you could initiate that aligns with your deeper values and create a specific plan to implement it within 30 days."
      },
      Finances: {
        low: "Conduct a 'Value Audit' of your services/work and identify at least one offering that should be priced 25% higher based on the true value you deliver.",
        medium: "Create one passive income stream that requires minimal maintenance but leverages your existing expertise or assets."
      },
      Freedom: {
        low: "Implement 'Freedom Friday' where you block 2 hours each week that are completely under your control and cannot be scheduled by others.",
        medium: "Identify your three most energy-draining commitments and create an exit strategy for at least one of them within 60 days."
      },
      Faithfulness: {
        low: "Create a personal 'Values Filter' with 3-5 core values and specific questions to ask before saying yes to any new opportunity.",
        medium: "Schedule a monthly 'Integrity Check-in' where you assess how aligned your actions are with your values and adjust accordingly."
      },
      Fusion: {
        low: "Plan one 'Integration Activity' each month that simultaneously serves both personal and professional purposes.",
        medium: "Create clear 'Transition Rituals' to mentally shift between work and personal life, preventing spillover of stress and distraction."
      }
    };

    return improvements[category][level];
  };

  // Render functions
  const renderIntro = () => (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">The 5 F's of Freedom Framework</h2>
      <p className="mb-4">This assessment will help you evaluate your life and business through alignment, autonomy, and purpose.</p>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">The 5 F's:</h3>
        <ul className="space-y-2">
          <li><span className="font-bold">Fulfillment</span> – Does your work light you up and leave a mark that matters?</li>
          <li><span className="font-bold">Finances</span> – Are you earning what you need to fund the life you want?</li>
          <li><span className="font-bold">Freedom</span> – Do you have control over your time, choices, and how you show up?</li>
          <li><span className="font-bold">Faithfulness</span> – Are you staying true to your values, voice, and inner compass?</li>
          <li><span className="font-bold">Fusion</span> – Are your relationships, passions, and purpose interwoven?</li>
        </ul>
      </div>
      
      <button 
        onClick={startAssessment}
        className="w-full py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Begin Assessment
      </button>
    </div>
  );

  const renderEmailPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Enter Your Email</h2>
        <p className="mb-4 text-gray-700">We'll send your results to this email.</p>
        
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="you@example.com"
            />
          </div>
          
          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Continue
            </button>
            
            <button
              type="button"
              onClick={() => {
                setShowEmailPopup(false);
                setCurrentStep('questions');
              }}
              className="w-full py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition duration-200"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderQuestions = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;
    const labels = getQuestionLabels(currentQuestion);
    
    return (
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">Your Freedom Assessment</h2>
        
        <div className="mb-8">
          <div className="border-b pb-6">
            <div className="flex items-center mb-4">
              <span className="bg-indigo-100 text-indigo-800 font-medium py-1 px-3 rounded-full text-sm mr-3">
                {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
            
            <h3 className="text-lg font-medium mb-6">{currentQuestion.text}</h3>
            
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <span className="text-red-500 font-medium mr-2">{labels.low}</span>
                <span className="text-sm text-gray-500">(1)</span>
              </div>
              
              <div className="flex space-x-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <label key={value} className="relative flex flex-col items-center">
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={value}
                      checked={answers[currentQuestion.id] === value}
                      onChange={() => handleRatingChange(currentQuestion.id, value)}
                      className="sr-only"
                    />
                    <span 
                      className={`h-8 w-8 rounded-full flex items-center justify-center cursor-pointer 
                      ${answers[currentQuestion.id] === value 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                      {value}
                    </span>
                  </label>
                ))}
              </div>
              
              <div className="flex items-center mt-2 sm:mt-0">
                <span className="text-sm text-gray-500 mr-2">(10)</span>
                <span className="text-green-500 font-medium">{labels.high}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button 
            onClick={isFirstQuestion ? resetAssessment : previousQuestion}
            className="py-2 px-6 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition duration-200"
          >
            {isFirstQuestion ? 'Start Over' : 'Previous'}
          </button>
          
          <button 
            onClick={isLastQuestion ? calculateResults : nextQuestion}
            disabled={!answers[currentQuestion.id]}
            className={`py-2 px-6 font-medium rounded-md transition duration-200 
              ${answers[currentQuestion.id]
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            {isLastQuestion ? 'See Results' : 'Next'}
          </button>
        </div>
        
        <div className="mt-6 bg-gray-50 p-3 rounded-lg">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Your Results</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Category Overview</h3>
        
        {/* Bar Graph */}
        <div className="p-4 bg-gray-50 rounded-lg mb-6">
          <div className="space-y-4">
            {results && results.map((result) => (
              <div key={result.category} className="flex items-center">
                <div className="w-32 text-right pr-4">
                  <span className="font-medium">{result.category}</span>
                </div>
                <div className="flex-1">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full 
                          ${result.score < 4 
                            ? 'text-red-600 bg-red-200' 
                            : result.score < 7 
                              ? 'text-yellow-600 bg-yellow-200' 
                              : 'text-green-600 bg-green-200'}`}>
                          {result.score.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex h-2 mb-0 overflow-hidden text-xs bg-gray-200 rounded">
                      <div 
                        style={{ width: `${result.score * 10}%` }}
                        className={`flex flex-col justify-center rounded 
                          ${result.score < 4 
                            ? 'bg-red-500' 
                            : result.score < 7 
                              ? 'bg-yellow-500' 
                              : 'bg-green-500'}`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-4">Your Priorities</h3>
        <div className="space-y-6">
          {results && results.map((result, index) => (
            <div key={result.category} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="bg-indigo-100 text-indigo-800 font-medium py-1 px-3 rounded-full text-sm mr-3">
                    {index + 1}
                  </span>
                  <h4 className="text-lg font-semibold">{result.category}</h4>
                </div>
                <div className={`text-sm font-medium px-3 py-1 rounded-full 
                  ${result.score < 4 
                    ? 'bg-red-100 text-red-800' 
                    : result.score < 7 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'}`}
                >
                  {result.priority}
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{result.insight}</p>
              
              {/* Display improvement suggestion for low and medium scores */}
              {result.improvement && (
                <div className="mt-2 border-t pt-3">
                  <h5 className="font-medium text-indigo-700 mb-2">Suggested Improvement:</h5>
                  <p className="text-gray-700">{result.improvement}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2 text-indigo-700">What's Next?</h3>
        <p className="text-gray-700">
          Focus on your high priority areas first. Implement the suggested improvements one at a time over the next 30-60 days, then reassess.
        </p>
      </div>
      
      <div className="flex flex-col space-y-3">
        <button 
          onClick={resetAssessment}
          className="w-full py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Take Assessment Again
        </button>
        
        <button 
          onClick={() => {
            // Add email sharing functionality here
            alert('Results have been emailed to you!');
          }}
          className="w-full py-3 bg-white border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition duration-200"
        >
          Email My Results
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-800">The 5 F's of Freedom Framework</h1>
      <p className="text-center text-gray-600 mb-8">A no-BS tool to evaluate your life and business through the lens of alignment, autonomy, and purpose.</p>
      
      {currentStep === 'intro' && renderIntro()}
      {currentStep === 'questions' && renderQuestions()}
      {currentStep === 'results' && renderResults()}
      
      {showEmailPopup && renderEmailPopup()}
    </div>
  );
};

export default FreedomFrameworkAssessment;
