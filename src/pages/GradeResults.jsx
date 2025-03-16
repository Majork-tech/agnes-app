import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Input,
  FormControl,
  FormLabel,
  Box
} from '@mui/material';
import { ArrowBack, Upload } from '@mui/icons-material';

const GradeResults = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    quizId: '',
    quizName: '',
    score: '',
    reportPdf: null,
    markedPdf: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form Data:', formData);
    // Add your API call here
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
          Enter Quiz Results
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Student ID"
            name="studentId"
            type="number"
            value={formData.studentId}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Quiz ID"
            name="quizId"
            type="number"
            value={formData.quizId}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Quiz Name"
            name="quizName"
            value={formData.quizName}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Score"
            name="score"
            type="number"
            value={formData.score}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <Input
              type="file"
              id="report-pdf"
              name="reportPdf"
              accept="application/pdf"
              onChange={handleChange}
              sx={{ display: 'none' }}
              required
            />
            <label htmlFor="report-pdf">
              <Button
                variant="contained"
                component="span"
                startIcon={<Upload />}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Upload Report PDF
              </Button>
            </label>
            {formData.reportPdf && (
              <Typography variant="caption" sx={{ mt: 1 }}>
                Selected: {formData.reportPdf.name}
              </Typography>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <Input
              type="file"
              id="marked-pdf"
              name="markedPdf"
              accept="application/pdf"
              onChange={handleChange}
              sx={{ display: 'none' }}
              required
            />
            <label htmlFor="marked-pdf">
              <Button
                variant="contained"
                component="span"
                startIcon={<Upload />}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Upload Marked PDF
              </Button>
            </label>
            {formData.markedPdf && (
              <Typography variant="caption" sx={{ mt: 1 }}>
                Selected: {formData.markedPdf.name}
              </Typography>
            )}
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Submit Results
            </Button>

            <Button
              variant="contained"
              color="warning"
              startIcon={<ArrowBack />}
              component="a"
              href="/admindashboard"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Back to Dashboard
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default GradeResults;