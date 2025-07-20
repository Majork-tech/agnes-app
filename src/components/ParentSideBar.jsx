import React, { useState } from 'react';
import StudentMascot from './StudentMascot';
import StudentMascotPopup from './StudentMascotPopup';
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
  useMediaQuery,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  Visibility,
  Receipt,
  ExitToApp,
  Person,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const ParentSidebar = ({ user }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { signOut } = useAuth();

  // Navigation items for the parent
  const menuItems = [
    { path: '/view-invoices', label: 'Invoices', icon: <Receipt /> },
    { path: '/view-child-results', label: 'Reports', icon: <Visibility /> },
    { path: '/tutor-direct-parent-mock', label: 'Tutor Direct', icon: <Person /> },
    { path: '/logout', label: 'Logout', icon: <ExitToApp /> },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleCollapseToggle = () => setIsCollapsed(!isCollapsed);

  const handleMenuItemClick = async (item) => {
    if (item.path === '/logout') {
      await signOut();
      navigate('/');
    } else {
      navigate(item.path);
      if (isMobile) {
        handleDrawerToggle();
      }
    }
  };

  const drawerWidth = isCollapsed ? 64 : 240;
  const showCollapseButton = !isMobile;

  const drawerContent = (
    <>
      {/* User Profile Section */}
      <Box
        sx={{
          p: isCollapsed ? 1 : 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Avatar
          sx={{
            width: isCollapsed ? 40 : 56,
            height: isCollapsed ? 40 : 56,
            bgcolor: theme.palette.primary.main,
            mb: isCollapsed ? 0 : 2,
          }}
        >
          {isCollapsed ? user?.name?.[0] : <Person />}
        </Avatar>

        <Collapse in={!isCollapsed} orientation="horizontal">
          <Typography variant="subtitle1" noWrap>
            {user?.name || 'Parent User'}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {user?.email || 'parent@example.com'}
          </Typography>
        </Collapse>

        {showCollapseButton && (
          <IconButton
            onClick={handleCollapseToggle}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.text.secondary,
            }}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
      </Box>

      {/* Navigation Items */}
      <List component="nav">
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            disablePadding
            sx={{
              textDecoration: 'none',
              color: theme.palette.text.primary,
              '&.active': {
                backgroundColor: theme.palette.action.selected,
              },
            }}
          >
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleMenuItemClick(item)}
              sx={{
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                px: isCollapsed ? 0 : 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  color: 'inherit',
                  mr: isCollapsed ? 0 : 2,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Collapse in={!isCollapsed} orientation="horizontal">
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </Collapse>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Mobile Close Button */}
      {isMobile && (
        <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeft />
          </IconButton>
        </Box>
      )}
    </>
  );

  // Mascot/modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(true);

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
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <StudentMascot
        bubbleMessage="Learn more by clicking me!"
        bubbleVisible={bubbleVisible}
        onBubbleClose={() => setBubbleVisible(false)}
        onClick={() => setModalOpen(true)}
      />
      <StudentMascotPopup open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default ParentSidebar;