import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  LinearProgress,
  IconButton,
  Input
} from '@mui/material';
import { Upload, NavigateBefore, NavigateNext } from '@mui/icons-material';

const TakeQuiz = () => {
  // Dummy quiz data
  const [quizData] = useState([
    {
      question: "Solve for x: 2x² + 5x - 3 = 0",
      options: ["x = 0.5, -3", "x = 1.5, -1", "x = 2, -0.75", "x = -3, 0.5"],
      correct: 0
    },
    {
      question: "What is the value of sin(π/3)?",
      options: ["1/2", "√2/2", "√3/2", "1"],
      correct: 2
    },
    {
      question: "Simplify: (3 + √5)(3 - √5)",
      options: ["4", "9 - 5√5", "14", "9 - 5"],
      correct: 3
    }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per question
  const [showResults, setShowResults] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Timer effect
  useEffect(() => {
    if (!showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, showResults]);

  const handleAnswer = (event) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = parseInt(event.target.value);
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(120);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(prev => prev - 1);
    setTimeLeft(120);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(URL.createObjectURL(file));
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => (
      answer === quizData[index].correct ? score + 1 : score
    ), 0);
  };

  if (showResults) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Quiz Results
          </Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>
            Score: {calculateScore()} / {quizData.length}
          </Typography>
          
          <FormControl fullWidth sx={{ mt: 3 }}>
            <Input
              type="file"
              id="upload-calculations"
              accept="image/jpeg"
              onChange={handleFileUpload}
              sx={{ display: 'none' }}
            />
            <label htmlFor="upload-calculations">
              <Button
                variant="contained"
                component="span"
                startIcon={<Upload />}
                sx={{ mb: 2 }}
              >
                Upload Calculations (JPEG)
              </Button>
            </label>
            
            {uploadedFile && (
              <img 
                src={uploadedFile} 
                alt="Uploaded calculations" 
                style={{ maxWidth: '100%', marginTop: 16 }}
              />
            )}
          </FormControl>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Progress Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Question {currentQuestion + 1} of {quizData.length}
          </Typography>
          <Typography variant="h6" color="secondary">
            Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </Typography>
        </div>

        <LinearProgress 
          variant="determinate" 
          value={(timeLeft / 120) * 100} 
          sx={{ height: 8, mb: 3 }}
        />

        {/* Question Card */}
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={{ mb: 2, fontSize: '1.2rem' }}>
            {quizData[currentQuestion].question}
          </FormLabel>
          
          <RadioGroup 
            value={selectedAnswers[currentQuestion] ?? ''}
            onChange={handleAnswer}
          >
            {quizData[currentQuestion].options.map((option, index) => (
              <Paper key={index} elevation={1} sx={{ mb: 1, p: 1 }}>
                <FormControlLabel
                  value={index.toString()}
                  control={<Radio color="primary" />}
                  label={option}
                />
              </Paper>
            ))}
          </RadioGroup>
        </FormControl>

        {/* Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
          <Button
            variant="contained"
            startIcon={<NavigateBefore />}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button
            variant="contained"
            endIcon={currentQuestion === quizData.length - 1 ? null : <NavigateNext />}
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] == undefined}
          >
            {currentQuestion === quizData.length - 1 ? 'Submit Quiz' : 'Next'}
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default TakeQuiz;