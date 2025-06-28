import React, { useState } from 'react';
import {
  Container,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  TextareaAutosize,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const UploadVideoS = () => {
  const [grade, setGrade] = useState('');
  const [videoName, setVideoName] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock upload functionality
    console.log('Grade:', grade);
    console.log('Video Name:', videoName);
    console.log('Video Description:', videoDescription);
    console.log('Video File:', videoFile);
    alert('Video uploaded successfully! (Mock)');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Upload Video Lesson
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Grade Input */}
          <TextField
            fullWidth
            label="Grade"
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
            sx={{ mb: 3 }}
          />

          {/* Video Name Input */}
          <TextField
            fullWidth
            label="Video Name"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
            required
            sx={{ mb: 3 }}
          />

          {/* Video Description Input */}
          <TextField
            fullWidth
            label="Video Description"
            multiline
            rows={4}
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            required
            sx={{ mb: 3 }}
          />

          {/* Video File Input */}
          <Box sx={{ mb: 3 }}>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
              style={{ display: 'none' }}
              id="video-file"
            />
            <label htmlFor="video-file">
              <Button variant="contained" component="span">
                Upload Video File
              </Button>
            </label>
            {videoFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {videoFile.name}
              </Typography>
            )}
          </Box>

          {/* Upload Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mb: 3 }}
          >
            Upload Video
          </Button>
        </form>

        {/* Back to Dashboard Button */}
        <Button
          fullWidth
          variant="contained"
          color="warning"
          component={Link}
          to="/admindashboard"
          startIcon={<ArrowBack />}
        >
          Back to Dashboard
        </Button>
      </Card>
    </Container>
  );
};

export default UploadVideoS;