import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Divider,
  Chip
} from '@mui/material';
import {
  School,
  FamilyRestroom,
  Login,
  Quiz,
  ListAlt,
  VideoLibrary,
  UploadFile,
  Receipt,
  Grading
} from '@mui/icons-material';

// Define a monochromatic blue palette
const palette = {
  light: '#E3F2FD',
  main: '#2196F3',
  dark: '#1565C0',
  accent: '#42A5F5',
  hover: '#1E88E5'
};

const features = [
  { icon: <Quiz sx={{ fontSize: 36, color: palette.main }} />, title: 'Interactive Quizzes', description: 'Take topic-based quizzes with instant feedback.' },
  { icon: <ListAlt sx={{ fontSize: 36, color: palette.accent }} />, title: 'Results & Reports', description: 'Downloadable progress reports for students and parents.' },
  { icon: <VideoLibrary sx={{ fontSize: 36, color: palette.dark }} />, title: 'Learning Materials', description: 'Curated videos and resources to support study.' },
  { icon: <UploadFile sx={{ fontSize: 36, color: palette.main }} />, title: 'File Uploads', description: 'Share assignments and important documents easily.' },
  { icon: <Receipt sx={{ fontSize: 36, color: palette.accent }} />, title: 'Invoices & Payments', description: 'View and download invoices for enrolled services.' },
  { icon: <Grading sx={{ fontSize: 36, color: palette.dark }} />, title: 'Admin Tools', description: 'Manage quizzes, approvals, and platform settings.' }
];

const roleCards = [
  { title: 'Student', description: 'Take quizzes, view results, and explore resources.', icon: <School sx={{ fontSize: 40 }} color="primary" />, role: 'student' },
  { title: 'Parent', description: "Monitor your child's progress and reports.", icon: <FamilyRestroom sx={{ fontSize: 40 }} color="primary" />, role: 'parent' }
];

const IndexPage = () => {
  const navigate = useNavigate();

  // Initialize end date once per session
  const [endDate] = useState(() => {
    const stored = localStorage.getItem('mathClinicEnd');
    if (stored) {
      return new Date(stored);
    }
    const newEnd = new Date();
    newEnd.setDate(newEnd.getDate() + 4);
    newEnd.setHours(0, 0, 0, 0);
    localStorage.setItem('mathClinicEnd', newEnd.toISOString());
    return newEnd;
  });

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  const handleDemo = (role) => navigate(`/${role}-dashboard2`);

  return (
    <Box sx={{ bgcolor: palette.light, minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero */}
        <Box sx={{ textAlign: 'center', p: { xs: 4, md: 8 }, borderRadius: 3, bgcolor: 'white', boxShadow: 4, mb: 6 }}>
          <Typography variant="h2" gutterBottom sx={{ color: palette.dark, fontWeight: 700 }}>1DILE MATH APP</Typography>
          <Typography variant="h5" sx={{ mb: 3, color: 'text.secondary' }}>Empowering Students, Parents & Admins with Next‑Gen EdTech</Typography>
          <Box sx={{ display: 'inline-flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" startIcon={<Login />} onClick={() => navigate('/login')} sx={{ bgcolor: palette.main, '&:hover': { bgcolor: palette.hover } }}>Sign In</Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/parent-signup')} sx={{ borderColor: palette.main, color: palette.main, '&:hover': { bgcolor: `${palette.main}20` } }}>Sign Up</Button>
          </Box>
        </Box>

        {/* Math Clinic Announcement & Countdown */}
        <Container maxWidth="md" sx={{ mb: 6 }}>
          <Card sx={{ p: 4, borderRadius: 3, bgcolor: palette.dark, color: 'white', boxShadow: 6, textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>June Math Clinic Registration Open Now!</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>Only <b>15 places available</b> — secure your spot today!</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                <Box key={unit} sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: palette.accent }}>{String(timeLeft[unit]).padStart(2, '0')}</Typography>
                  <Typography variant="caption" sx={{ color: 'white', textTransform: 'capitalize' }}>{unit}</Typography>
                </Box>
              ))}
            </Box>
            <Button variant="contained" size="large" sx={{ bgcolor: palette.accent, color: palette.dark, fontWeight: 700, mt: 2, px: 4, fontSize: 18, '&:hover': { bgcolor: palette.main } }} onClick={() => navigate('/parent-signup')}>Sign Up Now</Button>
          </Card>
        </Container>

        {/* Features */}
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 600, color: palette.dark }}>Our Services</Typography>
        <Grid container spacing={4} sx={{ mb: 6, py: 2 }} alignItems="stretch" justifyContent="center">
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: 'flex' }}>
              <Card sx={{ height: '100%', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 3, borderRadius: 2, textAlign: 'center', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 } }} elevation={2}>
                <Box sx={{ mb: 2 }}>{f.icon}</Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{f.title}</Typography>
                <Typography variant="body2" color="text.secondary">{f.description}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Demo Mode */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Divider sx={{ mb: 2 }}><Chip label="Try Demo Mode" sx={{ bgcolor: palette.main, color: 'white' }} /></Divider>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500, color: palette.dark }}>Explore Demo Dashboards</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Click a role below to experience the platform.</Typography>
          <Grid container spacing={3} justifyContent="center">
            {roleCards.map((r, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card onClick={() => handleDemo(r.role)} sx={{ cursor: 'pointer', borderRadius: 2, textAlign: 'center', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }} elevation={1}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 2 }}>{r.icon}</Box>
                    <Typography variant="h6" gutterBottom sx={{ color: palette.main, fontWeight: 600 }}>{r.title} (Demo)</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{r.description}</Typography>
                    <Button variant="outlined" fullWidth sx={{ borderColor: palette.main, color: palette.main, '&:hover': { bgcolor: `${palette.main}15` } }}>Access {r.title}</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 8, color: 'text.secondary' }}>
          <Typography variant="body2">&copy; {new Date().getFullYear()} 1DILE MATH APP. All rights reserved.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default IndexPage;
