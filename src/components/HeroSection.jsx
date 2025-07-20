import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container } from '@mui/material';
import { Login, PersonAdd, TrendingUp, School, Functions } from '@mui/icons-material';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  };

  const FloatingIcon = ({ icon: Icon, delay = 0, color = '#1ABC9C' }) => (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ 
        y: [-20, 20, -20], 
        opacity: [0.3, 0.7, 0.3],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      style={{
        position: 'absolute',
        color: color,
        fontSize: '2rem',
        filter: `drop-shadow(0 0 10px ${color}44)`
      }}
    >
      <Icon fontSize="inherit" />
    </motion.div>
  );

  return (
    <Box
      sx={{
        background: 'transparent',
        color: 'white',
        py: { xs: 10, md: 16 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Floating mathematical icons */}
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Box sx={{ position: 'absolute', top: '10%', left: '10%' }}>
          <FloatingIcon icon={Functions} delay={0} color="#1ABC9C" />
        </Box>
        <Box sx={{ position: 'absolute', top: '20%', right: '15%' }}>
          <FloatingIcon icon={School} delay={1} color="#E74C3C" />
        </Box>
        <Box sx={{ position: 'absolute', bottom: '30%', left: '15%' }}>
          <FloatingIcon icon={TrendingUp} delay={2} color="#9B59B6" />
        </Box>
        <Box sx={{ position: 'absolute', bottom: '40%', right: '10%' }}>
          <FloatingIcon icon={Functions} delay={3} color="#F39C12" />
        </Box>
      </Box>

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title */}
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 900,
                mb: 2,
                textShadow: '0 0 40px rgba(26, 188, 156, 0.4)',
                letterSpacing: '-0.02em'
              }}
            >
              1DILE MATH APP
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 3,
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #B0C4DE 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.4
              }}
            >
              Empowering Students, Parents & Admins with Next‑Gen EdTech
            </Typography>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 6,
                color: 'text.secondary',
                fontWeight: 400,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Transform mathematical learning with our comprehensive platform featuring 
              interactive lessons, real-time progress tracking, and personalized learning paths.
            </Typography>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants}>
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 3, 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<Login />}
                  onClick={() => navigate('/login')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #1ABC9C 0%, #16A085 100%)',
                    boxShadow: '0 6px 20px rgba(26, 188, 156, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: 'left 0.6s',
                    },
                    '&:hover': {
                      background: 'linear-gradient(135deg, #48D1CC 0%, #1ABC9C 100%)',
                      boxShadow: '0 8px 25px rgba(26, 188, 156, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                    '&:hover:before': {
                      left: '100%',
                    },
                  }}
                >
                  Sign In
                </Button>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  startIcon={<PersonAdd />}
                  onClick={() => navigate('/parent-signup')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    borderWidth: 2,
                    color: '#E74C3C',
                    borderColor: '#E74C3C',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(231, 76, 60, 0.1), transparent)',
                      transition: 'left 0.6s',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(231, 76, 60, 0.2)',
                      borderColor: '#FF6B6B',
                      color: '#FF6B6B',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(231, 76, 60, 0.3)',
                    },
                    '&:hover:before': {
                      left: '100%',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </motion.div>
            </Box>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div variants={itemVariants}>
            <Box 
              sx={{ 
                mt: 8,
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 4,
                opacity: 0.8
              }}
            >
              {[
                { icon: Functions, text: 'Interactive Math' },
                { icon: TrendingUp, text: 'Progress Tracking' },
                { icon: School, text: 'Personalized Learning' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5 + index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(26, 188, 156, 0.1)',
                        border: '1px solid rgba(26, 188, 156, 0.3)',
                      }
                    }}
                  >
                    <feature.icon sx={{ color: '#1ABC9C', fontSize: '1.2rem' }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {feature.text}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;