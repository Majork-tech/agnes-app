import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Paper, Divider } from '@mui/material';
import { School, ListAlt, PlayArrow, VideoLibrary, Person, EventNote, Assignment, PictureAsPdf, OndemandVideo, AccessTime, VideoCall } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Define a modern accent palette
const palette = {
  bg: '#F7FAFC',
  card: '#FFFFFF',
  primary: '#1976D2',
  secondary: '#00ACC1',
  accent: '#FFB300',
  hover: '#1565C0',
  text: '#37474F',
};

const dashboardItems = [
  {
    title: 'Results',
    icon: <ListAlt sx={{ fontSize: 42, color: palette.primary }} />, 
    path: '/view-results-student2',
    color: palette.primary,
    description: 'View your quiz results and progress.'
  },
  {
    title: 'Attempt Quiz',
    icon: <PlayArrow sx={{ fontSize: 42, color: palette.secondary }} />, 
    path: '/attempt-quiz-mock',
    color: palette.secondary,
    description: 'Take a mock quiz and test your skills.'
  },
  {
    title: 'Learning Material',
    icon: <VideoLibrary sx={{ fontSize: 42, color: palette.accent }} />, 
    path: '/view-learning-material-mock',
    color: palette.accent,
    description: 'Access videos and PDF worksheets.'
  },
  {
    title: 'Tutor Direct',
    icon: <Person sx={{ fontSize: 42, color: palette.hover }} />, 
    path: '/tutor-direct-mock',
    color: palette.hover,
    description: 'Chat or upload files to your tutor.'
  },
];

const announcements = [
  {
    icon: <Assignment sx={{ color: palette.primary }} />, 
    title: 'New Results Available',
    description: 'Your Algebra Basics Quiz results are now available. Check your score and feedback.',
    time: 'Today, 08:00',
  },
  {
    icon: <PlayArrow sx={{ color: palette.secondary }} />, 
    title: 'Quiz To Be Done',
    description: 'Complete the Geometry Fundamentals Quiz.',
    due: 'Due: Today, 17:00',
  },
  {
    icon: <PictureAsPdf sx={{ color: palette.accent }} />, 
    title: 'Material To Be Viewed (PDF)',
    description: 'Review the Geometry_Revision.pdf worksheet.',
    due: 'Due: Today, 19:00',
  },
  {
    icon: <OndemandVideo sx={{ color: palette.hover }} />, 
    title: 'Material To Be Viewed (Video)',
    description: 'Watch "Introduction to Algebra" video lesson.',
    due: 'Due: Today, 20:00',
  },
  {
    icon: <VideoCall sx={{ color: palette.primary }} />,
    title: 'Tutoring Session',
    description: 'Your next tutoring session is booked.',
    due: 'Today, 16:00 - 16:30',
  },
];

const StudentDashboard2 = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ backgroundColor: palette.bg, minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', mb: 6, borderRadius: 3 }}>
          <School sx={{ fontSize: 64, color: palette.primary, mb: 1 }} />
          <Typography variant="h3" sx={{ fontWeight: 700, color: palette.text, mb: 1 }}>
            Student Dashboard (Demo)
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
            Welcome back! This is a mock-data demo.
          </Typography>
          <Divider sx={{ width: '60px', mx: 'auto', mb: 1, borderColor: palette.accent }} />
        </Paper>

        {/* Announcements Board */}
        <Paper elevation={4} sx={{ p: 4, mb: 6, borderRadius: 3, background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)', overflow: 'hidden' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: palette.primary, mb: 3 }}>
            Announcements and Instructions Today
          </Typography>
          <Grid container spacing={3} alignItems="stretch">
            {announcements.map((a, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx} sx={{ display: 'flex' }}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', minHeight: 150, flex: 1, gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
                    <Box sx={{ mr: 1, mt: 0.5 }}>{a.icon}</Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: palette.text }}>{a.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>{a.description}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 'auto' }}>
                    {a.time && (
                      <Typography variant="caption" sx={{ color: palette.primary }}><AccessTime sx={{ fontSize: 16, mr: 0.5, mb: '-2px' }} /> {a.time}</Typography>
                    )}
                    {a.due && (
                      <Typography variant="caption" sx={{ color: palette.secondary, display: 'block' }}><AccessTime sx={{ fontSize: 16, mr: 0.5, mb: '-2px' }} /> {a.due}</Typography>
                    )}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Dashboard Grid */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {dashboardItems.map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                elevation={2}
                sx={{
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: 6, cursor: 'pointer' },
                  borderRadius: 2,
                  backgroundColor: palette.card,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
                onClick={() => navigate(item.path)}
              >
                <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      mx: 'auto',
                      mb: 2,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: `${item.color}20`,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: palette.text, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                    {item.description}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: item.color,
                      '&:hover': { backgroundColor: item.color, opacity: 0.85 },
                      textTransform: 'none',
                      fontWeight: 500,
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ color: palette.primary, fontWeight: 700 }}>
                3
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Available Quizzes
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ color: palette.secondary, fontWeight: 700 }}>
                2
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Completed Quizzes
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ color: palette.accent, fontWeight: 700 }}>
                85%
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Average Score
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentDashboard2;
