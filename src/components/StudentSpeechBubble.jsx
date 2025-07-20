import React from 'react';
import { Paper, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function StudentSpeechBubble({ message, visible, onClose }) {
  if (!visible) return null;
  return (
    <Paper
      elevation={8}
      sx={{
        minWidth: 220,
        bgcolor: '#fff3e6',
        color: '#222',
        borderRadius: 3,
        p: 2.2,
        boxShadow: '0 2px 16px 0 rgba(255,87,34,0.13)',
        fontSize: '1.08rem',
        fontFamily: 'Comic Sans MS, Comic Sans, cursive',
        border: '2px solid #ffab91',
        zIndex: 2100,
        maxWidth: 320,
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          right: -28,
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderTop: '18px solid transparent',
          borderBottom: '18px solid transparent',
          borderLeft: '28px solid #fff3e6',
          filter: 'drop-shadow(2px 0 2px #ffab9133)'
        }
      }}
    >
      <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', top: 4, right: 4, color: '#ff5722', bgcolor: 'transparent', '&:hover': { bgcolor: '#ffccbc' } }}>
        <CloseIcon fontSize="small" />
      </IconButton>
      <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1.1rem', mb: 0, textAlign: 'center', color: '#222' }}>
        {message}
      </Typography>
    </Paper>
  );
}
