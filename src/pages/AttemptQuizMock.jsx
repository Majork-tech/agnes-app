import React, { useState } from 'react';
import {
  Container,
  Card,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Box,
  TextField,
  Divider,
  Paper,
  Chip,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Input
} from '@mui/material';
import { ArrowBack, NavigateBefore, NavigateNext, Timer, CheckCircle, PlayArrow } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const palette = {
  bg: '#F7FAFC',
  card: '#FFFFFF',
  primary: '#1976D2',
  accent: '#FFB300',
  text: '#37474F',
};

const mockQuizzes = [
  {
    id: 1,
    title: 'Algebra Basics Quiz',
    grade: 'Grade 8',
    topic: 'Algebra',
    subtopic: 'Linear Equations',
    timePerQuestion: 60,
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'What is the value of x in the equation 2x + 3 = 7?',
        options: ['1', '2', '3', '4'],
        correct: 1,
      },
      {
        id: 2,
        type: 'short_answer',
        question: 'Simplify: 3(x + 2) - 2x',
        correct: 'x + 6',
      },
    ],
  },
  {
    id: 2,
    title: 'Geometry Fundamentals',
    grade: 'Grade 8',
    topic: 'Geometry',
    subtopic: 'Triangles',
    timePerQuestion: 60,
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'How many degrees are in a triangle?',
        options: ['90', '180', '270', '360'],
        correct: 1,
      },
      {
        id: 2,
        type: 'short_answer',
        question: 'Name a type of triangle with all sides equal.',
        correct: 'Equilateral',
      },
    ],
  },
  {
    id: 3,
    title: 'Trigonometry Intro',
    grade: 'Grade 9',
    topic: 'Trigonometry',
    subtopic: 'Basic Trig',
    timePerQuestion: 60,
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'What is sin(90°)?',
        options: ['0', '1', '0.5', 'undefined'],
        correct: 1,
      },
      {
        id: 2,
        type: 'short_answer',
        question: 'What is the ratio for tan(θ)?',
        correct: 'opposite/adjacent',
      },
    ],
  },
];

const grades = ['Grade 8', 'Grade 9'];
const topics = ['Algebra', 'Geometry', 'Trigonometry'];

