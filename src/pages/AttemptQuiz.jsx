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
  Input,
  Alert,
  Snackbar,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Upload, NavigateBefore, NavigateNext, Timer, CheckCircle, Cancel } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useAuth } from '../contexts/AuthContext';

const AttemptQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per question
  const [showResults, setShowResults] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const { user } = useAuth();

  // KaTeX rendering functions
  const renderMath = (text) => {
    try {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(text, {
              throwOnError: false,
              displayMode: false
            })
          }}
        />
      );
    } catch (error) {
      return <span style={{ color: 'red' }}>{text}</span>;
    }
  };

  const extractAndRenderMath = (input) => {
    if (!input) return '';
    const matches = input.match(/\$(.*?)\$/g) || [];
    if (matches.length === 0) return input;
    
    return matches.map((match, index) => (
      <React.Fragment key={index}>
        {renderMath(match.replace(/\$/g, ''))}
        {input.split(match)[1] || ''}
      </React.Fragment>
    ));
  };

  // Fetch quiz data
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const { data, error } = await supabase
          .from('quizzes')
          .select('*')
          .eq('id', quizId)
          .single();

        if (error) {
          throw new Error(error.message || 'Failed to fetch quiz data');
        }

        if (!data || !data.questions || !Array.isArray(data.questions)) {
          throw new Error('Invalid quiz data format');
        }

        // Transform the data to match the expected format
        const transformedData = {
          ...data,
          timePerQuestion: 120, // Default 2 minutes per question
          questions: data.questions.map((question, index) => ({
            ...question,
            // Map 'text' to 'question' for compatibility
            question: question.text,
            // For multiple choice questions, find the correct option index
            correct: question.options ? question.options.findIndex(opt => opt.isCorrect) : 0,
            // Ensure options are properly formatted
            options: question.options ? question.options.map(opt => opt.text) : []
          }))
        };

        setQuizData(transformedData);
        setTimeLeft(transformedData.timePerQuestion || 120);
        setSelectedAnswers(new Array(transformedData.questions.length).fill(null));
      } catch (err) {
        setError(err.message);
        setSnackbar({ 
          open: true, 
          message: `Error: ${err.message}`, 
          severity: 'error' 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  // Timer effect with improved UX
  useEffect(() => {
    if (!showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowTimeUpDialog(true);
            return 0;
          }
          return prev - 1;
        });
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
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(quizData.timePerQuestion || 120);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => prev - 1);
    setTimeLeft(quizData.timePerQuestion || 120);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setSnackbar({
          open: true,
          message: 'File size should be less than 5MB',
          severity: 'error'
        });
        return;
      }
      setRawFile(file);
      setUploadedFile(URL.createObjectURL(file));
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === quizData.questions[index].correct ? score + 1 : score;
    }, 0);
  };

  const handleSubmitQuiz = async () => {
    try {
      const score = calculateScore();
      const totalQuestions = quizData.questions.length;
      let imageUrl = null;

      if (rawFile) {
        const fileName = `${user.id}_${Date.now()}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('quiz-submissions')
          .upload(fileName, rawFile);

        if (uploadError) {
          throw new Error(uploadError.message || 'Failed to upload image');
        }

        imageUrl = `https://bitujnpcakhljharmimp.supabase.co/storage/v1/object/public/quiz-submissions/${fileName}`;
      }
      
      // Save quiz result to Supabase
      const { error } = await supabase
        .from('quiz_results')
        .insert([{
          quiz_id: quizId,
          quiz_title: quizData.title || 'Untitled Quiz',
          quiz_grade: quizData.grade || 'N/A',
          quiz_topic: quizData.topic || 'N/A',
          quiz_subtopic: quizData.subtopic || 'N/A',
          student_answers: JSON.stringify(selectedAnswers),
          score: score,
          total_questions: totalQuestions,
          percentage: Math.round((score / totalQuestions) * 100),
          submitted_at: new Date().toISOString(),
          student_id: user.id,
          image_url: imageUrl,
        }]);

      if (error) {
        throw new Error(error.message || 'Failed to submit quiz');
      }

      setSnackbar({ 
        open: true, 
        message: 'Quiz submitted successfully!', 
        severity: 'success' 
      });
      navigate('/view-results-student');
    } catch (err) {
      console.error("Full error submitting quiz:", err);
      setSnackbar({
        open: true,
        message: `Error: ${err.message}`,
        severity: 'error'
      });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5">Loading quiz...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/view-quizzes')}
          sx={{ mt: 2 }}
        >
          Back to Quizzes
        </Button>
      </Container>
    );
  }

  if (showResults) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Quiz Results
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>
            Score: {calculateScore()} / {quizData.questions.length}
          </Typography>

          <Box sx={{ mb: 3 }}>
            {quizData.questions.map((question, index) => (
              <Paper key={index} elevation={1} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Question {index + 1}: {extractAndRenderMath(question.question || question.text)}
                </Typography>
                
                {/* Handle different question types */}
                {question.options && question.options.length > 0 ? (
                  // Multiple choice question
                  <>
                    <Typography color={selectedAnswers[index] === question.correct ? 'success.main' : 'error.main'}>
                      Your answer: {extractAndRenderMath(question.options[selectedAnswers[index]] || 'Not answered')}
                    </Typography>
                    {selectedAnswers[index] !== question.correct && (
                      <Typography color="success.main">
                        Correct answer: {extractAndRenderMath(question.options[question.correct])}
                      </Typography>
                    )}
                  </>
                ) : question.answer ? (
                  // Fill-in question
                  <>
                    <Typography color={selectedAnswers[index] === question.answer ? 'success.main' : 'error.main'}>
                      Your answer: {selectedAnswers[index] || 'Not answered'}
                    </Typography>
                    {selectedAnswers[index] !== question.answer && (
                      <Typography color="success.main">
                        Correct answer: {question.answer}
                      </Typography>
                    )}
                  </>
                ) : question.orderItems ? (
                  // Drag and drop question
                  <>
                    <Typography color="selectedAnswers[index] === 'correct' ? 'success.main' : 'error.main'">
                      Your answer: {selectedAnswers[index] ? 'Ordered correctly' : 'Not answered'}
                    </Typography>
                    <Typography color="success.main">
                      Correct order: {question.orderItems.join(' → ')}
                    </Typography>
                  </>
                ) : (
                  <Typography color="error.main">
                    Question type not supported
                  </Typography>
                )}
                
                {question.explanation && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Explanation: {extractAndRenderMath(question.explanation)}
                  </Typography>
                )}
              </Paper>
            ))}
          </Box>

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

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setShowReviewDialog(true)}
            >
              Review Answers
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Progress Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Timer color={timeLeft < 30 ? 'error' : 'primary'} />
            <Typography variant="h6" color={timeLeft < 30 ? 'error' : 'secondary'}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Typography>
          </Box>
        </Box>

        <LinearProgress
          variant="determinate"
          value={(timeLeft / (quizData.timePerQuestion || 120)) * 100}
          sx={{ height: 8, mb: 3 }}
        />

        {/* Question Card */}
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={{ mb: 2, fontSize: '1.2rem' }}>
            {extractAndRenderMath(quizData.questions[currentQuestion].question || quizData.questions[currentQuestion].text)}
          </FormLabel>

          {/* Handle different question types */}
          {quizData.questions[currentQuestion].options && quizData.questions[currentQuestion].options.length > 0 ? (
            // Multiple choice question
            <RadioGroup
              value={selectedAnswers[currentQuestion] ?? ''}
              onChange={handleAnswer}
            >
              {quizData.questions[currentQuestion].options.map((option, index) => (
                <Paper key={index} elevation={1} sx={{ mb: 1, p: 1 }}>
                  <FormControlLabel
                    value={index.toString()}
                    control={<Radio color="primary" />}
                    label={extractAndRenderMath(option)}
                  />
                </Paper>
              ))}
            </RadioGroup>
          ) : quizData.questions[currentQuestion].answer ? (
            // Fill-in question
            <TextField
              fullWidth
              label="Your Answer"
              value={selectedAnswers[currentQuestion] || ''}
              onChange={(e) => {
                const newAnswers = [...selectedAnswers];
                newAnswers[currentQuestion] = e.target.value;
                setSelectedAnswers(newAnswers);
              }}
              sx={{ mb: 2 }}
            />
          ) : quizData.questions[currentQuestion].orderItems ? (
            // Drag and drop question - for now, show as multiple choice
            <Typography color="text.secondary">
              Drag and drop questions are not yet supported in this interface.
            </Typography>
          ) : (
            <Typography color="error.main">
              Question type not supported
            </Typography>
          )}
        </FormControl>

        {/* Navigation Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
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
            endIcon={currentQuestion === quizData.questions.length - 1 ? null : <NavigateNext />}
            onClick={handleNext}
            disabled={
              quizData.questions[currentQuestion].options 
                ? selectedAnswers[currentQuestion] == undefined
                : selectedAnswers[currentQuestion] === undefined || selectedAnswers[currentQuestion] === ''
            }
          >
            {currentQuestion === quizData.questions.length - 1 ? 'Submit Quiz' : 'Next'}
          </Button>
        </Box>
      </Paper>

      {/* Time Up Dialog */}
      <Dialog open={showTimeUpDialog} onClose={() => setShowTimeUpDialog(false)}>
        <DialogTitle>Time's Up!</DialogTitle>
        <DialogContent>
          <Typography>
            Your time for this question has expired. Please move to the next question.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setShowTimeUpDialog(false);
            handleNext();
          }}>
            Next Question
          </Button>
        </DialogActions>
      </Dialog>

      {/* Review Dialog */}
      <Dialog
        open={showReviewDialog}
        onClose={() => setShowReviewDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Review Your Answers</DialogTitle>
        <DialogContent>
          {quizData.questions.map((question, index) => (
            <Paper key={index} elevation={1} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Question {index + 1}: {extractAndRenderMath(question.question || question.text)}
              </Typography>
              
              {/* Handle different question types */}
              {question.options && question.options.length > 0 ? (
                // Multiple choice question
                <>
                  <Typography color={selectedAnswers[index] === question.correct ? 'success.main' : 'error.main'}>
                    Your answer: {extractAndRenderMath(question.options[selectedAnswers[index]] || 'Not answered')}
                  </Typography>
                  {selectedAnswers[index] !== question.correct && (
                    <Typography color="success.main">
                      Correct answer: {extractAndRenderMath(question.options[question.correct])}
                    </Typography>
                  )}
                </>
              ) : question.answer ? (
                // Fill-in question
                <>
                  <Typography color={selectedAnswers[index] === question.answer ? 'success.main' : 'error.main'}>
                    Your answer: {selectedAnswers[index] || 'Not answered'}
                  </Typography>
                  {selectedAnswers[index] !== question.answer && (
                    <Typography color="success.main">
                      Correct answer: {question.answer}
                    </Typography>
                  )}
                </>
              ) : question.orderItems ? (
                // Drag and drop question
                <>
                  <Typography color="selectedAnswers[index] === 'correct' ? 'success.main' : 'error.main'">
                    Your answer: {selectedAnswers[index] ? 'Ordered correctly' : 'Not answered'}
                  </Typography>
                  <Typography color="success.main">
                    Correct order: {question.orderItems.join(' → ')}
                  </Typography>
                </>
              ) : (
                <Typography color="error.main">
                  Question type not supported
                </Typography>
              )}
              
              {question.explanation && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Explanation: {extractAndRenderMath(question.explanation)}
                </Typography>
              )}
            </Paper>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReviewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AttemptQuiz;