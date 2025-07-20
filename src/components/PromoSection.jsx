import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { EventAvailable } from '@mui/icons-material';

const PromoSection = () => {
  const navigate = useNavigate();
  const [endDate] = useState(() => {
    const stored = localStorage.getItem('mathClinicEnd');
    if (stored) return new Date(stored);
    const newEnd = new Date();
    newEnd.setDate(newEnd.getDate() + 4);
    newEnd.setHours(0, 0, 0, 0);
    localStorage.setItem('mathClinicEnd', newEnd.toISOString());
    return newEnd;
  });

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
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <Box sx={{
      py: { xs: 8, md: 12 },
      background: 'transparent',
      color: 'white',
      textAlign: 'center'
    }}>
      <Container maxWidth="md">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Paper sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <motion.div variants={itemVariants}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, background: 'linear-gradient(135deg, #E0E0E0 0%, #FFFFFF 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Enrollment for 3rd and 4th Terms
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary', fontWeight: 400 }}>
                Only <b>15 places available</b> — secure your spot today!
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: { xs: 2, md: 4 }, flexWrap: 'wrap', mb: 4 }}>
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <Box key={unit} sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, color: '#1ABC9C' }}>
                      {String(value).padStart(2, '0')}
                    </Typography>
                    <Typography variant="overline" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                      {unit}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<EventAvailable />}
                  onClick={() => navigate('/parent-signup')}
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #1ABC9C 0%, #16A085 100%)',
                    boxShadow: '0 6px 20px rgba(26, 188, 156, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 25px rgba(26, 188, 156, 0.6)'
                    }
                  }}
                >
                  Sign Up Now
                </Button>
              </motion.div>
              
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PromoSection;