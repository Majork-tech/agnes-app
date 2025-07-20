import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useTheme
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { supabase } from '../config/supabase';
import dayjs from 'dayjs';

const steps = [
  'Parent & Learner',
  'Help Details',
  'Select Dates',
  'Review'
];

const grades = ['6', '7', '8', '9', '10', '11', '12'];
const topicsByGrade = {
  '8': ['Algebra Basics', 'Geometry', 'Fractions', 'Decimals'],
  '9': ['Linear Equations', 'Quadratic Equations', 'Trigonometry', 'Statistics'],
  '10': ['Functions', 'Polynomials', 'Probability', 'Coordinate Geometry'],
  '11': ['Calculus', 'Complex Numbers', 'Sequences', 'Vectors'],
  '12': ['Advanced Calculus', 'Diff Equations', 'Matrices', 'Stats & Probability']
};

const ParentSignup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    preferredDays: [],
    preferredTime: ''
  });
  const theme = useTheme();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleTopic = (topic) => {
    setForm((prev) => ({
      ...prev,
      helpTopics: prev.helpTopics.includes(topic)
        ? prev.helpTopics.filter((t) => t !== topic)
        : [...prev.helpTopics, topic]
    }));
  };

  const setDate = (i, date) => {
    const dates = [...form.preferredDates];
    dates[i] = date;
    setForm({ ...form, preferredDates: dates });
  };

  const next = () => setActiveStep((s) => s + 1);
  const back = () => setActiveStep((s) => s - 1);

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.from('parent_signup_requests').insert([{
        parent_first_name: form.parentFirstName,
        parent_last_name: form.parentLastName,
        parent_email: form.parentEmail,
        learner_first_name: form.learnerFirstName,
        learner_last_name: form.learnerLastName,
        learner_email: form.learnerEmail,
        learner_grade: form.learnerGrade,
        help_topics: form.helpTopics,
        help_description: form.helpDescription,
        preferred_days: form.preferredDays,
        preferred_time: form.preferredTime,
        status: 'pending',
        submitted_at: new Date().toISOString()
      }]);
      if (error) throw error;
      setSuccess('Request submitted! Check your email for login details once approved.');
      setActiveStep(steps.length);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const isNextDisabled = () => {
    if (activeStep === 0) return [
      'parentFirstName','parentLastName','parentEmail',
      'learnerFirstName','learnerLastName','learnerEmail','learnerGrade'
    ].some((k) => !form[k]);
    if (activeStep === 1) return form.helpTopics.length === 0;
    if (activeStep === 2) return !(form.preferredDays && form.preferredDays.length > 0 && form.preferredTime && form.preferredTime.trim() !== '');
    return false;
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ display: 'grid', gap: 2 }}>
            <Typography variant="h6">Parent & Learner Info</Typography>
            {['parentFirstName','parentLastName','parentEmail','learnerFirstName','learnerLastName','learnerEmail'].map((name) => (
              <TextField key={name} label={name.replace(/([A-Z])/g, ' $1')} name={name}
                value={form[name]} onChange={handleChange} fullWidth required />
            ))}
            <TextField select label="Learner Grade" name="learnerGrade"
              value={form.learnerGrade} onChange={handleChange} fullWidth required>
              {grades.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </TextField>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Help Details</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={form.helpTopics.includes('I need help until my final year exam')} onChange={() => setForm(prev => ({ ...prev, helpTopics: prev.helpTopics.includes('I need help until my final year exam') ? prev.helpTopics.filter(h => h !== 'I need help until my final year exam') : [...prev.helpTopics, 'I need help until my final year exam'] }))} />}
                label="I need help until my final year exam"
              />
              <FormControlLabel
                control={<Checkbox checked={form.helpTopics.includes('I need help with a specific topic')} onChange={() => setForm(prev => ({ ...prev, helpTopics: prev.helpTopics.includes('I need help with a specific topic') ? prev.helpTopics.filter(h => h !== 'I need help with a specific topic') : [...prev.helpTopics, 'I need help with a specific topic'] }))} />}
                label="I need help with a specific topic"
              />
              <FormControlLabel
                control={<Checkbox checked={form.helpTopics.includes('I am not yet sure, all I know my marks are not good')} onChange={() => setForm(prev => ({ ...prev, helpTopics: prev.helpTopics.includes('I am not yet sure, all I know my marks are not good') ? prev.helpTopics.filter(h => h !== 'I am not yet sure, all I know my marks are not good') : [...prev.helpTopics, 'I am not yet sure, all I know my marks are not good'] }))} />}
                label="I am not yet sure, all I know my marks are not good"
              />
            </FormGroup>
            {form.helpTopics.includes('I need help with a specific topic') && (
              <TextField label="Which topic? (optional)" name="helpDescription"
                value={form.helpDescription} onChange={handleChange} fullWidth multiline minRows={2} />
            )}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Preferred Days & Time</Typography>
            <FormGroup row>
              {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day => (
                <FormControlLabel
                  key={day}
                  control={<Checkbox checked={form.preferredDays?.includes(day)} onChange={() => {
                    setForm(prev => {
                      const days = prev.preferredDays || [];
                      return {
                        ...prev,
                        preferredDays: days.includes(day)
                          ? days.filter(d => d !== day)
                          : [...days, day]
                      };
                    });
                  }} />}
                  label={day.slice(0,3)}
                />
              ))}
            </FormGroup>
            <TextField
              label="Preferred Time (e.g. 15:30 or 3:30pm)"
              name="preferredTime"
              value={form.preferredTime || ''}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        );
      case 3:
        return (
          <Box sx={{ display: 'grid', gap: 2 }}>
            <Typography variant="h5" color="error" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              A R200 reserve fee is required to secure your child's place and will be discounted in the first invoice.
            </Typography>
            <Typography variant="subtitle1" color="primary" sx={{ textAlign: 'center', mb: 1 }}>
              A follow-up email with banking details will be sent to you.
            </Typography>
            <Typography variant="h6">Review & Submit</Typography>
            {Object.entries(form).map(([key, val]) => (
              <Typography key={key}><strong>{key}:</strong> {Array.isArray(val)?val.join(', '):(val?.toString() || '-')}</Typography>
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }} elevation={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Signup Request
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb:2 }}>{success}</Alert>}
          {renderStep()}
          <Box sx={{ mt:3, display: 'flex', justifyContent: 'space-between' }}>
            <Button disabled={activeStep===0} onClick={back}>Back</Button>
            {activeStep < steps.length -1 ? (
              <Button variant="contained" onClick={next} disabled={isNextDisabled()}>Next</Button>
            ):(
              <Button variant="contained" onClick={submit} disabled={loading} endIcon={loading?<CircularProgress size={20} />:null}>Submit</Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ParentSignup;
