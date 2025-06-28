import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
} from '@mui/material';
import {
  Quiz,
  ListAlt,
  VideoLibrary,
  UploadFile,
  Visibility,
  School,
  PlayArrow,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const dashboardItems = [
    {
      title: 'View Quizzes',
      description: 'Browse and attempt available quizzes',
      icon: <Quiz sx={{ fontSize: 40 }} />,
      path: '/view-quizzes',
      color: '#1976d2',
    },
    {
      title: 'Attempt Quiz',
      description: 'Take quizzes from Supabase database',
      icon: <PlayArrow sx={{ fontSize: 40 }} />,
      path: '/attempt-quiz',
      color: '#ff9800',
    },
    {
      title: 'View Results',
      description: 'Check your quiz results and performance',
      icon: <ListAlt sx={{ fontSize: 40 }} />,
      path: '/view-results-student',
      color: '#388e3c',
    },
    {
      title: 'View Videos',
      description: 'Access educational videos and content',
      icon: <VideoLibrary sx={{ fontSize: 40 }} />,
      path: '/view-videos',
      color: '#d32f2f',
    },
    {
      title: 'Upload to Admin',
      description: 'Submit files and assignments to admin',
      icon: <UploadFile sx={{ fontSize: 40 }} />,
      path: '/student-upload',
      color: '#f57c00',
    },
    {
      title: 'View Admin Uploads',
      description: 'Access files uploaded by admin',
      icon: <Visibility sx={{ fontSize: 40 }} />,
      path: '/admin-uploads',
      color: '#7b1fa2',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
        <School sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          Student Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Welcome back! Here's what you can do today.
        </Typography>
      </Paper>

      {/* Dashboard Grid */}
      <Grid container spacing={3}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    color: item.color,
                    mb: 2,
                    p: 2,
                    borderRadius: '50%',
                    backgroundColor: `${item.color}15`,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3, flexGrow: 1 }}
                >
                  {item.description}
                </Typography>
                <Button
                  component={Link}
                  to={item.path}
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: item.color,
                    '&:hover': {
                      backgroundColor: item.color,
                      opacity: 0.9,
                    },
                  }}
                >
                  Access
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Stats */}
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Available Quizzes
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">
                2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed Quizzes
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main">
                85%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Score
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default StudentDashboard; 