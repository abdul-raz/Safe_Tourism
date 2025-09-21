import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Paper
} from '@mui/material';
import {
  Warning,
  People,
  Security,
  Speed,
  Emergency,
  LocalPolice,
  TravelExplore
} from '@mui/icons-material';
import { sampleData } from '../data/sampleData';

const DashboardHome = () => {
  const stats = {
    activeAlerts: sampleData.alerts.filter(alert => alert.status === 'Active').length,
    touristsMonitored: sampleData.tourists.length,
    policeUnits: sampleData.policeUnits.length,
    responseTime: '9.2'
  };

  const recentActivities = [
    {
      id: 1,
      type: 'alert',
      message: 'High priority: Panic button activated by T003',
      time: '2 mins ago',
      icon: <Warning color="error" />
    },
    {
      id: 2,
      type: 'incident',
      message: 'New theft reported at Times Square',
      time: '15 mins ago',
      icon: <Emergency color="warning" />
    },
    {
      id: 3,
      type: 'unit',
      message: 'Unit B12345 dispatched to incident location',
      time: '18 mins ago',
      icon: <LocalPolice color="primary" />
    },
    {
      id: 4,
      type: 'tourist',
      message: 'Tourist T002 checked in safely at hotel',
      time: '30 mins ago',
      icon: <TravelExplore color="success" />
    }
  ];

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box 
            sx={{ 
              p: 1, 
              borderRadius: 1, 
              bgcolor: `${color}.light`,
              color: `${color}.main`,
              mr: 2 
            }}
          >
            {icon}
          </Box>
          <Typography color="textSecondary" gutterBottom variant="h6">
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" component="div" color={color}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Authorities Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Alerts"
            value={stats.activeAlerts}
            icon={<Warning />}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tourists Monitored"
            value={stats.touristsMonitored}
            icon={<People />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Police Units"
            value={stats.policeUnits}
            icon={<Security />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Response Time"
            value={`${stats.responseTime} min`}
            icon={<Speed />}
            color="warning"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Recent Activity
            </Typography>
            <List>
              {recentActivities.map((activity) => (
                <ListItem key={activity.id} divider>
                  <ListItemIcon>
                    {activity.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.message}
                    secondary={activity.time}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button 
                variant="contained" 
                color="error" 
                startIcon={<Emergency />}
                fullWidth
              >
                Emergency Broadcast
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<LocalPolice />}
                fullWidth
              >
                Deploy Unit
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<People />}
                fullWidth
              >
                Tourist Search
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<Warning />}
                fullWidth
              >
                View All Alerts
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Current Status */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              System Status
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Tourist Tracking System:
                  </Typography>
                  <Chip label="Online" color="success" size="small" />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Emergency Response:
                  </Typography>
                  <Chip label="Active" color="success" size="small" />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Communication Network:
                  </Typography>
                  <Chip label="Operational" color="success" size="small" />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;