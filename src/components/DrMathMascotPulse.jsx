import React from 'react';
import DrMathImg from '../assets/DrMath.png';
import DrMathSpeechBubble from './DrMathSpeechBubble';
import { motion } from 'framer-motion';

export default function DrMathMascotPulse({ onClick, bubbleMessage, bubbleVisible, onBubbleClose }) {
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
        <DrMathSpeechBubble message={bubbleMessage} visible={bubbleVisible} onClose={onBubbleClose} />
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
        className="drmath-mascot-sticky"
        title="Chat with Dr. Math!"
        animate={{
          scale: [1, 1.09, 1],
          boxShadow: [
            '0 0 0px #00BFA544',
            '0 0 24px #00BFA599',
            '0 0 0px #00BFA544'
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
          src={DrMathImg}
          alt="Dr. Math Mascot"
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
