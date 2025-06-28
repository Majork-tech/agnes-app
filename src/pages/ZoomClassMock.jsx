import React from 'react';
import { Container, Card, Typography, Box, Button } from '@mui/material';
import { ArrowBack, VideoCall } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const palette = {
  bg: '#F7FAFC',
  card: '#FFFFFF',
  primary: '#1976D2',
  accent: '#FFB300',
  text: '#37474F',
};

const ZoomClassMock = () => {
  const location = useLocation();
  // If coming from parent chat, go back to parent chat, else default to student chat
  const backTo = location.state && location.state.fromParent ? '/tutor-direct-parent-mock' : '/tutor-direct-mock';

  return (
    <Box sx={{ backgroundColor: palette.bg, minHeight: '100vh', py: 6 }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 4, boxShadow: 3, borderRadius: 3 }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 800, color: palette.primary, mb: 2, letterSpacing: 1 }}>
            1DILE MATH APP
          </Typography>
          <Typography variant="h5" align="center" sx={{ fontWeight: 700, color: palette.text, mb: 3 }}>
            Zoom Class Details
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: palette.primary, mb: 1 }}>
              Topic: Live Math Support Session
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Time: Today, 3:00 PM - 4:00 PM
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Meeting ID: 123 4567 8901
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Passcode: 1DILE
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Host: Tutor Jane
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<VideoCall />}
              sx={{ px: 4, fontSize: 18 }}
              onClick={() => alert('This would open the Zoom meeting in a real app.')}
            >
              Join Meeting
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ArrowBack />}
              component={RouterLink}
              to={backTo}
              sx={{ fontSize: 16 }}
            >
              Back
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default ZoomClassMock; 