import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  Collapse,
  alpha,
  Divider,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  Quiz,
  Visibility,
  Grading,
  ListAlt,
  VideoLibrary,
  UploadFile,
  People,
  Receipt,
  Person,
  Settings,
  ExitToApp,
  Dashboard,
  NotificationsActive
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ user }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const profileOpen = Boolean(anchorEl);
  const { signOut } = useAuth();

  const menuItems = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: <Dashboard />,
      category: 'main',
      gradient: 'linear-gradient(135deg, #00BFA5 0%, #00695C 100%)'
    },
    { 
      path: '/create-quizzes', 
      label: 'Create Quizzes', 
      icon: <Quiz />,
      category: 'quiz',
      gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)'
    },
    { 
      path: '/view-quizzes', 
      label: 'Test Quizzes', 
      icon: <Quiz />,
      category: 'quiz',
      gradient: 'linear-gradient(135deg, #7B1FA2 0%, #4A148C 100%)'
    },
    { 
      path: '/view-submissions', 
      label: 'View Submissions', 
      icon: <Visibility />,
      category: 'assessment',
      gradient: 'linear-gradient(135deg, #FF5722 0%, #D84315 100%)'
    },
    { 
      path: '/grade-results', 
      label: 'Grade Results', 
      icon: <Grading />,
      category: 'assessment',
      gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)'
    },
    { 
      path: '/view-results-student2', 
      label: 'View Results', 
      icon: <ListAlt />,
      category: 'assessment',
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)'
    },
    { 
      path: '/upload-videos', 
      label: 'Upload Videos', 
      icon: <VideoLibrary />,
      category: 'content',
      gradient: 'linear-gradient(135deg, #FF5722 0%, #D84315 100%)'
    },
    { 
      path: '/student-uploads', 
      label: 'Student Uploads', 
      icon: <UploadFile />,
      category: 'content',
      gradient: 'linear-gradient(135deg, #7B1FA2 0%, #4A148C 100%)'
    },
    { 
      path: '/view-uploads', 
      label: 'View Uploads', 
      icon: <People />,
      category: 'content',
      gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)'
    },
    { 
      path: '/register-student', 
      label: 'Register Student', 
      icon: <People />,
      category: 'management',
      gradient: 'linear-gradient(135deg, #00BFA5 0%, #00695C 100%)'
    },
    { 
      path: '/invoices', 
      label: 'Invoices', 
      icon: <Receipt />,
      category: 'management',
      gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)'
    },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleCollapseToggle = () => setIsCollapsed(!isCollapsed);
  const handleProfileMenu = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuItemClick = async (item) => {
    if (item.path === '/logout') {
      await signOut();
      navigate('/login');
    } else {
      navigate(item.path);
      if (isMobile) {
        handleDrawerToggle();
      }
    }
  };

  const drawerWidth = isCollapsed ? 80 : 280;
  const showCollapseButton = !isMobile;

  const drawerContent = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.98) 0%, rgba(13, 13, 13, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        zIndex: -1,
      }
    }}>
      {/* Header Section */}
      <Box sx={{
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 191, 165, 0.5), transparent)',
        }
      }}>
        <Tooltip title={isCollapsed ? user?.name || 'Admin User' : ''} placement="right">
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            overflow: 'hidden',
            cursor: 'pointer',
            '&:hover': {
              '& .user-avatar': {
                transform: 'scale(1.1)',
                                    boxShadow: '0 0 20px rgba(0, 191, 165, 0.4)',
              }
            }
          }}>
            <Avatar 
              className="user-avatar"
              sx={{
                width: 44,
                height: 44,
                background: 'linear-gradient(135deg, #1ABC9C 0%, #16A085 100%)',
                mr: isCollapsed ? 0 : 1.5,
                border: '2px solid rgba(26, 188, 156, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontSize: '1.2rem',
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(26, 188, 156, 0.2)',
              }}
            >
              {user?.name?.[0] || <Person />}
            </Avatar>
            <Collapse in={!isCollapsed} orientation="horizontal">
              <Box sx={{ minWidth: 0 }}>
                <Typography 
                  variant="subtitle1" 
                  noWrap 
                  sx={{ 
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    fontSize: '0.95rem',
                    mb: 0.5
                  }}
                >
                  {user?.name || 'Admin User'}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  noWrap
                  sx={{ 
                    fontSize: '0.75rem',
                    opacity: 0.8
                  }}
                >
                  {user?.email || 'admin@example.com'}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        </Tooltip>
        
        {showCollapseButton && (
          <Tooltip title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} placement="right">
            <IconButton 
              onClick={handleCollapseToggle} 
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Navigation Items */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <List component="nav" sx={{ px: isCollapsed ? 1 : 2, py: 2 }}>
          {menuItems.map((item, index) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <Tooltip title={isCollapsed ? item.label : ''} placement="right">
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => handleMenuItemClick(item)}
                  sx={{
                    borderRadius: 2,
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    px: isCollapsed ? 1.5 : 2,
                    py: 1.5,
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 48,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: alpha(theme.palette.background.paper, 0.05),
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      transition: 'all 0.3s ease',
                    },
                    '&.Mui-selected': {
                      '&:before': {
                        background: item.gradient,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                        boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                      },
                      color: theme.palette.primary.contrastText,
                      '&:hover': {
                        '&:before': {
                          transform: 'scale(1.02)',
                        },
                      },
                    },
                    '&:hover': {
                      transform: 'translateX(4px)',
                      '&:before': {
                        background: alpha(theme.palette.primary.main, 0.1),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{
                    minWidth: 0,
                    color: 'inherit',
                    mr: isCollapsed ? 0 : 2,
                    position: 'relative',
                    zIndex: 1,
                    '& svg': {
                      fontSize: '1.3rem',
                      transition: 'transform 0.2s ease',
                    },
                    '&:hover svg': {
                      transform: 'scale(1.1)',
                    }
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <Collapse in={!isCollapsed} orientation="horizontal">
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ 
                        variant: 'body2', 
                        fontWeight: 600,
                        sx: { 
                          position: 'relative', 
                          zIndex: 1,
                          fontSize: '0.9rem'
                        }
                      }}
                    />
                  </Collapse>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer Section */}
      <Box sx={{ 
        p: 2, 
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 87, 34, 0.5), transparent)',
        }
      }}>
        <Tooltip title={isCollapsed ? 'Logout' : ''} placement="right">
          <ListItemButton
            onClick={() => handleMenuItemClick({ path: '/logout' })}
            sx={{
              borderRadius: 2,
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              px: isCollapsed ? 1.5 : 2,
              py: 1.5,
              position: 'relative',
              overflow: 'hidden',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: alpha(theme.palette.error.main, 0.1),
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                transition: 'all 0.3s ease',
              },
              '&:hover': {
                '&:before': {
                  background: alpha(theme.palette.error.main, 0.2),
                  border: `1px solid ${alpha(theme.palette.error.main, 0.4)}`,
                },
              },
            }}
          >
            <ListItemIcon sx={{
              minWidth: 0,
              color: theme.palette.error.main,
              mr: isCollapsed ? 0 : 2,
              position: 'relative',
              zIndex: 1,
            }}>
              <ExitToApp />
            </ListItemIcon>
            <Collapse in={!isCollapsed} orientation="horizontal">
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ 
                  variant: 'body2', 
                  fontWeight: 600,
                  color: theme.palette.error.main,
                  sx: { position: 'relative', zIndex: 1 }
                }}
              />
            </Collapse>
          </ListItemButton>
        </Tooltip>
      </Box>

      {/* Mobile Close Button */}
      {isMobile && (
        <Box sx={{ 
          p: 2, 
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <IconButton 
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            <ChevronLeft />
          </IconButton>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{ 
            position: 'fixed',
            left: 16,
            top: 16,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Responsive Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
            border: 'none',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;