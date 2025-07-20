import React from 'react';
import { Box, Typography, CardContent, Grid, Container } from '@mui/material';
import { Quiz, ListAlt, VideoLibrary, UploadFile, Receipt, Grading } from '@mui/icons-material';
import AnimatedCard from './AnimatedCard';

const features = [
  { icon: <Quiz sx={{ fontSize: 40, color: 'primary.main' }} />, title: 'Interactive Quizzes', description: 'Take topic-based quizzes with instant feedback.' },
  { icon: <ListAlt sx={{ fontSize: 40, color: 'primary.main' }} />, title: 'Results & Reports', description: 'Downloadable progress reports for students and parents.' },
  { icon: <VideoLibrary sx={{ fontSize: 40, color: 'primary.main' }} />, title: 'Learning Materials', description: 'Curated videos and resources to support study.' },
  { icon: <UploadFile sx={{ fontSize: 40, color: 'primary.main' }} />, title: 'File Uploads', description: 'Share assignments and important documents easily.' },
  { icon: <Receipt sx={{ fontSize: 40, color: 'primary.main' }} />, title: 'Invoices & Payments', description: 'View and download invoices for enrolled services.' },
  { icon: <Grading sx={{ fontSize: 40, color: 'primary.main' }} />, title: 'Admin Tools', description: 'Manage quizzes, approvals, and platform settings.' }
];

const FeaturesSection = () => {
  return (
    <Box>
      <Grid container spacing={4} alignItems="stretch" justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <AnimatedCard
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: 3,
                textAlign: 'center',
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
              <Box sx={{ mb: 2 }}>{feature.icon}</Box>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </AnimatedCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesSection;