/* src/pages/IndexPage.jsx */
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Typography, Container, useMediaQuery } from '@mui/material';
import Particles from 'react-tsparticles';
import { motion, useScroll, useTransform } from 'framer-motion';
import theme from '../theme';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PromoSection from './PromoSection';
import DemoSection from './DemoSection';
import DrMathMascot from './DrMathMascot';
import DrMathPopup from './DrMathPopup';

const IndexPage = () => {
  const [drMathOpen, setDrMathOpen] = useState(true);
  const [bubbleMessage, setBubbleMessage] = useState('');
  const [bubbleVisible, setBubbleVisible] = useState(false);

  // Refs for each section
  const heroRef = React.useRef(null);
  const promoRef = React.useRef(null);
  const featuresRef = React.useRef(null);
  const demoRef = React.useRef(null);

  // Section descriptions in a kiddie tone
  const sectionBubbles = [
    { ref: heroRef, message: "Hi! This is the super cool welcome area! Let's get excited for math! 🎉" },
    { ref: promoRef, message: "Whoa! Here’s a special math event just for you! Don’t miss out! 🥳" },
    { ref: featuresRef, message: "Peek here! These are all the awesome things you can do with us! ✨" },
    { ref: demoRef, message: "Try me! Play around in demo mode and see how fun math can be! 🚀" },
  ];

  // Scroll/Intersection logic
  React.useEffect(() => {
    const handleScroll = () => {
      let found = false;
      for (let section of sectionBubbles) {
        const el = section.ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.45 && rect.bottom > window.innerHeight * 0.2) {
            setBubbleMessage(section.message);
            setBubbleVisible(true);
            found = true;
            // Hide after 4s
            clearTimeout(window._drmathBubbleTimeout);
            window._drmathBubbleTimeout = setTimeout(() => setBubbleVisible(false), 4000);
            break;
          }
        }
      }
      if (!found) setBubbleVisible(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(window._drmathBubbleTimeout);
    };
  }, []);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -200]);

  // Enhanced particle system with mathematical precision
  const particlesOptions = {
    fpsLimit: 120,
    detectRetina: true,
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: {
          enable: !isMobile,
          mode: ['grab', 'bubble'],
          parallax: { enable: true, smooth: 10 }
        },
        onClick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          links: { opacity: 0.6 }
        },
        bubble: {
          distance: 200,
          size: 8,
          duration: 0.3,
          opacity: 0.8
        },
        push: {
          quantity: 4
        }
      }
    },
    particles: {
      number: {
        value: isMobile ? 50 : 100,
        density: { enable: true, area: 800 }
      },
      color: {
        value: ['#1ABC9C', '#E74C3C', '#F39C12', '#9B59B6', '#FFFFFF']
      },
      shape: {
        type: ['circle', 'triangle', 'polygon'],
        polygon: { sides: 6 }
      },
      opacity: {
        value: 0.7,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.3,
          sync: false
        }
      },
      size: {
        value: isMobile ? 4 : 6,
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 1,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: '#1ABC9C',
        opacity: 0.4,
        width: 1,
        triangles: {
          enable: true,
          opacity: 0.1
        }
      },
      move: {
        enable: true,
        speed: isMobile ? 1 : 2,
        direction: 'none',
        random: false,
        straight: false,
        outMode: 'bounce',
        bounce: true,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    }
  };

  // Track mouse for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating math symbols
  const mathSymbols = [
    '∑', '∫', '∂', '∆', '∇', '∞', 'π', 'θ', 'α', 'β', 'γ', 'λ', 'μ', 'σ', 'φ', 'ψ', 'ω',
    '√', '∛', '∜', '±', '≠', '≤', '≥', '≈', '≡', '∝', '∈', '∉', '∪', '∩', '⊂', '⊃', '⊆', '⊇',
    '∀', '∃', '∄', '∴', '∵', '⇒', '⇔', '∧', '∨', '¬', '⊕', '⊗', '⊙', '⊘', '⊚', '⊛',
    '℘', '℧', '℮', 'ℯ', 'ℰ', 'ℱ', 'ℊ', 'ℋ', 'ℌ', 'ℍ', 'ℎ', 'ℏ', 'ℐ', 'ℑ', 'ℒ', 'ℓ',
    'f(x)', 'g(x)', 'h(x)', 'x²', 'x³', 'xⁿ', 'aⁿ', 'log', 'ln', 'sin', 'cos', 'tan',
    'lim', 'max', 'min', 'sup', 'inf', 'det', 'tr', 'rank', 'dim', 'ker', 'im',
    '∂f/∂x', 'd/dx', 'dx/dt', 'dy/dx', 'f\'(x)', 'f\'\'(x)', '∇f', 'curl', 'div'
  ];

  const FloatingMathSymbol = ({ delay = 0, duration = 20, size = 60, color = '#1ABC9C' }) => {
    const symbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
    const startX = Math.random() * 100;
    const endX = startX + (Math.random() - 0.5) * 40; // Slight horizontal drift
    
    return (
      <motion.div
        initial={{ 
          y: '100vh', 
          x: `${startX}%`,
          rotate: 0, 
          opacity: 0,
          scale: 0.8
        }}
        animate={{ 
          y: '-20vh', 
          x: `${endX}%`,
          rotate: [0, 180, 360], 
          opacity: [0, 0.7, 0.7, 0],
          scale: [0.8, 1.2, 1, 0.8]
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'linear',
          rotate: {
            duration: duration * 0.8,
            ease: 'easeInOut'
          },
          scale: {
            duration: duration * 0.6,
            ease: 'easeInOut'
          }
        }}
        style={{
          position: 'absolute',
          fontSize: size,
          color: color,
          fontWeight: 'bold',
          textShadow: `0 0 ${size/4}px ${color}44`,
          filter: 'drop-shadow(0 0 8px rgba(26,188,156,0.3))',
          zIndex: 0,
          userSelect: 'none',
          pointerEvents: 'none',
          fontFamily: 'KaTeX_Math, Computer Modern, serif'
        }}
      >
        {symbol}
      </motion.div>
    );
  };

  // Floating geometric shapes (reduced quantity to make room for math symbols)
  const FloatingShape = ({ delay = 0, duration = 20, size = 60, color = '#1ABC9C' }) => (
    <motion.div
      initial={{ y: '100vh', rotate: 0, opacity: 0 }}
      animate={{ 
        y: '-100vh', 
        rotate: 360, 
        opacity: [0, 0.4, 0.4, 0] 
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear'
      }}
      style={{
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}22, ${color}44)`,
        borderRadius: Math.random() > 0.5 ? '50%' : '20%',
        backdropFilter: 'blur(1px)',
        zIndex: 0
      }}
    />
  );

  // Gradient orb that follows mouse
  const MouseOrb = () => (
    <motion.div
      animate={{
        x: mousePos.x - 200,
        y: mousePos.y - 200,
      }}
      transition={{
        type: 'spring',
        stiffness: 20,
        damping: 10
      }}
      style={{
        position: 'fixed',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,188,156,0.15) 0%, rgba(231,76,60,0.1) 50%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(40px)'
      }}
    />
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
        {/* Enhanced background with gradient mesh */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(circle at 15% 25%, rgba(0, 191, 165, 0.1) 0%, transparent 40%),
              radial-gradient(circle at 85% 75%, rgba(255, 87, 34, 0.1) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, rgba(123, 31, 162, 0.08) 0%, transparent 40%),
              linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.elevated} 100%)
            `,
            zIndex: -2,
            transition: 'background 0.5s ease-in-out',
          }}
        />

        {/* Floating math symbols */}
        {!isMobile && (
          <>
            {/* Primary math symbols */}
            <FloatingMathSymbol delay={0} duration={25} size={48} color="#1ABC9C" />
            <FloatingMathSymbol delay={2} duration={30} size={36} color="#E74C3C" />
            <FloatingMathSymbol delay={4} duration={35} size={52} color="#9B59B6" />
            <FloatingMathSymbol delay={6} duration={28} size={40} color="#F39C12" />
            <FloatingMathSymbol delay={8} duration={32} size={44} color="#3498DB" />
            <FloatingMathSymbol delay={10} duration={26} size={38} color="#E67E22" />
            <FloatingMathSymbol delay={12} duration={34} size={46} color="#1ABC9C" />
            <FloatingMathSymbol delay={14} duration={29} size={42} color="#8E44AD" />
            
            {/* Secondary wave of symbols */}
            <FloatingMathSymbol delay={16} duration={31} size={50} color="#27AE60" />
            <FloatingMathSymbol delay={18} duration={27} size={35} color="#E74C3C" />
            <FloatingMathSymbol delay={20} duration={33} size={41} color="#3498DB" />
            <FloatingMathSymbol delay={22} duration={30} size={37} color="#F39C12" />
            <FloatingMathSymbol delay={24} duration={28} size={45} color="#9B59B6" />
            <FloatingMathSymbol delay={26} duration={32} size={39} color="#1ABC9C" />
            
            {/* Tertiary wave for density */}
            <FloatingMathSymbol delay={28} duration={26} size={43} color="#E67E22" />
            <FloatingMathSymbol delay={30} duration={34} size={47} color="#27AE60" />
            <FloatingMathSymbol delay={32} duration={29} size={41} color="#8E44AD" />
            <FloatingMathSymbol delay={34} duration={31} size={38} color="#3498DB" />
          </>
        )}

        {/* Floating geometric shapes (reduced) */}
        {!isMobile && (
          <>
            <FloatingShape delay={5} duration={40} size={60} color="#1ABC9C" />
            <FloatingShape delay={15} duration={45} size={80} color="#E74C3C" />
            <FloatingShape delay={25} duration={38} size={70} color="#9B59B6" />
          </>
        )}

        {/* Mouse-following orb */}
        {!isMobile && <MouseOrb />}

        {/* Enhanced particles */}
        <Particles
          options={particlesOptions}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0
          }}
        />

        {/* Parallax container */}
        <motion.div style={{ y: parallaxY }}>
          <Container
            maxWidth={isMobile ? 'sm' : 'lg'}
            sx={{ 
              position: 'relative', 
              zIndex: 1, 
              py: isMobile ? 3 : 8, 
              px: isMobile ? 2 : 0
            }}
          >
            {/* Hero with enhanced animations */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.25, 0.25, 0.75],
                staggerChildren: 0.2
              }}
            ref={heroRef}
            >
              <HeroSection />
            </motion.div>

            {/* Promo with slide-in effect */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.25, 0.25, 0.75] 
              }}
            ref={promoRef}
            >
              <PromoSection />
            </motion.div>

            {/* Features with staggered animation */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.9, 
                ease: [0.25, 0.25, 0.25, 0.75],
                delay: 0.2 
              }}
            ref={featuresRef}
            >
              <FeaturesSection />
            </motion.div>

            {/* Demo with rotate effect */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 1, 
                ease: [0.25, 0.25, 0.25, 0.75],
                delay: 0.4 
              }}
            ref={demoRef}
            >
              <DemoSection />
            </motion.div>

            {/* Enhanced footer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Box
                component="footer"
                sx={{ 
                  textAlign: 'center', 
                  py: isMobile ? 4 : 6, 
                  mt: isMobile ? 6 : 8,
                  position: 'relative'
                }}
              >
                {/* Glowing line */}
                <Box
                  sx={{
                    width: '100px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #1ABC9C, transparent)',
                    margin: '0 auto 2rem',
                    borderRadius: '1px',
                    boxShadow: '0 0 10px rgba(26,188,156,0.5)'
                  }}
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    fontWeight: 500,
                    letterSpacing: '0.5px'
                  }}
                >
                  &copy; {new Date().getFullYear()} 1DILE MATH APP. All rights reserved.
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    mt: 1,
                    fontSize: '0.75rem',
                    opacity: 0.7
                  }}
                >
                  Empowering minds through mathematical excellence
                </Typography>
              </Box>
            </motion.div>
          </Container>
        </motion.div>
      </Box>
      <DrMathMascot 
        bubbleMessage={bubbleMessage} 
        bubbleVisible={bubbleVisible} 
        onBubbleClose={() => {
          setBubbleVisible(false);
          clearTimeout(window._drmathBubbleTimeout);
        }}
      />
      <DrMathPopup open={drMathOpen} onClose={() => setDrMathOpen(false)} />
    </ThemeProvider>
  );
};

export default IndexPage;