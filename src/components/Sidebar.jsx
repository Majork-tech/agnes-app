import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useTheme,
  styled,
  IconButton,
  Collapse // Add this import
} from '@mui/material';
import {
  Quiz,
  Visibility,
  Grading,
  ListAlt,
  VideoLibrary,
  Upload,
  People,
  Receipt,
  ExitToApp,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem('sidebarCollapsed') === 'true'
  );
  const collapsedWidth = 64;
  const expandedWidth = 240;

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed);
  }, [isCollapsed]);
  
 

  const menuItems = [
    { path: '/create-quizzes', label: 'Create Quizzes', icon: <Quiz /> },
    { path: '/view-submissions', label: 'View Submissions', icon: <Visibility /> },
    { path: '/grade-results', label: 'Grade Results', icon: <Grading /> },
    { path: '/view-results', label: 'View Results', icon: <ListAlt /> },
    { path: '/upload-videos', label: 'Upload Videos', icon: <VideoLibrary /> },
    { path: '/student-uploads', label: 'Student Uploads', icon: <Upload /> },
    { path: '/view-uploads', label: 'View Uploads', icon: <People /> },
    { path: '/register-student', label: 'Register Student', icon: <People /> },
    { path: '/invoices', label: 'Invoices', icon: <Receipt /> }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? collapsedWidth : expandedWidth,
        flexShrink: 0,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        '& .MuiDrawer-paper': {
          width: isCollapsed ? collapsedWidth : expandedWidth,
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`
        }
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Collapse in={!isCollapsed} orientation="horizontal">
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Collapse>
        <IconButton 
          onClick={() => setIsCollapsed(!isCollapsed)}
          size="small"
          sx={{ ml: 'auto' }}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      <List component="nav" sx={{ p: 1 }}>
        {menuItems.map((item) => (
          <ListItem 
            key={item.path}
            disablePadding
            component={NavLink}
            to={item.path}
            sx={{
              textDecoration: 'none',
              color: theme.palette.text.primary,
              '&.active': {
                backgroundColor: theme.palette.action.selected,
              }
            }}
          >
            <ListItemButton
              selected={location.pathname === item.path}
              sx={{
                px: 2,
                justifyContent: isCollapsed ? 'center' : 'flex-start'
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  color: location.pathname === item.path 
                    ? theme.palette.primary.main 
                    : 'inherit',
                  mr: isCollapsed ? 0 : 2
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Collapse in={!isCollapsed} orientation="horizontal">
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: location.pathname === item.path ? 600 : 400
                  }}
                />
              </Collapse>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ 
        mt: 'auto', 
        borderTop: `1px solid ${theme.palette.divider}`,
        p: 1
      }}>
        <ListItem 
          disablePadding
          component={NavLink}
          to="/logout"
          sx={{
            textDecoration: 'none',
            color: theme.palette.error.main
          }}
        >
          <ListItemButton sx={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
            <ListItemIcon sx={{ minWidth: 0, mr: isCollapsed ? 0 : 2 }}>
              <ExitToApp />
            </ListItemIcon>
            <Collapse in={!isCollapsed} orientation="horizontal">
              <ListItemText 
                primary="Logout"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </Collapse>
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;