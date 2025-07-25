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
    // If user is already authenticated and has a role, redirect to appropriate dashboard
    if (isAuthenticated && userRole) {
      console.log('User authenticated with role:', userRole);
      switch (userRole) {
        case 'admin':
          navigate('/admindashboard');
          break;
        case 'student':
          navigate('/student-dashboard');
          break;
        case 'parent':
          navigate('/parent-dashboard');
          break;
        default:
          navigate('/');
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleRoleChange = (e, newRole) => {
    if (newRole) setRole(newRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!role) {
      setError('Please select a role');
      return;
    }
    
    const { error } = await signIn({ email, password });
    if (error) {
      setError(error.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
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
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <LockOpen sx={{ fontSize: 48, color: 'text.primary' }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
            Login
          </Typography>
          <Typography variant="body1" color="text.secondary">
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
                color: role === r.value ? 'primary.contrastText' : 'text.primary',
                bgcolor: role === r.value ? 'primary.main' : 'transparent',
                '&:hover': { bgcolor: role === r.value ? 'primary.dark' : 'action.hover' }
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
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : `Login as ${roles.find(r => r.value === role)?.label}`}
              </Button>
            </Box>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Don't have an account?{' '}
                <Button
                  variant="text"
                  size="small"
                  sx={{ p: 0, minWidth: 0, color: 'secondary.main' }}
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
