import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import { PlayArrow, ArrowBack } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';

const topicsData = {
  'Grade 8': {
    Algebra: ['Linear Equations', 'Exponents'],
    Geometry: ['Triangles', 'Circles'],
  },
  'Grade 9': {
    Algebra: ['Quadratic Equations', 'Polynomials'],
    Trigonometry: ['Basic Trig', 'Graphs'],
  },
  'Grade 10': {
    Algebra: ['Functions', 'Inequalities'],
    Geometry: ['Coordinate Geometry', 'Transformations'],
  },
  'Grade 11': {
    Calculus: ['Limits', 'Derivatives'],
    Statistics: ['Probability', 'Distributions'],
  },
  'Grade 12': {
    Calculus: ['Integrals', 'Applications'],
    Statistics: ['Regression', 'Hypothesis Testing'],
  },
};

const AttemptQuizFromSupabase = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [studentGrade, setStudentGrade] = useState('');
  const [gradeLoading, setGradeLoading] = useState(true);

  // Fetch all quizzes from Supabase
  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Fetch the student's grade from parent_signup_requests
  useEffect(() => {
    if (authLoading) return; // Wait for auth to finish loading
    if (!user?.email) {
      console.log('No user or user.email:', user);
      return;
    }
    const fetchStudentGrade = async () => {
      setGradeLoading(true);
      const { data, error } = await supabase
        .from('parent_signup_requests')
        .select('learner_grade, status')
        .eq('learner_email', user.email)
        .eq('status', 'approved')
        .single();
      console.log('Grade query result:', { data, error, userEmail: user.email });
      if (!error && data && data.status === 'approved') {
        setStudentGrade(data.learner_grade);
      }
      setGradeLoading(false);
    };
    fetchStudentGrade();
  }, [user, authLoading]);

  // Set selectedGrade to gradeLabel when studentGrade loads
  useEffect(() => {
    if (studentGrade) {
      const gradeLabel = `Grade ${studentGrade}`;
      setSelectedGrade(gradeLabel);
    }
  }, [studentGrade]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setQuizzes(data || []);
      setFilteredQuizzes(data || []);
    } catch (err) {
      console.error('Error fetching quizzes:', err);
      setError('Failed to load quizzes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter quizzes based on selected grade, topic, and subtopic
  useEffect(() => {
    let filtered = quizzes;
    const gradeLabel = studentGrade ? `Grade ${studentGrade}` : '';
    if (gradeLabel) {
      filtered = filtered.filter(quiz => quiz.grade === gradeLabel);
    }
    if (selectedTopic) {
      filtered = filtered.filter(quiz => quiz.topic === selectedTopic);
    }
    if (selectedSubtopic) {
      filtered = filtered.filter(quiz => quiz.subtopic === selectedSubtopic);
    }
    setFilteredQuizzes(filtered);
  }, [studentGrade, selectedTopic, selectedSubtopic, quizzes]);

  const handleAttemptQuiz = (quizId) => {
    navigate(`/attempt-quiz/${quizId}`);
  };

  const resetFilters = () => {
    setSelectedGrade('');
    setSelectedTopic('');
    setSelectedSubtopic('');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading quizzes...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            component={Link}
            to="/student-dashboard"
            startIcon={<ArrowBack />}
            sx={{ mr: 2 }}
          >
            Back to Dashboard
          </Button>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Attempt Quiz
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Filters */}
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Filter Quizzes
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel shrink>Grade Level</InputLabel>
                <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1, minHeight: 56, display: 'flex', alignItems: 'center', bgcolor: '#f9f9f9' }}>
                  {gradeLoading ? 'Loading...' : studentGrade ? `Grade ${studentGrade}` : 'No grade found'}
                </Box>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Topic</InputLabel>
                <Select
                  value={selectedTopic}
                  label="Topic"
                  onChange={(e) => {
                    setSelectedTopic(e.target.value);
                    setSelectedSubtopic('');
                  }}
                  disabled={!selectedGrade}
                >
                  <MenuItem value="">All Topics</MenuItem>
                  {selectedGrade && Object.keys(topicsData[selectedGrade] || {}).map(topic => (
                    <MenuItem key={topic} value={topic}>{topic}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Subtopic</InputLabel>
                <Select
                  value={selectedSubtopic}
                  label="Subtopic"
                  onChange={(e) => setSelectedSubtopic(e.target.value)}
                  disabled={!selectedTopic}
                >
                  <MenuItem value="">All Subtopics</MenuItem>
                  {selectedTopic && (topicsData[selectedGrade]?.[selectedTopic] || []).map(subtopic => (
                    <MenuItem key={subtopic} value={subtopic}>{subtopic}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={resetFilters}
              disabled={!selectedGrade && !selectedTopic && !selectedSubtopic}
            >
              Clear Filters
            </Button>
          </Box>
        </Paper>

        {/* Quiz List */}
        <Typography variant="h5" gutterBottom>
          Available Quizzes ({filteredQuizzes.length})
        </Typography>

        {filteredQuizzes.length === 0 ? (
          <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              {quizzes.length === 0 
                ? 'No quizzes available yet.' 
                : 'No quizzes match your selected filters.'}
            </Typography>
            {quizzes.length === 0 && (
              <Button
                variant="contained"
                component={Link}
                to="/student-dashboard"
                sx={{ mt: 2 }}
              >
                Back to Dashboard
              </Button>
            )}
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredQuizzes.map((quiz) => (
              <Grid item xs={12} md={6} lg={4} key={quiz.id}>
                <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {quiz.title}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={quiz.grade} 
                        size="small" 
                        color="primary" 
                        sx={{ mr: 1, mb: 1 }} 
                      />
                      <Chip 
                        label={quiz.topic} 
                        size="small" 
                        color="secondary" 
                        sx={{ mr: 1, mb: 1 }} 
                      />
                      <Chip 
                        label={quiz.subtopic} 
                        size="small" 
                        variant="outlined" 
                        sx={{ mb: 1 }} 
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Questions: {quiz.questions?.length || 0}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      Created: {new Date(quiz.created_at).toLocaleDateString()}
                    </Typography>
                  </CardContent>

                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<PlayArrow />}
                      onClick={() => handleAttemptQuiz(quiz.id)}
                    >
                      Attempt Quiz
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default AttemptQuizFromSupabase; 