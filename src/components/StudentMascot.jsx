import React from 'react';
import StudentMascotImg from '../assets/DrMath.png';
import StudentSpeechBubble from './StudentSpeechBubble';
import { motion } from 'framer-motion';

export default function StudentMascot({ onClick, bubbleMessage, bubbleVisible, onBubbleClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <div style={{ marginRight: 18 }}>
        <StudentSpeechBubble message={bubbleMessage} visible={bubbleVisible} onClose={onBubbleClose} />
      </div>
      <motion.div
        onClick={onClick}
        style={{
          cursor: 'pointer',
          width: 160,
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          borderRadius: 0,
          boxShadow: 'none',
          padding: 0,
        }}
        title="Meet your Study Buddy!"
        animate={{
          scale: [1, 1.09, 1],
          boxShadow: [
            '0 0 0px #FF572244',
            '0 0 24px #FF572299',
            '0 0 0px #FF572244'
          ]
        }}
        transition={{
          duration: 1.3,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        <img
          src={StudentMascotImg}
          alt="Student Mascot"
          style={{
            width: 160,
            height: 160,
            objectFit: 'contain',
            background: 'none',
            border: 'none',
            borderRadius: 0,
            boxShadow: 'none',
            padding: 0,
          }}
        />
      </motion.div>
    </div>
  );
}
