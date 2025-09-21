import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Badge,
  IconButton
} from '@mui/material';
import {
  Warning,
  Error,
  Info,
  CheckCircle,
  FilterList,
  Refresh,
  ExpandMore,
  Phone,
  LocationOn,
  Person,
  Schedule
} from '@mui/icons-material';
import { sampleData } from '../data/sampleData';

const AlertsPanel = () => {
  const [alerts] = useState(sampleData.alerts);
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return <Error />;
      case 'Medium': return <Warning />;
      case 'Low': return <Info />;
      default: return <Info />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'error';
      case 'Investigating': return 'warning';
      case 'Resolved': return 'success';
      default: return 'default';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const priorityMatch = filterPriority === 'All' || alert.priority === filterPriority;
    const statusMatch = filterStatus === 'All' || alert.status === filterStatus;
    return priorityMatch && statusMatch;
  });

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    setDialogOpen(true);
  };

  const handleResolveAlert = (alertId) => {
    // In a real app, this would update the backend
    console.log(`Resolving alert ${alertId}`);
    setDialogOpen(false);
  };

  const AlertCard = ({ alert }) => (
    <Card 
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        '&:hover': { boxShadow: 4 },
        border: alert.priority === 'High' ? '2px solid #f44336' : '1px solid #e0e0e0'
      }}
      onClick={() => handleAlertClick(alert)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Box sx={{ mr: 2, color: getPriorityColor(alert.priority) + '.main' }}>
              {getPriorityIcon(alert.priority)}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {alert.type}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Alert ID: {alert.id}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip 
              label={alert.priority} 
              color={getPriorityColor(alert.priority)}
              size="small"
            />
            <Chip 
              label={alert.status} 
              color={getStatusColor(alert.status)}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>
        
        <Typography variant="body2" sx={{ mb: 1 }}>
          {alert.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="textSecondary">
              {alert.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="textSecondary">
              Tourist: {alert.touristId}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="textSecondary">
              {new Date(alert.time).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Alerts & Notifications
      </Typography>

      <Grid container spacing={3}>
        {/* Filters and Controls */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="All">All Priorities</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Investigating">Investigating</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
              </Select>
            </FormControl>

            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<Refresh />}
              sx={{ mb: 2 }}
            >
              Refresh Alerts
            </Button>

            <Button 
              variant="contained" 
              fullWidth 
              startIcon={<FilterList />}
              color="primary"
            >
              Advanced Filters
            </Button>
          </Paper>

          {/* Alert Statistics */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Alert Statistics
            </Typography>
            
            <Box sx={{ mb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Active Alerts</Typography>
                <Chip 
                  label={alerts.filter(a => a.status === 'Active').length} 
                  color="error" 
                  size="small" 
                />
              </Box>
            </Box>

            <Box sx={{ mb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">High Priority</Typography>
                <Chip 
                  label={alerts.filter(a => a.priority === 'High').length} 
                  color="error" 
                  size="small" 
                />
              </Box>
            </Box>

            <Box sx={{ mb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Under Investigation</Typography>
                <Chip 
                  label={alerts.filter(a => a.status === 'Investigating').length} 
                  color="warning" 
                  size="small" 
                />
              </Box>
            </Box>

            <Box sx={{ mb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Resolved Today</Typography>
                <Chip 
                  label={alerts.filter(a => a.status === 'Resolved').length} 
                  color="success" 
                  size="small" 
                />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Alerts List */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Active Alerts ({filteredAlerts.length})
              </Typography>
              <Box>
                <Badge badgeContent={alerts.filter(a => a.status === 'Active').length} color="error">
                  <Warning />
                </Badge>
              </Box>
            </Box>

            {filteredAlerts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" color="success.main">
                  No alerts matching current filters
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  All systems operating normally
                </Typography>
              </Box>
            ) : (
              <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
                {filteredAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Alert Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedAlert && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {getPriorityIcon(selectedAlert.priority)}
                <Box>
                  <Typography variant="h6">
                    {selectedAlert.type} - Alert Details
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Alert ID: {selectedAlert.id}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Priority & Status
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip 
                      label={selectedAlert.priority} 
                      color={getPriorityColor(selectedAlert.priority)}
                    />
                    <Chip 
                      label={selectedAlert.status} 
                      color={getStatusColor(selectedAlert.status)}
                      variant="outlined"
                    />
                  </Box>

                  <Typography variant="subtitle2" gutterBottom>
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedAlert.location}
                  </Typography>

                  <Typography variant="subtitle2" gutterBottom>
                    Tourist ID
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedAlert.touristId}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Time Reported
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {new Date(selectedAlert.time).toLocaleString()}
                  </Typography>

                  <Typography variant="subtitle2" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedAlert.description}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Recommended Actions
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="• Contact tourist immediately" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Dispatch nearest police unit" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Monitor tourist's location" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Update incident log" />
                </ListItem>
              </List>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              <Button variant="outlined" startIcon={<Phone />}>
                Contact Tourist
              </Button>
              <Button variant="outlined" startIcon={<LocationOn />}>
                View on Map
              </Button>
              <Button 
                variant="contained" 
                color="success"
                onClick={() => handleResolveAlert(selectedAlert.id)}
              >
                Mark as Resolved
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AlertsPanel;