// src/pages/Homepage.jsx
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={10}>
        <Typography variant="h2" gutterBottom>
          Welcome to Admin Dashboard
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Manage quizzes, submissions, and student data
        </Typography>
        
        <Box mt={4} display="flex" gap={2} justifyContent="center">
          <Button 
            variant="contained" 
            size="large" 
            component={Link}
            to="/create-quizzes"
          >
            Get Started
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            component={Link}
            to="/view-submissions"
          >
            View Submissions
          </Button>
        </Box>
      </Box>
    </Container>
  );
}