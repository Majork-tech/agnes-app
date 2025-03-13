import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Box, useTheme } from '@mui/material';

// Define constants at the top level
const collapsedWidth = 64;
const expandedWidth = 240;
export default function App() {
  const location = useLocation();
  const theme = useTheme();
  const isHomepage = location.pathname === '/';

  return (
    <Box sx={{ display: 'flex' }}>
      {!isHomepage && <Sidebar />}
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          transition: theme => theme.transitions.create('margin', {
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