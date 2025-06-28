// QuizDisplay.jsx
import React, { useState, useEffect } from 'react';

const QuizDisplay = ({ grade }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(`http://localhost/api/get_questions.php?grade=${grade}`);
      const data = await response.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, [grade]);

  const handleSubmit = () => {
    // Compare answers with correct options
    const score = questions.reduce((acc, question) => {
      const correctAnswer = question.options.find(opt => opt.is_correct).id;
      return acc + (answers[question.id] === correctAnswer ? 1 : 0);
    }, 0);
    
    setResults({
      score: score,
      total: questions.length
    });
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.text}</h3>
          {question.options.map((option) => (
            <div key={option.id}>
              <input
                type="radio"
                name={`question-${question.id}`}
                onChange={() => setAnswers({...answers, [question.id]: option.id})}
              />
              <span>{option.text}</span>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
      {results && (
        <div>
          Score: {results.score}/{results.total}
        </div>
      )}
    </div>
  );
};