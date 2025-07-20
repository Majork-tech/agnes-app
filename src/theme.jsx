/* src/theme.js */
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Ultra-dark theme with premium feel and stunning visual hierarchy
let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00BFA5',  // Darker electric teal
      light: '#1DE9B6',
      dark: '#00695C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF5722',  // Darker vibrant orange-red
      light: '#FF8A65',
      dark: '#D84315',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#7B1FA2',  // Deeper royal purple
      light: '#9C27B0',
      dark: '#4A148C',
    },
    warning: {
      main: '#FF9800',  // Darker orange
      light: '#FFB74D',
      dark: '#F57C00',
    },
    info: {
      main: '#2196F3',  // Deeper blue
      light: '#42A5F5',
      dark: '#1976D2',
    },
    background: {
      default: '#000000',         // Pure black
      paper: '#0A0A0A',          // Almost black
      elevated: '#111111',        // Very dark gray
      glass: '#0F0F0F',          // Dark glass effect
    },
    text: {
      primary: '#FFFFFF',         // Pure white for maximum contrast
      secondary: '#B0BEC5',       // Light blue-gray for secondary text
      disabled: '#424242',        // Dark gray for disabled
      hint: '#616161',            // Medium gray for hints
    },
    divider: 'rgba(255, 255, 255, 0.08)',
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    error: {
      main: '#F44336',
      light: '#EF5350',
      dark: '#D32F2F',
    },
    surface: {
      main: '#0D0D0D',
      light: '#1A1A1A',
      dark: '#050505',
    },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '4rem',
      fontWeight: 900,
      letterSpacing: '-0.025em',
      lineHeight: 1.1,
      background: 'linear-gradient(135deg, #FFFFFF 0%, #00BFA5 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 0 30px rgba(0, 191, 165, 0.3)',
    },
    h2: {
      fontSize: '3.25rem',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      lineHeight: 1.15,
      background: 'linear-gradient(135deg, #FFFFFF 0%, #FF5722 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.015em',
      lineHeight: 1.2,
      color: '#FFFFFF',
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#FFFFFF',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      color: '#B0BEC5',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#B0BEC5',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#FFFFFF',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: '#B0BEC5',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.95rem',
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.75rem',
      color: '#616161',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: '#00BFA5',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.8)',
    '0 2px 6px rgba(0, 0, 0, 0.85)',
    '0 4px 12px rgba(0, 0, 0, 0.9)',
    '0 6px 18px rgba(0, 0, 0, 0.95)',
    '0 8px 24px rgba(0, 0, 0, 0.95)',
    '0 12px 32px rgba(0, 0, 0, 0.95)',
    '0 16px 40px rgba(0, 0, 0, 0.95)',
    '0 20px 48px rgba(0, 0, 0, 0.95)',
    '0 24px 56px rgba(0, 0, 0, 0.95)',
    // Enhanced glowing shadows for dark theme
    '0 0 20px rgba(0, 191, 165, 0.4), 0 8px 32px rgba(0, 0, 0, 0.9)',
    '0 0 25px rgba(255, 87, 34, 0.4), 0 12px 40px rgba(0, 0, 0, 0.9)',
    '0 0 30px rgba(123, 31, 162, 0.4), 0 16px 48px rgba(0, 0, 0, 0.9)',
    '0 0 35px rgba(255, 152, 0, 0.4), 0 20px 56px rgba(0, 0, 0, 0.9)',
    '0 0 40px rgba(33, 150, 243, 0.4), 0 24px 64px rgba(0, 0, 0, 0.9)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          padding: '14px 36px',
          fontSize: '0.95rem',
          fontWeight: 600,
          textTransform: 'none',
          letterSpacing: '0.02em',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            transition: 'left 0.6s',
          },
          '&:hover:before': {
            left: '100%',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 191, 165, 0.4)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #00BFA5 0%, #00695C 100%)',
          boxShadow: '0 4px 15px rgba(0, 191, 165, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1DE9B6 0%, #00BFA5 100%)',
            boxShadow: '0 6px 20px rgba(0, 191, 165, 0.4)',
          },
        },
        outlined: {
          borderColor: '#00BFA5',
          color: '#00BFA5',
          backgroundColor: 'rgba(0, 191, 165, 0.05)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(0, 191, 165, 0.1)',
            borderColor: '#1DE9B6',
            color: '#1DE9B6',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'rgba(13, 13, 13, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
          overflow: 'visible',
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0, 191, 165, 0.05) 0%, rgba(255, 87, 34, 0.05) 100%)',
            borderRadius: 20,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.9)',
            border: '1px solid rgba(0, 191, 165, 0.2)',
            '&:before': {
              opacity: 1,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 1px 8px rgba(0, 0, 0, 0.8)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(13, 13, 13, 0.8)',
            backdropFilter: 'blur(10px)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 191, 165, 0.6)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00BFA5',
              boxShadow: '0 0 0 2px rgba(0, 191, 165, 0.2)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#B0BEC5',
          },
          '& .MuiInputBase-input': {
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 191, 165, 0.1)',
          color: '#00BFA5',
          border: '1px solid rgba(0, 191, 165, 0.3)',
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(0, 191, 165, 0.2)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.08)',
          '&.MuiDivider-light': {
            borderColor: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: 'rgba(13, 13, 13, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 191, 165, 0.1)',
            border: '1px solid rgba(0, 191, 165, 0.3)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.95rem',
          color: '#B0BEC5',
          '&.Mui-selected': {
            color: '#00BFA5',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(13, 13, 13, 0.8)',
          borderRadius: 12,
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
        indicator: {
          backgroundColor: '#00BFA5',
          height: 3,
          borderRadius: '3px 3px 0 0',
          boxShadow: '0 0 8px rgba(0, 191, 165, 0.4)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 191, 165, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 191, 165, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(0, 191, 165, 0.2)',
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 191, 165, 0.1)',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(13, 13, 13, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
          fontSize: '0.75rem',
        },
      },
    },
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});

// Enable responsive font sizing with custom breakpoints
theme = responsiveFontSizes(theme, {
  breakpoints: ['sm', 'md', 'lg'],
  disableAlign: false,
  factor: 2,
  variants: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline'],
});

export default theme;