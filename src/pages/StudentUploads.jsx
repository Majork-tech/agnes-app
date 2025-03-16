import React, { useState } from 'react';
import {
  Container,
  Card,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Mock data for students
const mockStudents = [
  { usr_login: 'student1' },
  { usr_login: 'student2' },
  { usr_login: 'student3' },
];

const StudentUploads = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock upload functionality
    console.log('Selected Student:', selectedStudent);
    console.log('Selected File:', file);
    alert('File uploaded successfully! (Mock)');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Upload File for Students
        </Typography>

        {/* File upload form */}
        <form onSubmit={handleSubmit}>
          {/* Select student dropdown */}
          <TextField
            fullWidth
            select
            label="Select Student"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            required
            sx={{ mb: 3 }}
          >
            <MenuItem value="">-- Select a student --</MenuItem>
            {mockStudents.map((student) => (
              <MenuItem key={student.usr_login} value={student.usr_login}>
                {student.usr_login}
              </MenuItem>
            ))}
          </TextField>

          {/* File upload input */}
          <Box sx={{ mb: 3 }}>
            <input
              type="file"
              accept=".pdf, .mp4"
              onChange={(e) => setFile(e.target.files[0])}
              required
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="contained" component="span">
                Upload File (PDF or MP4)
              </Button>
            </label>
            {file && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {file.name}
              </Typography>
            )}
          </Box>

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

export default StudentUploads;