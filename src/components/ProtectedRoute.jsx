import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, userRole, loading, user, profile } = useAuth();
  const location = useLocation();

  // Debug log for authentication and profile state
  console.log('ProtectedRoute debug:', { user, profile, loading, isAuthenticated, userRole });

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 2
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is required and user doesn't have the required role
  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on user's actual role
    switch (userRole) {
      case 'admin':
        return <Navigate to="/admindashboard" replace />;
      case 'student':
        return <Navigate to="/student-dashboard" replace />;
      case 'parent':
        return <Navigate to="/parent-dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 