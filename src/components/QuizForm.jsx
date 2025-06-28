// QuizForm.jsx
import React, { useState } from 'react';

const QuizForm = () => {
  const [quiz, setQuiz] = useState({
    title: '',
    grade: 'Grade 9',
    questions: [
      {
        text: '',
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ]
      }
    ]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/api/save_quiz.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz)
      });
      alert('Quiz saved successfully!');
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  // Functions to add/remove questions/options
  const addQuestion = () => { /* ... */ };
  const addOption = (qIndex) => { /* ... */ };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={quiz.title}
        onChange={(e) => setQuiz({...quiz, title: e.target.value})}
        placeholder="Quiz Title"
        required
      />
      
      <select
        value={quiz.grade}
        onChange={(e) => setQuiz({...quiz, grade: e.target.value})}
      >
        <option>Grade 9</option>
        <option>Grade 10</option>
        {/* ... */}
      </select>

      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex}>
          <textarea
            value={question.text}
            onChange={(e) => updateQuestion(qIndex, e.target.value)}
            placeholder="Enter question (e.g., What is the square root of 144?)"
            required
          />
          
          {question.options.map((option, oIndex) => (
            <div key={oIndex}>
              <input
                type="text"
                value={option.text}
                onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                placeholder={`Option ${oIndex + 1}`}
                required
              />
              <input
                type="radio"
                checked={option.isCorrect}
                onChange={() => setCorrectAnswer(qIndex, oIndex)}
              />
            </div>
          ))}
          <button type="button" onClick={() => addOption(qIndex)}>
            Add Option
          </button>
        </div>
      ))}
      
      <button type="submit">Save Quiz</button>
    </form>
  );
};