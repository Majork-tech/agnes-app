import React, { useState } from 'react';
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { ArrowBack, Upload } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const StudentUploadToAdmin = () => {
  const [file, setFile] = useState(null);
  const [problemDescription, setProblemDescription] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Mock upload functionality
    console.log('File:', file);
    console.log('Problem Description:', problemDescription);
    alert('File uploaded successfully! (Mock)');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Upload File for Admin
        </Typography>

        {/* File upload form */}
        <form onSubmit={handleSubmit}>
          {/* File input */}
          <Box sx={{ mb: 3 }}>
            <input
              type="file"
              accept=".pdf,.mp4"
              onChange={handleFileChange}
              required
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<Upload />}
                fullWidth
              >
                Select File (PDF or MP4)
              </Button>
            </label>
            {file && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {file.name}
              </Typography>
            )}
          </Box>

          {/* Text area for describing the problem */}
          <TextField
            fullWidth
            label="Describe Your Problem"
            multiline
            rows={4}
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            placeholder="Provide a brief description of your problem"
            required
            sx={{ mb: 3 }}
          />

          {/* Submit button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mb: 3 }}
          >
            Upload File
          </Button>
        </form>

        {/* Back to Dashboard Button */}
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          component={Link}
          to="/student-dashboard"
          startIcon={<ArrowBack />}
        >
          Back to Dashboard
        </Button>
      </Card>
    </Container>
  );
};

export default StudentUploadToAdmin;