const AttemptQuizMock = () => {
  const [step, setStep] = useState(1); // 1: select quiz, 2: attempt quiz
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [filteredQuizzes, setFilteredQuizzes] = useState(mockQuizzes);

  // Quiz attempt state
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [intervalId, setIntervalId] = useState(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [showFinalActions, setShowFinalActions] = useState(false);

  // Filter quizzes when grade/topic changes
  React.useEffect(() => {
    let filtered = mockQuizzes;
    if (selectedGrade) filtered = filtered.filter(q => q.grade === selectedGrade);
    if (selectedTopic) filtered = filtered.filter(q => q.topic === selectedTopic);
    setFilteredQuizzes(filtered);
  }, [selectedGrade, selectedTopic]);

  // Timer for quiz attempt
  React.useEffect(() => {
    if (step !== 2 || submitted) return;
    if (timer === 0) return;
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [current, step, submitted]);

  React.useEffect(() => {
    if (timer === 0 && !submitted && step === 2) {
      handleNext();
    }
    // eslint-disable-next-line
  }, [timer]);

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
    setStep(2);
    setCurrent(0);
    setAnswers(Array(quiz.questions.length).fill(''));
    setSubmitted(false);
    setTimer(quiz.timePerQuestion);
  };

  const handleAnswer = (val) => {
    const newAnswers = [...answers];
    newAnswers[current] = val;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    clearInterval(intervalId);
    if (current < selectedQuiz.questions.length - 1) {
      setCurrent(current + 1);
      setTimer(selectedQuiz.timePerQuestion);
    } else {
      setSubmitted(true);
    }
  };

  const handlePrev = () => {
    clearInterval(intervalId);
    if (current > 0) {
      setCurrent(current - 1);
      setTimer(selectedQuiz.timePerQuestion);
    }
  };

  const handleSubmit = () => {
    clearInterval(intervalId);
    setSubmitted(true);
  };

  const getScore = () => {
    let score = 0;
    selectedQuiz.questions.forEach((q, i) => {
      if (q.type === 'multiple_choice' && parseInt(answers[i]) === q.correct) score++;
      if (q.type === 'short_answer' && answers[i].trim().toLowerCase() === q.correct.toLowerCase()) score++;
    });
    return score;
  };

  const handleReview = () => setReviewOpen(true);
  const handleCloseReview = () => setReviewOpen(false);

  const handleRedo = () => {
    setAnswers(Array(selectedQuiz.questions.length).fill(''));
    setCurrent(0);
    setSubmitted(false);
    setTimer(selectedQuiz.timePerQuestion);
    setReviewOpen(false);
    setUploadedFile(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setSnackbar({ open: true, message: 'File uploaded: ' + file.name, severity: 'success' });
    }
  };

  const handleFinish = () => {
    clearInterval(intervalId);
    setShowFinalActions(true);
  };

  // Step 1: Quiz selection
  if (step === 1) {
    return (
      <Box sx={{ backgroundColor: palette.bg, minHeight: '100vh', py: 6 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Button
                component={RouterLink}
                to="/student-dashboard2"
                startIcon={<ArrowBack />}
                sx={{ mr: 2 }}
              >
                Back to Dashboard
              </Button>
              <Typography variant="h4" sx={{ flexGrow: 1 }}>
                Attempt Quiz (Demo)
              </Typography>
            </Box>
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Filter Quizzes
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Grade</InputLabel>
                    <Select
                      value={selectedGrade}
                      label="Grade"
                      onChange={e => setSelectedGrade(e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      {grades.map(g => (
                        <MenuItem key={g} value={g}>{g}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Topic</InputLabel>
                    <Select
                      value={selectedTopic}
                      label="Topic"
                      onChange={e => setSelectedTopic(e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      {topics.map(t => (
                        <MenuItem key={t} value={t}>{t}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
            <Grid container spacing={3}>
              {filteredQuizzes.length === 0 ? (
                <Grid item xs={12}>
                  <Alert severity="info">No quizzes found for the selected filters.</Alert>
                </Grid>
              ) : (
                filteredQuizzes.map((quiz) => (
                  <Grid item xs={12} md={6} key={quiz.id}>
                    <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2, mb: 2 }}>
                      <Typography variant="h6" sx={{ color: palette.primary, mb: 1 }}>{quiz.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Grade: {quiz.grade} | Topic: {quiz.topic} | Subtopic: {quiz.subtopic}
                      </Typography>
                      <Button
                        variant="contained"
                        endIcon={<PlayArrow />}
                        onClick={() => handleQuizSelect(quiz)}
                        sx={{ mt: 1 }}
                      >
                        Attempt Quiz
                      </Button>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Paper>
        </Container>
      </Box>
    );
  }

  // Step 2: Quiz attempt (same as before)
  if (!selectedQuiz) return null;
  const q = selectedQuiz.questions[current];
  return (
    <Box sx={{ backgroundColor: palette.bg, minHeight: '100vh', py: 6 }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 4, boxShadow: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Chip label="Demo Quiz" color="primary" sx={{ mr: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: palette.text }}>
              {selectedQuiz.title}
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          {!submitted ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Question {current + 1} of {selectedQuiz.questions.length}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Timer sx={{ color: palette.primary }} />
                  <Typography variant="body2" color={timer < 10 ? 'error' : 'text.secondary'}>
                    {timer}s
                  </Typography>
                </Box>
              </Box>
              <LinearProgress variant="determinate" value={((current + 1) / selectedQuiz.questions.length) * 100} sx={{ mb: 3 }} />
              <Typography variant="h6" sx={{ mb: 2, color: palette.primary }}>
                {q.question}
              </Typography>
              {q.type === 'multiple_choice' ? (
                <FormControl component="fieldset">
                  <RadioGroup
                    value={answers[current]}
                    onChange={(e) => handleAnswer(e.target.value)}
                  >
                    {q.options.map((opt, idx) => (
                      <FormControlLabel
                        key={idx}
                        value={idx.toString()}
                        control={<Radio color="primary" />}
                        label={opt}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              ) : (
                <TextField
                  label="Your Answer"
                  value={answers[current]}
                  onChange={(e) => handleAnswer(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  variant="outlined"
                  startIcon={<NavigateBefore />}
                  onClick={handlePrev}
                  disabled={current === 0 || showFinalActions}
                >
                  Previous
                </Button>
                {current < selectedQuiz.questions.length - 1 && !showFinalActions ? (
                  <Button
                    variant="contained"
                    endIcon={<NavigateNext />}
                    onClick={handleNext}
                    disabled={answers[current] === ''}
                  >
                    Next
                  </Button>
                ) : null}
                {current === selectedQuiz.questions.length - 1 && !showFinalActions ? (
                  <Button
                    variant="contained"
                    color="success"
                    endIcon={<CheckCircle />}
                    onClick={handleFinish}
                    disabled={answers[current] === ''}
                  >
                    Finish
                  </Button>
                ) : null}
              </Box>
              {showFinalActions && (
                <>
                  <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={handleReview}
                    >
                      Review Quiz
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => { handleSubmit(); setShowFinalActions(false); }}
                    >
                      Submit Quiz
                    </Button>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={handleRedo}
                    >
                      Redo Quiz
                    </Button>
                    <Button
                      variant="outlined"
                      component="label"
                      color="primary"
                    >
                      Upload Written Work
                      <Input
                        type="file"
                        onChange={handleFileUpload}
                        sx={{ display: 'none' }}
                      />
                    </Button>
                    {uploadedFile && (
                      <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                        {uploadedFile.name}
                      </Typography>
                    )}
                  </Box>
                </>
              )}
              <Dialog open={reviewOpen} onClose={handleCloseReview} maxWidth="sm" fullWidth>
                <DialogTitle>Review Your Answers</DialogTitle>
                <DialogContent>
                  {selectedQuiz.questions.map((question, idx) => (
                    <Box key={idx} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ color: palette.primary }}>
                        Q{idx + 1}: {question.question}
                      </Typography>
                      <Typography variant="body2" sx={{ ml: 2 }}>
                        {question.type === 'multiple_choice'
                          ? question.options[answers[idx]] || <i>No answer</i>
                          : answers[idx] || <i>No answer</i>}
                      </Typography>
                    </Box>
                  ))}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseReview}>Back</Button>
                  <Button onClick={handleRedo} color="warning">Redo Quiz</Button>
                  <Button onClick={() => { handleSubmit(); handleCloseReview(); setShowFinalActions(false); }} color="success" variant="contained">Submit Quiz</Button>
                </DialogActions>
              </Dialog>
              <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
              />
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: palette.primary, mb: 2 }}>
                Quiz Submitted!
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Your Score: {getScore()} / {selectedQuiz.questions.length}
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="/student-dashboard2"
                sx={{ mt: 2 }}
              >
                Back to Dashboard
              </Button>
              <Button
                variant="outlined"
                color="warning"
                sx={{ mt: 2, ml: 2 }}
                onClick={handleRedo}
              >
                Redo Quiz
              </Button>
            </Box>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default AttemptQuizMock; 