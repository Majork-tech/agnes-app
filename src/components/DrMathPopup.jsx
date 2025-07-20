import React from 'react';
import { Box, Modal, Typography, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DrMathImg from '../assets/DrMath.png';

export default function DrMathPopup({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="drmath-popup-title" sx={{ zIndex: 1500 }}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 6,
          boxShadow: 24,
          p: 0,
          minWidth: 380,
          maxWidth: '95vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'visible',
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12, bgcolor: 'transparent', boxShadow: 'none', zIndex: 2, '&:hover': { bgcolor: '#f0f0f0' } }}>
          <CloseIcon fontSize="large" />
        </IconButton>
        <Box sx={{ position: 'relative', mt: 4, mb: 2 }}>
          <img 
            src={DrMathImg} 
            alt="Dr. Math" 
            style={{ 
              width: 200, 
              height: 200, 
              borderRadius: '50%', 
              objectFit: 'cover', 
              boxShadow: '0 8px 32px 0 rgba(26,188,156,0.18)',
              border: '6px solid #fff',
              background: '#eafaf1',
              display: 'block',
              margin: '0 auto',
            }} 
          />
        </Box>
        <Typography id="drmath-popup-title" variant="h4" sx={{ mt: 3, fontWeight: 800, color: 'primary.main', letterSpacing: 1 }}>
          Welcome! Meet Dr. Math
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4, color: 'text.secondary', fontWeight: 500, textAlign: 'center', maxWidth: 320 }}>
          Your math journey starts here. Ask me anything or just enjoy the adventure!
        </Typography>
      </Box>
    </Modal>
  );
}
