import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import IncidentMap from './components/IncidentMap';
import AlertsPanel from './components/AlertsPanel';
import TouristLookup from './components/TouristLookup';
import Analytics from './components/Analytics';
import EFIRManagement from './components/EFIRManagement';
import ResourceDeployment from './components/ResourceDeployment';
import Communication from './components/Communication';
import Settings from './components/Settings';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#115293',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const sidebarWidth = 280;

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome />;
      case 'map':
        return <IncidentMap />;
      case 'alerts':
        return <AlertsPanel />;
      case 'tourists':
        return <TouristLookup />;
      case 'analytics':
        return <Analytics />;
      case 'efir':
        return <EFIRManagement />;
      case 'resources':
        return <ResourceDeployment />;
      case 'communication':
        return <Communication />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Header 
          toggleSidebar={toggleSidebar} 
          sidebarOpen={sidebarOpen}
          sidebarWidth={sidebarWidth}
        />
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          open={sidebarOpen}
          width={sidebarWidth}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 1,
            pt: 17, // Increased to account for logo bar (60px) + header (64px) = 124px total
            ml: sidebarOpen ? `${sidebarWidth}px` : '64px',
            minWidth: 0,
            transition: (theme) =>
              theme.transitions.create(['margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          }}
        >
          {renderActiveSection()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;