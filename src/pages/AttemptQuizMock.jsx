import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
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
import {
  ArrowBack,
  NavigateBefore,
  NavigateNext,
  Timer,
  CheckCircle,
  PlayArrow
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Full Mock data including all quizzes
const mockQuizzes = [
  {
    id: 1,
    title: 'Algebra Basics Quiz',
    grade: 'Grade 8',
    topic: 'Algebra',
    subtopic: 'Linear Equations',
    timePerQuestion: 60,
    questions: [
      { id: 1, type: 'multiple_choice', question: 'What is the value of x in the equation 2x + 3 = 7?', options: ['1', '2', '3', '4'], correct: 1 },
      { id: 2, type: 'short_answer', question: 'Simplify: 3(x + 2) - 2x', correct: 'x + 6' }
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
      { id: 1, type: 'multiple_choice', question: 'How many degrees are in a triangle?', options: ['90', '180', '270', '360'], correct: 1 },
      { id: 2, type: 'short_answer', question: 'Name a type of triangle with all sides equal.', correct: 'Equilateral' }
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
      { id: 1, type: 'multiple_choice', question: 'What is sin(90°)?', options: ['0', '1', '0.5', 'undefined'], correct: 1 },
      { id: 2, type: 'short_answer', question: 'What is the ratio for tan(θ)?', correct: 'opposite/adjacent' }
    ],
  }
];

const grades = ['Grade 8', 'Grade 9'];
const topics = ['Algebra', 'Geometry', 'Trigonometry'];

const AttemptQuizMock = () => {
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [filteredQuizzes, setFilteredQuizzes] = useState(mockQuizzes);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [showFinalActions, setShowFinalActions] = useState(false);

  useEffect(() => {
    let filtered = mockQuizzes;
    if (selectedGrade) filtered = filtered.filter(q => q.grade === selectedGrade);
    if (selectedTopic) filtered = filtered.filter(q => q.topic === selectedTopic);
    setFilteredQuizzes(filtered);
  }, [selectedGrade, selectedTopic]);

  useEffect(() => {
    if (step !== 2 || submitted) return;
    if (timer === 0) return;
    const id = setInterval(() => setTimer(t => (t > 0 ? t - 1 : 0)), 1000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [current, step, submitted, timer]);

  useEffect(() => {
    if (timer === 0 && !submitted && step === 2) handleNext();
  }, [timer]);

  const handleQuizSelect = quiz => {
    setSelectedQuiz(quiz);
    setStep(2);
    setCurrent(0);
    setAnswers(Array(quiz.questions.length).fill(''));
    setSubmitted(false);
    setTimer(quiz.timePerQuestion);
  };
  const handleAnswer = val => { const a = [...answers]; a[current] = val; setAnswers(a); };
  const handleNext = () => { clearInterval(intervalId); if (current < selectedQuiz.questions.length - 1) { setCurrent(current + 1); setTimer(selectedQuiz.timePerQuestion); } else { setSubmitted(true); } };
  const handlePrev = () => { clearInterval(intervalId); if (current > 0) { setCurrent(current - 1); setTimer(selectedQuiz.timePerQuestion); } };
  const handleSubmit = () => { clearInterval(intervalId); setSubmitted(true); };
  const getScore = () => selectedQuiz.questions.reduce((sum, q, i) => {
    const ans = answers[i]?.toString().trim().toLowerCase();
    if (q.type === 'multiple_choice' && parseInt(answers[i]) === q.correct) return sum + 1;
    if (q.type === 'short_answer' && ans === q.correct.toLowerCase()) return sum + 1;
    return sum;
  }, 0);
  const handleReview = () => setReviewOpen(true);
  const handleCloseReview = () => setReviewOpen(false);
  const handleRedo = () => { setAnswers(Array(selectedQuiz.questions.length).fill('')); setCurrent(0); setSubmitted(false); setTimer(selectedQuiz.timePerQuestion); setReviewOpen(false); setUploadedFile(null); };
  const handleFileUpload = e => { const f = e.target.files[0]; if (f) { setUploadedFile(f); setSnackbar({ open: true, message: 'Uploaded ' + f.name, severity: 'success' }); } };
  const handleFinish = () => { clearInterval(intervalId); setShowFinalActions(true); };

  if (step === 1) {
    return (
      <Box sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        p: 4,
      }}>
        <Box sx={{ width: '100%', maxWidth: 900 }}>
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Button component={RouterLink} to="/student-dashboard2" startIcon={<ArrowBack />} sx={{ mr: 2 }}>Back to Dashboard</Button>
              <Typography variant="h4" sx={{ flexGrow: 1 }}>Attempt Quiz (Demo)</Typography>
            </Box>
            <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>Filter Quizzes</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Grade</InputLabel>
                    <Select value={selectedGrade} label="Grade" onChange={e => setSelectedGrade(e.target.value)}>
                      <MenuItem value="">All</MenuItem>
                      {grades.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Topic</InputLabel>
                    <Select value={selectedTopic} label="Topic" onChange={e => setSelectedTopic(e.target.value)}>
                      <MenuItem value="">All</ MenuItem>
                      {topics.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
            <Grid container spacing={3}>
              {filteredQuizzes.length === 0 ? (
                <Grid item xs={12}><Alert severity="info">No quizzes found.</Alert></Grid>
              ) : (
                filteredQuizzes.map(q => (
                  <Grid item xs={12} md={6} key={q.id}>
                    <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
                      <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>{q.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{q.grade} | {q.topic} | {q.subtopic}</Typography>
                      <Button variant="contained" endIcon={<PlayArrow />} onClick={() => handleQuizSelect(q)}>Attempt Quiz</Button>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Paper>
        </Box>
      </Box>
    );
  }

  const question = selectedQuiz.questions[current];
  return (
    <Box sx={{
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      p: 4
    }}>
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Timer sx={{ mr: 1 }} />
          <Typography variant="subtitle1">Time Left: {timer}s</Typography>
        </Box>
        <LinearProgress variant="determinate" value={((current + 1) / selectedQuiz.questions.length) * 100} sx={{ mb: 4 }} />

        <Card sx={{ p: 4, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Q{current + 1}. {question.question}</Typography>
          {question.type === 'multiple_choice' ? (
            <FormControl component="fieldset">
              <RadioGroup value={answers[current]} onChange={e => handleAnswer(e.target.value)}>
                {question.options.map((opt, idx) => <FormControlLabel key={idx} value={idx.toString()} control={<Radio />} label={opt} />)}
              </RadioGroup>
            </FormControl>
          ) : ( <TextField fullWidth placeholder="Type your answer" value={answers[current]} onChange={e => handleAnswer(e.target.value)} /> )}
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button startIcon={<NavigateBefore />} disabled={current === 0} onClick={handlePrev}>Previous</Button>
          {current < selectedQuiz.questions.length - 1 ? (
            <Button endIcon={<NavigateNext />} variant="contained" onClick={handleNext}>Next</Button>
          ) : (
            <Button variant="contained" onClick={submitted ? handleFinish : handleSubmit} endIcon={submitted ? <CheckCircle /> : <PlayArrow />}>{submitted ? 'Finish' : 'Submit'}</Button>
          )}
        </Box>

        <Dialog open={submitted} fullWidth>
          <DialogTitle>Quiz Completed</DialogTitle>
          <DialogContent><Typography>Your Score: {getScore()} / {selectedQuiz.questions.length}</Typography></DialogContent>
          <DialogActions><Button onClick={handleReview}>Review Answers</Button><Button onClick={handleRedo}>Redo Quiz</Button></DialogActions>
        </Dialog>

        <Dialog open={reviewOpen} onClose={handleCloseReview} fullWidth maxWidth="md">
          <DialogTitle>Review Answers</DialogTitle>
          <DialogContent>
            {selectedQuiz.questions.map((q, i) => (
              <Box key={i} sx={{ mb: 2 }}><Typography variant="subtitle1">Q{i+1}. {q.question}</Typography><Typography>Correct: {q.type === 'multiple_choice' ? q.options[q.correct] : q.correct}</Typography><Typography>Your Answer: {answers[i] || '—'}</Typography><Divider sx={{ my: 1 }} /></Box>
            ))}
            <Box sx={{ mt: 2 }}><input type="file" onChange={handleFileUpload} />{uploadedFile && <Chip label={uploadedFile.name} sx={{ mt: 1 }} />}</Box>
          </DialogContent>
          <DialogActions><Button onClick={handleCloseReview}>Close</Button><Button onClick={handleRedo}>Redo</Button><Button onClick={handleFinish} variant="contained">Finish</Button></DialogActions>
        </Dialog>

        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AttemptQuizMock;
