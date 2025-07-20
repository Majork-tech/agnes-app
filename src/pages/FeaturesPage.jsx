import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import FeaturesSection from '../components/FeaturesSection';

const FeaturesPage = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg" sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 4,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Typography variant="h2" align="center" sx={{ mb: 6, fontWeight: 800, color: 'white' }}>
          Our Features
        </Typography>
        <FeaturesSection />
      </Container>
    </Box>
  );
};

export default FeaturesPage;