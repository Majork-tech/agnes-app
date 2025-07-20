import React from 'react';
import { Box, Modal, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StudentMascotImg from '../assets/DrMath.png';

export default function StudentMascotPopup({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="student-mascot-popup-title" sx={{ zIndex: 1500 }}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#fff3e6',
          borderRadius: 6,
          boxShadow: 24,
          p: 0,
          minWidth: 600,
          maxWidth: 720,
          width: '95vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'visible',
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12, bgcolor: 'transparent', boxShadow: 'none', zIndex: 2, '&:hover': { bgcolor: '#ffccbc' } }}>
          <CloseIcon fontSize="large" />
        </IconButton>
        <Box sx={{ position: 'relative', mt: 4, mb: 2 }}>
          <img 
            src={StudentMascotImg} 
            alt="Student Mascot" 
            style={{ 
              width: 200, 
              height: 200, 
              borderRadius: '50%', 
              objectFit: 'cover', 
              boxShadow: '0 8px 32px 0 rgba(255,87,34,0.18)',
              border: '6px solid #fff',
              background: '#fff3e6',
              display: 'block',
              margin: '0 auto',
            }} 
          />
        </Box>
        <Typography id="student-mascot-popup-title" variant="h4" sx={{ mt: 3, fontWeight: 800, color: '#FF5722', letterSpacing: 1 }}>
          Meet Your Study Buddy!
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4, color: '#ff7043', fontWeight: 500, textAlign: 'center', maxWidth: 440 }}>
          I’m your friendly dashboard helper. Explore each section below and watch a quick video explainer to get started!
        </Typography>
        <Box sx={{ width: '100%', maxWidth: 600, mb: 4 }}>
          {[
            { title: 'Results', color: '#00BFA5' },
            { title: 'Attempt Quiz', color: '#4CAF50' },
            { title: 'Learning Material', color: '#FF5722' },
            { title: 'Tutor Direct', color: '#00695C' },
          ].map((section, idx) => (
            <Box key={section.title} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: '#fff',
              borderRadius: 3,
              px: 3,
              py: 2,
              mb: 2,
              boxShadow: '0 1px 8px 0 #ff57221a',
              borderLeft: `6px solid ${section.color}`,
              gap: 2
            }}>
              <Typography variant="h6" sx={{ color: section.color, fontWeight: 700 }}>
                {section.title}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: section.color,
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 2.5,
                  boxShadow: `0 2px 8px 0 ${section.color}44`,
                  '&:hover': { bgcolor: section.color, opacity: 0.93 }
                }}
                onClick={() => alert(`Show video for ${section.title}`)}
              >
                Watch Video
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
