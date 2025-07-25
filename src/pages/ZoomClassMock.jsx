import React from 'react';
import { Card, Typography, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowBack, VideoCall } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';



const ZoomClassMock = () => {
  const location = useLocation();
  // If coming from parent chat, go back to parent chat, else default to student chat
  const backTo = location.state && location.state.fromParent ? '/tutor-direct-parent-mock' : '/tutor-direct-mock';

  const theme = useTheme();
  return (
    <Box sx={{
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      p: 4
    }}>
      <Card sx={{ maxWidth: 600, p: 4, boxShadow: 3, borderRadius: 3, mx: 'auto' }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 800, color: theme.palette.primary.main, mb: 2, letterSpacing: 1 }}>
          1DILE MATH APP
        </Typography>
        <Typography variant="h5" align="center" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 3 }}>
          Zoom Class Details
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ color: theme.palette.primary.main, mb: 1 }}>
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
    </Box>
  );
};

export default ZoomClassMock; 