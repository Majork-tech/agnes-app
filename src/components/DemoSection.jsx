import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, CardContent, Grid, Container, Divider, Chip } from '@mui/material';
import { School, FamilyRestroom } from '@mui/icons-material';
import AnimatedCard from './AnimatedCard';

const roleCards = [
  { title: 'Student', description: 'Take quizzes, view results, and explore resources.', icon: <School sx={{ fontSize: 40, color: 'primary.main' }} />, role: 'student' },
  { title: 'Parent', description: "Monitor your child's progress and reports.", icon: <FamilyRestroom sx={{ fontSize: 40, color: 'primary.main' }} />, role: 'parent' }
];

const DemoSection = () => {
  const navigate = useNavigate();

  const handleDemo = (role) => navigate(`/${role}-dashboard2`);

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Divider sx={{ mb: 6, '&::before, &::after': { borderColor: 'rgba(255, 255, 255, 0.2)' } }}>
          <Chip label="Try Demo Mode" sx={{
            color: 'white',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }} />
        </Divider>
        <Typography variant="h4" align="center" sx={{ mb: 1, fontWeight: 700, color: 'white' }}>
          Explore Demo Dashboards
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 6 }}>
          Click a role below to experience the platform.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {roleCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <AnimatedCard
                onClick={() => handleDemo(card.role)}
                sx={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>{card.icon}</Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {card.title} (Demo)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                    {card.description}
                  </Typography>
                  <Button variant="outlined" fullWidth sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)', '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                    Access {card.title}
                  </Button>
                </CardContent>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default DemoSection;