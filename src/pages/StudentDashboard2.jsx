import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Paper, Divider, useTheme, alpha } from '@mui/material';
import { School, ListAlt, PlayArrow, VideoLibrary, Person, Assignment, PictureAsPdf, OndemandVideo, AccessTime, VideoCall } from '@mui/icons-material';
import StudentMascot from '../components/StudentMascot';
import StudentMascotPopup from '../components/StudentMascotPopup';
import { useNavigate } from 'react-router-dom';

const StudentDashboard2 = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [bubbleVisible, setBubbleVisible] = React.useState(true);

  const dashboardItems = [
    {
      title: 'Results',
      icon: <ListAlt sx={{ fontSize: 42, color: theme.palette.primary.main }} />,
      path: '/view-results-student2',
      color: theme.palette.primary.main,
      description: 'View your quiz results and progress.'
    },
    {
      title: 'Attempt Quiz',
      icon: <PlayArrow sx={{ fontSize: 42, color: theme.palette.success.main }} />,
      path: '/attempt-quiz-mock',
      color: theme.palette.success.main,
      description: 'Take a mock quiz and test your skills.'
    },
    {
      title: 'Learning Material',
      icon: <VideoLibrary sx={{ fontSize: 42, color: theme.palette.secondary.main }} />,
      path: '/view-learning-material-mock',
      color: theme.palette.secondary.main,
      description: 'Access videos and PDF worksheets.'
    },
    {
      title: 'Tutor Direct',
      icon: <Person sx={{ fontSize: 42, color: theme.palette.primary.dark }} />,
      path: '/tutor-direct-mock',
      color: theme.palette.primary.dark,
      description: 'Chat or upload files to your tutor.'
    },
  ];

  const announcements = [
    {
      icon: <Assignment sx={{ color: theme.palette.primary.main }} />,
      title: 'New Results Available',
      description: 'Your Algebra Basics Quiz results are now available. Check your score and feedback.',
      time: 'Today, 08:00',
    },
    {
      icon: <PlayArrow sx={{ color: theme.palette.success.main }} />,
      title: 'Quiz To Be Done',
      description: 'Complete the Geometry Fundamentals Quiz.',
      due: 'Due: Today, 17:00',
    },
    {
      icon: <PictureAsPdf sx={{ color: theme.palette.secondary.main }} />,
      title: 'Material To Be Viewed (PDF)',
      description: 'Review the Geometry_Revision.pdf worksheet.',
      due: 'Due: Today, 19:00',
    },
    {
      icon: <OndemandVideo sx={{ color: theme.palette.primary.dark }} />,
      title: 'Material To Be Viewed (Video)',
      description: 'Watch "Introduction to Algebra" video lesson.',
      due: 'Due: Today, 20:00',
    },
    {
      icon: <VideoCall sx={{ color: theme.palette.primary.main }} />,
      title: 'Tutoring Session',
      description: 'Your next tutoring session is booked.',
      due: 'Today, 16:00 - 16:30',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', mb: 6 }}>
          <School sx={{ fontSize: 64, color: 'primary.main', mb: 1 }} />
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
            Student Dashboard (Demo)
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
            Welcome back! This is a mock-data demo.
          </Typography>
          <Divider sx={{ width: '60px', mx: 'auto', mb: 1, borderColor: 'secondary.main' }} />
        </Paper>

        {/* Announcements Board */}
        <Paper elevation={4} sx={{ p: 4, mb: 6, background: `linear-gradient(90deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`, overflow: 'hidden' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
            Announcements and Instructions Today
          </Typography>
          <Grid container spacing={3} alignItems="stretch">
            {announcements.map((a, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx} sx={{ display: 'flex' }}>
                <Paper elevation={2} sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1, gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
                    <Box sx={{ mr: 1, mt: 0.5 }}>{a.icon}</Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>{a.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>{a.description}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 'auto' }}>
                    {a.time && (
                      <Typography variant="caption" sx={{ color: 'primary.main' }}><AccessTime sx={{ fontSize: 16, mr: 0.5, mb: '-2px' }} /> {a.time}</Typography>
                    )}
                    {a.due && (
                      <Typography variant="caption" sx={{ color: 'success.main', display: 'block' }}><AccessTime sx={{ fontSize: 16, mr: 0.5, mb: '-2px' }} /> {a.due}</Typography>
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
                elevation={0}
                sx={{
                  transition: 'transform 0.3s, box-shadow 0.3s, border 0.3s',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.85)}, ${alpha(theme.palette.background.elevated, 0.95)})`,
                  border: `1.5px solid ${alpha(item.color, 0.44)}`,
                  boxShadow: '0 4px 24px 0 rgba(0,0,0,0.33)',
                  backdropFilter: 'blur(3px)',
                  borderRadius: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: 5,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    background: `linear-gradient(90deg, ${item.color}, ${alpha(item.color, 0.2)})`,
                    opacity: 0.85,
                  },
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.03)',
                    boxShadow: `0 8px 36px 0 ${alpha(item.color, 0.33)}`,
                    border: `1.5px solid ${item.color}`,
                  },
                }}
                onClick={() => navigate(item.path)}
              >
                <CardContent sx={{ textAlign: 'center', flexGrow: 1, position: 'relative', zIndex: 1 }}>
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
                      backgroundColor: alpha(item.color, 0.13),
                      boxShadow: `0 2px 12px 0 ${alpha(item.color, 0.2)}`,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: item.color, mb: 1, letterSpacing: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontWeight: 400, letterSpacing: 0.1 }}>
                    {item.description}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: item.color,
                      color: theme.palette.getContrastText(item.color),
                      boxShadow: `0 2px 8px 0 ${alpha(item.color, 0.18)}`,
                      borderRadius: 3,
                      fontWeight: 600,
                      '&:hover': { backgroundColor: alpha(item.color, 0.90), boxShadow: `0 4px 16px 0 ${alpha(item.color, 0.24)}` },
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
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                3
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Available Quizzes
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: 'success.main', fontWeight: 700 }}>
                2
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Completed Quizzes
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: 'secondary.main', fontWeight: 700 }}>
                85%
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Average Score
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <StudentMascot
        bubbleMessage="Learn more by clicking me!"
        bubbleVisible={bubbleVisible}
        onBubbleClose={() => setBubbleVisible(false)}
        onClick={() => setModalOpen(true)}
      />
      <StudentMascotPopup open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
};

export default StudentDashboard2;
