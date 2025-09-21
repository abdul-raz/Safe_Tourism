import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box
} from '@mui/material';
import {
  Dashboard,
  Map,
  Warning,
  People,
  Analytics,
  Description,
  Security,
  Chat,
  Settings as SettingsIcon
} from '@mui/icons-material';

const Sidebar = ({ activeSection, onSectionChange, open, width }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Dashboard /> },
    { id: 'map', label: 'Incident Map', icon: <Map /> },
    { id: 'alerts', label: 'Alerts & Notifications', icon: <Warning /> },
    { id: 'tourists', label: 'Tourist Lookup', icon: <People /> },
    { id: 'analytics', label: 'Analytics', icon: <Analytics /> },
    { id: 'efir', label: 'E-FIR Management', icon: <Description /> },
    { id: 'resources', label: 'Resource Deployment', icon: <Security /> },
    { id: 'communication', label: 'Communication', icon: <Chat /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> }
  ];

  const handleItemClick = (sectionId) => {
    onSectionChange(sectionId);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? width : 64,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? width : 64,
          boxSizing: 'border-box',
          top: 70,
          height: 'calc(100vh - 70px)',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ pt: 1 }}> {/* Changed from pt: 8 to pt: 1 for minimal spacing */}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(item.id)}
                selected={activeSection === item.id}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  sx={{ 
                    opacity: open ? 1 : 0,
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      fontWeight: activeSection === item.id ? 'bold' : 'normal'
                    }
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider />
        
        {open && (
          <Box sx={{ p: 2, mt: 'auto' }}>
            <Typography variant="caption" color="textSecondary" display="block">
              Version 2.1.0
            </Typography>
            <Typography variant="caption" color="textSecondary" display="block">
              © 2025 Assam Police Dept.
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
