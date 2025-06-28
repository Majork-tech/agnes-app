import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  School,
  AdminPanelSettings,
  FamilyRestroom,
  LockOpen
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Blue-themed palette
const palette = {
  bgGradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
  cardBg: '#FFFFFF',
  primary: '#1976D2',
  hover: '#1565C0',
  mutedText: '#607D8B'
};

const roles = [
  { value: 'student', label: 'Student', icon: <School /> },
  { value: 'admin', label: 'Admin', icon: <AdminPanelSettings /> },
  { value: 'parent', label: 'Parent', icon: <FamilyRestroom /> }
];

const Login = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signIn, loading, userRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && userRole && role) {
      if (userRole !== role) {
        setError('Not authorized for this role');
        return;
      }
      navigate(`/${role}-dashboard2`);
    }
  }, [isAuthenticated, userRole, role, navigate]);

  const handleRoleChange = (e, newRole) => {
    if (newRole) setRole(newRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await signIn({ email, password });
    if (error) setError(error.message || 'Login failed');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: palette.bgGradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          backgroundColor: palette.cardBg
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <LockOpen sx={{ fontSize: 48, color: palette.primary }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
            Login
          </Typography>
          <Typography variant="body2" sx={{ color: palette.mutedText }}>
            Choose your role and sign in
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={handleRoleChange}
          fullWidth
          sx={{ mb: 3 }}
        >
          {roles.map((r) => (
            <ToggleButton
              key={r.value}
              value={r.value}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                color: role === r.value ? palette.cardBg : palette.primary,
                bgcolor: role === r.value ? palette.primary : 'transparent',
                '&:hover': { bgcolor: role === r.value ? palette.hover : `${palette.primary}10` }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {r.icon}
                {r.label}
              </Box>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {role && (
          <>
            <Box component="form" onSubmit={handleSubmit}>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
                disabled={loading}
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                sx={{ mb: 3 }}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((s) => !s)}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  backgroundColor: palette.primary,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: palette.hover }
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : `Login as ${roles.find(r => r.value === role).label}`}
              </Button>
            </Box>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: palette.mutedText }}>
                Don't have an account?{' '}
                <Button
                  variant="text"
                  size="small"
                  sx={{ color: palette.primary, textTransform: 'none', fontWeight: 600, p: 0, minWidth: 0 }}
                  href="/parent-signup"
                  component="a"
                >
                  Sign up here
                </Button>
              </Typography>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Login;
