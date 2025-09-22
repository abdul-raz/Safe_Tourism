import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  Slider,
  Button,
  TextField,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material';
import {
  Save,
  Add,
  Edit,
  Delete,
  Security,
  Notifications,
  Map,
  Warning,
  Person,
  AdminPanelSettings
} from '@mui/icons-material';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      smsAlerts: false,
      alertThreshold: 5
    },
    geofencing: {
      enabled: true,
      radius: 100,
      alertOnBreach: true
    },
    system: {
      autoRefresh: true,
      refreshInterval: 30,
      darkMode: false
    }
  });

  const [users] = useState([
    { id: 1, name: 'Admin User', role: 'Administrator', email: 'admin@police.gov', status: 'Active' },
    { id: 2, name: 'John Officer', role: 'Operator', email: 'john@police.gov', status: 'Active' },
    { id: 3, name: 'Jane Supervisor', role: 'Supervisor', email: 'jane@police.gov', status: 'Active' },
    { id: 4, name: 'Mike Analyst', role: 'Analyst', email: 'mike@police.gov', status: 'Inactive' }
  ]);

  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSettingChange = (section, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Here you would save to backend
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Administrator': return 'error';
      case 'Supervisor': return 'warning';
      case 'Operator': return 'primary';
      case 'Analyst': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 'default';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Settings & Configuration
      </Typography>

      <Grid container spacing={3}>
        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Notifications sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">Notification Settings</Typography>
            </Box>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.emailAlerts}
                  onChange={(e) => handleSettingChange('notifications', 'emailAlerts', e.target.checked)}
                />
              }
              label="Email Alerts"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.pushNotifications}
                  onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                />
              }
              label="Push Notifications"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.smsAlerts}
                  onChange={(e) => handleSettingChange('notifications', 'smsAlerts', e.target.checked)}
                />
              }
              label="SMS Alerts"
            />

            <Box sx={{ mt: 3 }}>
              <Typography gutterBottom>Alert Threshold</Typography>
              <Slider
                value={settings.notifications.alertThreshold}
                onChange={(e, value) => handleSettingChange('notifications', 'alertThreshold', value)}
                min={1}
                max={10}
                marks
                valueLabelDisplay="auto"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Geo-fencing Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Map sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">Geo-fencing Settings</Typography>
            </Box>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.geofencing.enabled}
                  onChange={(e) => handleSettingChange('geofencing', 'enabled', e.target.checked)}
                />
              }
              label="Enable Geo-fencing"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.geofencing.alertOnBreach}
                  onChange={(e) => handleSettingChange('geofencing', 'alertOnBreach', e.target.checked)}
                />
              }
              label="Alert on Breach"
            />

            <Box sx={{ mt: 3 }}>
              <Typography gutterBottom>Default Radius (meters)</Typography>
              <Slider
                value={settings.geofencing.radius}
                onChange={(e, value) => handleSettingChange('geofencing', 'radius', value)}
                min={50}
                max={500}
                step={50}
                marks={[
                  { value: 50, label: '50m' },
                  { value: 100, label: '100m' },
                  { value: 250, label: '250m' },
                  { value: 500, label: '500m' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>

            {/* Mock geo-fence map */}
            <Box 
              sx={{ 
                mt: 2,
                height: 200, 
                bgcolor: '#e3f2fd', 
                borderRadius: 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Geo-fence Boundary Adjustment Tool
              </Typography>
              {/* Mock boundary circles */}
              <Box
                sx={{
                  position: 'absolute',
                  width: 80,
                  height: 80,
                  border: '2px dashed #1976d2',
                  borderRadius: '50%',
                  top: '50%',
                  left: '30%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  width: 60,
                  height: 60,
                  border: '2px solid #f44336',
                  borderRadius: '50%',
                  top: '50%',
                  right: '30%',
                  transform: 'translate(50%, -50%)'
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* System Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Security sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">System Settings</Typography>
            </Box>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.system.autoRefresh}
                  onChange={(e) => handleSettingChange('system', 'autoRefresh', e.target.checked)}
                />
              }
              label="Auto-refresh Data"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.system.darkMode}
                  onChange={(e) => handleSettingChange('system', 'darkMode', e.target.checked)}
                />
              }
              label="Dark Mode"
            />

            <Box sx={{ mt: 3 }}>
              <Typography gutterBottom>Refresh Interval (seconds)</Typography>
              <Slider
                value={settings.system.refreshInterval}
                onChange={(e, value) => handleSettingChange('system', 'refreshInterval', value)}
                min={10}
                max={120}
                step={10}
                marks={[
                  { value: 10, label: '10s' },
                  { value: 30, label: '30s' },
                  { value: 60, label: '1m' },
                  { value: 120, label: '2m' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Save Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Configuration Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button 
                variant="contained" 
                startIcon={<Save />}
                onClick={handleSaveSettings}
                size="large"
              >
                Save All Settings
              </Button>
              <Button variant="outlined" color="warning">
                Reset to Defaults
              </Button>
              <Button variant="outlined" color="info">
                Export Configuration
              </Button>
              <Button variant="outlined" color="secondary">
                Import Configuration
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* User Role Management */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AdminPanelSettings sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">User Role Management</Typography>
              </Box>
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={() => setUserDialogOpen(true)}
              >
                Add User
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <Chip 
                          label={user.role}
                          color={getRoleColor(user.role)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip 
                          label={user.status}
                          color={getStatusColor(user.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          onClick={() => {
                            setSelectedUser(user);
                            setUserDialogOpen(true);
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* User Management Dialog */}
      <Dialog 
        open={userDialogOpen} 
        onClose={() => {
          setUserDialogOpen(false);
          setSelectedUser(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                defaultValue={selectedUser?.name || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                defaultValue={selectedUser?.email || ''}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  defaultValue={selectedUser?.role || 'Operator'}
                  label="Role"
                >
                  <MenuItem value="Administrator">Administrator</MenuItem>
                  <MenuItem value="Supervisor">Supervisor</MenuItem>
                  <MenuItem value="Operator">Operator</MenuItem>
                  <MenuItem value="Analyst">Analyst</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  defaultValue={selectedUser?.status || 'Active'}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            setUserDialogOpen(false);
            setSelectedUser(null);
          }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => {
            setUserDialogOpen(false);
            setSelectedUser(null);
          }}>
            {selectedUser ? 'Update User' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;