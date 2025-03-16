import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const IndexPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = (role) => {
    // Navigate to the corresponding route based on the role
    if (role === 'admin') {
      navigate('/create-quizzes');
    } else if (role === 'student') {
      navigate('/view-quizzes');
    } else if (role === 'parent') {
      navigate('/parent-dashboard');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2,
      }}
    >
      <Typography variant="h4">Welcome! Please select your role:</Typography>
      <Button variant="contained" onClick={() => handleButtonClick('admin')}>
        Admin
      </Button>
      <Button variant="contained" onClick={() => handleButtonClick('student')}>
        Student
      </Button>
      <Button variant="contained" onClick={() => handleButtonClick('parent')}>
        Parent
      </Button>
    </Box>
  );
};

export default IndexPage;