import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
  Settings,
  Logout,
  Person,
  Security,
  NotificationsActive
} from '@mui/icons-material';

const Header = ({ toggleSidebar, sidebarOpen, sidebarWidth }) => {
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleProfileClick = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const notifications = [
    { id: 1, message: 'Tourist alert in Zone A', time: '2 mins ago', type: 'warning' },
    { id: 2, message: 'New incident reported', time: '5 mins ago', type: 'error' },
    { id: 3, message: 'System backup completed', time: '1 hour ago', type: 'success' }
  ];

  return (
    <>
      {/* Logo Bar - Above Header */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 70,
          bgcolor: '#f8f9fa',
          borderBottom: '2px solid #1976d2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          zIndex: 1300,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {/* Left Logo - Ministry of Tourism */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          border: '2px dashed #1976d2',
          p: 2,
          borderRadius: 1,
          bgcolor: 'white',
          minWidth: 180,
          justifyContent: 'center'
        }}>
          <img
            src="/Ministry_of_Tourism_India.svg"
            alt="Ministry of Tourism"
            style={{ height: 40, maxWidth: 160, objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'none',
              color: '#1976d2', 
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Ministry of Tourism<br/>
            <small>(Logo Loading...)</small>
          </Typography>
        </Box>

        {/* Center Logo - Incredible India */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          border: '2px dashed #ff9800',
          p: 2,
          borderRadius: 1,
          bgcolor: 'white',
          minWidth: 180,
          justifyContent: 'center'
        }}>
          <img
            src="/Incredible_India_campaign_logo.png"
            alt="Incredible India"
            style={{ height: 40, maxWidth: 160, objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'none',
              color: '#ff9800', 
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Incredible India<br/>
            <small>(Logo Loading...)</small>
          </Typography>
        </Box>

        {/* Right Logo - Assam Police */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          border: '2px dashed #4caf50',
          p: 2,
          borderRadius: 1,
          bgcolor: 'white',
          minWidth: 180,
          justifyContent: 'center'
        }}>
          <img
            src="/Assam_Police_badge.png"
            alt="Assam Police"
            style={{ height: 40, maxWidth: 160, objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'none',
              color: '#4caf50', 
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Assam Police<br/>
            <small>(Logo Loading...)</small>
          </Typography>
        </Box>
      </Box>

      {/* Main Header - Police Command Center */}
      <AppBar
        position="fixed"
        sx={{
          top: 70,
          zIndex: 1200,
          ml: sidebarOpen ? `${sidebarWidth}px` : 0,
          width: sidebarOpen ? `calc(100% - ${sidebarWidth}px)` : '100%',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={toggleSidebar}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Tourist Safety Operation Center
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notification Bell */}
            <IconButton 
              color="inherit" 
              onClick={handleNotificationClick}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* Profile Icon */}
            <IconButton 
              color="inherit" 
              onClick={handleProfileClick}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Notification Dropdown Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        PaperProps={{
          sx: { width: 300, maxHeight: 400 }
        }}
      >
        <MenuItem disabled>
          <Typography variant="h6">Notifications</Typography>
        </MenuItem>
        <Divider />
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleNotificationClose}>
            <ListItemIcon>
              <NotificationsActive color={notification.type} />
            </ListItemIcon>
            <ListItemText 
              primary={notification.message}
              secondary={notification.time}
            />
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleNotificationClose}>
          <Typography variant="body2" color="primary">
            View All Notifications
          </Typography>
        </MenuItem>
      </Menu>

      {/* Profile Dropdown Menu */}
      <Menu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={handleProfileClose}
        PaperProps={{
          sx: { width: 200 }
        }}
      >
        <MenuItem onClick={handleProfileClose}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem onClick={handleProfileClose}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <MenuItem onClick={handleProfileClose}>
          <ListItemIcon>
            <Security />
          </ListItemIcon>
          <ListItemText primary="Security" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleProfileClose}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
