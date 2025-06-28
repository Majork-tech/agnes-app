import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock quiz data
const mockQuizzes = {
  1: {
    id: 1,
    title: "Math Quiz 1",
    timePerQuestion: 120,
    questions: [
      {
        question: "Solve for x: 2x² + 5x - 3 = 0",
        options: ["x = 0.5, -3", "x = 1.5, -1", "x = 2, -0.75", "x = -3, 0.5"],
        correct: 0,
        explanation: "Use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a"
      },
      {
        question: "What is the value of sin(π/3)?",
        options: ["1/2", "√2/2", "√3/2", "1"],
        correct: 2,
        explanation: "sin(π/3) = sin(60°) = √3/2"
      },
      {
        question: "Simplify: (3 + √5)(3 - √5)",
        options: ["4", "9 - 5√5", "14", "9 - 5"],
        correct: 3,
        explanation: "This is a difference of squares: (a + b)(a - b) = a² - b²"
      }
    ]
  },
  2: {
    id: 2,
    title: "Science Quiz 1",
    timePerQuestion: 90,
    questions: [
      {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Fe", "Cu"],
        correct: 1,
        explanation: "Au comes from the Latin word 'aurum'"
      },
      {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Mars", "Earth"],
        correct: 1,
        explanation: "Mercury is the first planet from the Sun"
      }
    ]
  },
  3: {
    id: 3,
    title: "History Quiz 1",
    timePerQuestion: 60,
    questions: [
      {
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2,
        explanation: "World War II ended in 1945 with the surrender of Germany and Japan"
      }
    ]
  }
};

// Routes
app.get('/api/quizzes/:quizId', (req, res) => {
  const quizId = parseInt(req.params.quizId);
  const quiz = mockQuizzes[quizId];
  
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  
  res.json(quiz);
});

app.post('/api/quizzes/submit', (req, res) => {
  // Mock submission endpoint
  console.log('Quiz submission received:', req.body);
  res.json({ message: 'Quiz submitted successfully', score: req.body.score });
});

app.get('/api/quizzes', (req, res) => {
  // Return all quizzes
  res.json(Object.values(mockQuizzes));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API server is running' });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`- GET /api/quizzes/:quizId`);
  console.log(`- POST /api/quizzes/submit`);
  console.log(`- GET /api/quizzes`);
  console.log(`- GET /api/health`);
}); 