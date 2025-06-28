import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, TextField, Button, Alert, MenuItem, Checkbox, FormGroup, FormControlLabel, Grid, Card, CardContent, Chip, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { supabase } from '../config/supabase';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const grades = ['8', '9', '10', '11', '12'];
const topicsByGrade = {
  '8': ['Algebra Basics', 'Geometry', 'Fractions', 'Decimals'],
  '9': ['Linear Equations', 'Quadratic Equations', 'Trigonometry', 'Statistics'],
  '10': ['Functions', 'Polynomials', 'Probability', 'Coordinate Geometry'],
  '11': ['Calculus', 'Complex Numbers', 'Sequences & Series', 'Vectors'],
  '12': ['Advanced Calculus', 'Differential Equations', 'Matrices', 'Statistics & Probability']
};

const RegisterStudent = () => {
  const { userRole } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    learnerFirstName: '',
    learnerLastName: '',
    learnerEmail: '',
    learnerGrade: '',
    helpTopics: [],
    helpDescription: '',
    preferredDates: [null, null, null]
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // For admin: pending requests
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [errorRequests, setErrorRequests] = useState('');

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [generatedPasswords, setGeneratedPasswords] = useState({ parent: '', learner: '' });
  const [approving, setApproving] = useState(false);
  const [approveError, setApproveError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (userRole === 'admin') {
      const fetchRequests = async () => {
        setLoadingRequests(true);
        setErrorRequests('');
        try {
          const { data, error } = await supabase
            .from('parent_signup_requests')
            .select('*')
            .eq('status', 'pending')
            .order('submitted_at', { ascending: false });
          if (error) throw error;
          setRequests(data || []);
        } catch (err) {
          setErrorRequests('Failed to fetch requests: ' + err.message);
        } finally {
          setLoadingRequests(false);
        }
      };
      fetchRequests();
    }
  }, [userRole]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTopicChange = (topic) => {
    setForm((prev) => {
      const exists = prev.helpTopics.includes(topic);
      return {
        ...prev,
        helpTopics: exists
          ? prev.helpTopics.filter((t) => t !== topic)
          : [...prev.helpTopics, topic]
      };
    });
  };

  const handleDateChange = (index, date) => {
    setForm((prev) => {
      const newDates = [...prev.preferredDates];
      newDates[index] = date;
      return { ...prev, preferredDates: newDates };
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const formattedDates = form.preferredDates.map(date => date ? dayjs(date).format('YYYY-MM-DD') : null);
      const { error } = await supabase.from('parent_signup_requests').insert([
        {
          parent_first_name: form.parentFirstName,
          parent_last_name: form.parentLastName,
          parent_email: form.parentEmail,
          learner_first_name: form.learnerFirstName,
          learner_last_name: form.learnerLastName,
          learner_email: form.learnerEmail,
          learner_grade: form.learnerGrade,
          help_topics: form.helpTopics,
          help_description: form.helpDescription,
          preferred_dates: formattedDates,
          status: 'pending',
          submitted_at: new Date().toISOString(),
        }
      ]);
      if (error) throw error;
      setSuccess('Registration request submitted!');
      setForm({
        parentFirstName: '',
        parentLastName: '',
        parentEmail: '',
        learnerFirstName: '',
        learnerLastName: '',
        learnerEmail: '',
        learnerGrade: '',
        helpTopics: [],
        helpDescription: '',
        preferredDates: [null, null, null]
      });
      setStep(1);
    } catch (err) {
      setError('Failed to submit: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const generatePassword = () => Math.random().toString(36).slice(-10);

  // If admin, show pending requests
  if (userRole === 'admin') {
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Pending Parent Signup Requests
        </Typography>
        {loadingRequests && <Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /></Box>}
        {errorRequests && <Alert severity="error" sx={{ mb: 2 }}>{errorRequests}</Alert>}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {requests.map((req) => (
            <Grid item xs={12} md={6} key={req.id}>
              <Card sx={{ borderLeft: '6px solid #1976d2', cursor: 'pointer' }}
                onClick={() => {
                  setSelectedRequest(req);
                  setDetailsOpen(true);
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Parent: {req.parent_first_name} {req.parent_last_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {req.parent_email}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Learner: {req.learner_first_name} {req.learner_last_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {req.learner_email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Grade: {req.learner_grade}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip label={req.status} color="warning" />
                    <Typography variant="caption" sx={{ ml: 2 }}>
                      Submitted: {new Date(req.submitted_at).toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {!loadingRequests && requests.length === 0 && (
            <Grid item xs={12}>
              <Alert severity="info">No pending requests found.</Alert>
            </Grid>
          )}
        </Grid>
        {/* Dialog for request details */}
        <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Request Details</DialogTitle>
          <DialogContent dividers>
            {selectedRequest && (
              <Box>
                <Typography variant="subtitle1"><b>Parent:</b> {selectedRequest.parent_first_name} {selectedRequest.parent_last_name}</Typography>
                <Typography variant="body2"><b>Parent Email:</b> {selectedRequest.parent_email}</Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}><b>Learner:</b> {selectedRequest.learner_first_name} {selectedRequest.learner_last_name}</Typography>
                <Typography variant="body2"><b>Learner Email:</b> {selectedRequest.learner_email}</Typography>
                <Typography variant="body2"><b>Grade:</b> {selectedRequest.learner_grade}</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}><b>Help Topics:</b> {selectedRequest.help_topics?.join(', ')}</Typography>
                <Typography variant="body2"><b>Description:</b> {selectedRequest.help_description}</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}><b>Preferred Dates:</b> {selectedRequest.preferred_dates?.map(d => new Date(d).toLocaleDateString()).join(', ')}</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}><b>Status:</b> {selectedRequest.status}</Typography>
                <Typography variant="body2"><b>Submitted:</b> {new Date(selectedRequest.submitted_at).toLocaleString()}</Typography>
              </Box>
            )}
            {approveError && <Alert severity="error" sx={{ mt: 2 }}>{approveError}</Alert>}
            {generatedPasswords.parent && generatedPasswords.learner && (
              <Box sx={{ mt: 2 }}>
                <Alert severity="success">
                  <div><b>Parent Password:</b> {generatedPasswords.parent}</div>
                  <div><b>Learner Password:</b> {generatedPasswords.learner}</div>
                </Alert>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailsOpen(false)}>Close</Button>
            {selectedRequest && selectedRequest.status === 'pending' && (
              <Button
                onClick={() => {
                  setDetailsOpen(false);
                  navigate(`/admin-signup?requestId=${selectedRequest.id}`);
                }}
                color="success"
                variant="contained"
              >
                Approve
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Container>
    );
  }

  // Otherwise, show registration form
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Parent & Learner Registration
      </Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {step === 1 && (
          <Box component="form" onSubmit={handleNext}>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Parent Information</Typography>
        <TextField
              label="Parent First Name"
              name="parentFirstName"
              value={form.parentFirstName}
              onChange={handleChange}
          fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Parent Last Name"
              name="parentLastName"
              value={form.parentLastName}
          onChange={handleChange}
              fullWidth
          required
              sx={{ mb: 2 }}
        />
        <TextField
              label="Parent Email"
              name="parentEmail"
              type="email"
              value={form.parentEmail}
              onChange={handleChange}
          fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Learner Information</Typography>
            <TextField
              label="Learner First Name"
              name="learnerFirstName"
              value={form.learnerFirstName}
          onChange={handleChange}
              fullWidth
          required
              sx={{ mb: 2 }}
        />
        <TextField
              label="Learner Last Name"
              name="learnerLastName"
              value={form.learnerLastName}
              onChange={handleChange}
          fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Learner Email"
              name="learnerEmail"
          type="email"
              value={form.learnerEmail}
          onChange={handleChange}
              fullWidth
          required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Learner Grade"
              name="learnerGrade"
              select
              value={form.learnerGrade}
            onChange={handleChange}
              fullWidth
            required
              sx={{ mb: 2 }}
            >
              {grades.map((grade) => (
                <MenuItem key={grade} value={grade}>{grade}</MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            fullWidth
              size="large"
              sx={{ mt: 3 }}
            >
              Next
            </Button>
          </Box>
        )}
        {step === 2 && (
          <Box component="form" onSubmit={handleNext}>
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>How Can We Help?</Typography>
            {form.learnerGrade && (
              <FormGroup sx={{ mb: 2 }}>
                {topicsByGrade[form.learnerGrade]?.map((topic) => (
                  <FormControlLabel
                    key={topic}
                    control={
                      <Checkbox
                        checked={form.helpTopics.includes(topic)}
                        onChange={() => handleTopicChange(topic)}
                      />
                    }
                    label={topic}
                  />
                ))}
              </FormGroup>
            )}
            {form.helpTopics.length > 0 && (
          <TextField
                label="Describe more about the help you need"
                name="helpDescription"
                value={form.helpDescription}
                onChange={handleChange}
            fullWidth
                multiline
                minRows={3}
                sx={{ mb: 2 }}
              />
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={handleBack}>Back</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
                disabled={!form.helpTopics.length || !form.helpDescription}
        >
                Next
        </Button>
      </Box>
          </Box>
        )}
        {step === 3 && (
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Select 3 Preferred Days to Consult at Clinic</Typography>
            {[0, 1, 2].map((idx) => (
              <DatePicker
                key={idx}
                label={`Choice ${idx + 1}`}
                value={form.preferredDates[idx]}
                onChange={(date) => handleDateChange(idx, date)}
                sx={{ mb: 2 }}
                slotProps={{ textField: { fullWidth: true } }}
              />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={handleBack}>Back</Button>
      <Button
                type="submit"
                variant="contained"
                color="primary"
        fullWidth
                size="large"
                sx={{ ml: 2 }}
                disabled={loading || form.preferredDates.some(date => !date)}
              >
                {loading ? 'Submitting...' : 'Submit Registration'}
      </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default RegisterStudent;