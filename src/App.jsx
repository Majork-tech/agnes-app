import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import StudentSidebar from './components/StudentSidebar';
import ParentSidebar from './components/ParentSideBar';
import { Box, useTheme } from '@mui/material';

// Define constants at the top level
const collapsedWidth = 64;
const expandedWidth = 240;

export default function App() {
  const location = useLocation();
  const theme = useTheme();
  const isHomepage = location.pathname === '/';

  // Determine the user's role based on the current route
  const getRoleFromRoute = () => {
    if (location.pathname.startsWith('/parent')) {
      return 'parent';
    } else if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/create-quizzes')) {
      return 'admin';
    } else if (location.pathname.startsWith('/student') || location.pathname.startsWith('/view-quizzes')) {
      return 'student';
    }
    return null; // No role for the homepage or other routes
  };

  const role = getRoleFromRoute();

  return (
    <Box sx={{ display: 'flex' }}>
      {!isHomepage && (
        role === 'admin' ? (
          <Sidebar />
        ) : role === 'student' ? (
          <StudentSidebar />
        ) : role === 'parent' ? (
          <ParentSidebar />
        ) : null
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          marginLeft: isHomepage ? 0 : `-${collapsedWidth}px`,
          ...(!isHomepage && {
            marginLeft: 0,
            width: `calc(100% - ${collapsedWidth}px)`,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}