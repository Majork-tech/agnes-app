import React from 'react';
import DrMathImg from '../assets/DrMath.png';
import DrMathSpeechBubble from './DrMathSpeechBubble';

export default function DrMathMascot({ onClick, bubbleMessage, bubbleVisible, onBubbleClose }) {
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
      <div
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
      </div>
    </div>
  );
}
