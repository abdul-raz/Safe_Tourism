import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress
} from '@mui/material';
import {
  Search,
  Person,
  LocationOn,
  Phone,
  Hotel,
  Security,
  Warning,
  CheckCircle,
  Route,
  Emergency
} from '@mui/icons-material';
import { 
  Timeline, 
  TimelineItem, 
  TimelineSeparator, 
  TimelineConnector, 
  TimelineContent, 
  TimelineDot 
} from '@mui/lab'; 
import { sampleData } from '../data/sampleData';

const TouristLookup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const results = sampleData.tourists.filter(tourist => 
      tourist.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const handleTouristSelect = (tourist) => {
    setSelectedTourist(tourist);
    setDialogOpen(true);
  };

  const getSafetyScoreColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Safe': return 'success';
      case 'Alert': return 'error';
      case 'Warning': return 'warning';
      default: return 'default';
    }
  };

  const getTouristAlerts = (touristId) => {
    return sampleData.alerts.filter(alert => alert.touristId === touristId);
  };
// eslint-disable-next-line no-unused-vars
  const getLocationHistory = (touristId) => {
    // Mock location history
    return [
      { time: '17:15', location: 'Central Park', status: 'Current' },
      { time: '16:30', location: 'Times Square', status: 'Previous' },
      { time: '15:45', location: 'Brooklyn Bridge', status: 'Previous' },
      { time: '14:20', location: 'Grand Hotel NYC', status: 'Previous' }
    ];
  };

  const TouristCard = ({ tourist }) => {
    const alerts = getTouristAlerts(tourist.id);
    
    return (
      <Card 
        sx={{ 
          mb: 2, 
          cursor: 'pointer',
          '&:hover': { boxShadow: 4 },
          border: tourist.status === 'Alert' ? '2px solid #f44336' : '1px solid #e0e0e0'
        }}
        onClick={() => handleTouristSelect(tourist)}
      >
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={2}>
              <Avatar 
                sx={{ 
                  width: 64, 
                  height: 64, 
                  bgcolor: getStatusColor(tourist.status) + '.main',
                  mx: 'auto'
                }}
              >
                <Person />
              </Avatar>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {tourist.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ID: {tourist.id}
              </Typography>
              <Chip 
                label={tourist.status} 
                color={getStatusColor(tourist.status)}
                size="small"
                sx={{ mt: 1 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">{tourist.location}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">{tourist.phone}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Hotel sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">{tourist.hotel}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Safety Score
                </Typography>
                <Typography 
                  variant="h4" 
                  color={getSafetyScoreColor(tourist.safetyScore) + '.main'}
                  sx={{ fontWeight: 'bold' }}
                >
                  {tourist.safetyScore}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={tourist.safetyScore}
                  color={getSafetyScoreColor(tourist.safetyScore)}
                  sx={{ mt: 1 }}
                />
                {alerts.length > 0 && (
                  <Chip 
                    label={`${alerts.length} Alert${alerts.length > 1 ? 's' : ''}`}
                    color="error"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Tourist Profile Lookup
      </Typography>

      {/* Search Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Search Tourists
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Enter Tourist ID or Name"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., T001 or John Smith"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Search />}
              onClick={handleSearch}
            >
              Search Tourist
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Search Results ({searchResults.length})
          </Typography>
          {searchResults.map((tourist) => (
            <TouristCard key={tourist.id} tourist={tourist} />
          ))}
        </Paper>
      )}

      {/* All Tourists */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          All Registered Tourists ({sampleData.tourists.length})
        </Typography>
        {sampleData.tourists.map((tourist) => (
          <TouristCard key={tourist.id} tourist={tourist} />
        ))}
      </Paper>

      {/* Tourist Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        {selectedTourist && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    bgcolor: getStatusColor(selectedTourist.status) + '.main'
                  }}
                >
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {selectedTourist.name} - Tourist Profile
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tourist ID: {selectedTourist.id}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                {/* Basic Information */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Basic Information
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Name</strong></TableCell>
                          <TableCell>{selectedTourist.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Tourist ID</strong></TableCell>
                          <TableCell>{selectedTourist.id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Phone</strong></TableCell>
                          <TableCell>{selectedTourist.phone}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Hotel</strong></TableCell>
                          <TableCell>{selectedTourist.hotel}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Current Location</strong></TableCell>
                          <TableCell>{selectedTourist.location}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Last Seen</strong></TableCell>
                          <TableCell>{new Date(selectedTourist.lastSeen).toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell>
                            <Chip 
                              label={selectedTourist.status} 
                              color={getStatusColor(selectedTourist.status)}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Safety Score</strong></TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography 
                                color={getSafetyScoreColor(selectedTourist.safetyScore) + '.main'}
                                fontWeight="bold"
                              >
                                {selectedTourist.safetyScore}/100
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={selectedTourist.safetyScore}
                                color={getSafetyScoreColor(selectedTourist.safetyScore)}
                                sx={{ width: 100 }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                {/* Itinerary and Location History */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Planned Itinerary
                  </Typography>
                  <List dense>
                    {selectedTourist.itinerary.map((location, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Route color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={location} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Location History
                  </Typography>
                  <Timeline>
                    {getLocationHistory(selectedTourist.id).map((entry, index) => (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot color={entry.status === 'Current' ? 'primary' : 'grey'}>
                            <LocationOn />
                          </TimelineDot>
                          {index < 3 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="body2" color="textSecondary">
                            {entry.time}
                          </Typography>
                          <Typography variant="body1">
                            {entry.location}
                          </Typography>
                          <Chip 
                            label={entry.status} 
                            size="small" 
                            color={entry.status === 'Current' ? 'primary' : 'default'}
                          />
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Grid>

                {/* Alerts History */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Alert History
                  </Typography>
                  {getTouristAlerts(selectedTourist.id).length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                      <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                      <Typography color="success.main">
                        No alerts recorded for this tourist
                      </Typography>
                    </Box>
                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Alert Type</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Description</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {getTouristAlerts(selectedTourist.id).map((alert) => (
                            <TableRow key={alert.id}>
                              <TableCell>{alert.type}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={alert.priority} 
                                  color={alert.priority === 'High' ? 'error' : alert.priority === 'Medium' ? 'warning' : 'success'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>{new Date(alert.time).toLocaleString()}</TableCell>
                              <TableCell>{alert.location}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={alert.status} 
                                  color={alert.status === 'Active' ? 'error' : 'success'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>{alert.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              <Button variant="outlined" startIcon={<Phone />}>
                Call Tourist
              </Button>
              <Button variant="outlined" startIcon={<LocationOn />}>
                View on Map
              </Button>
              <Button variant="contained" startIcon={<Emergency />} color="error">
                Send Alert
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default TouristLookup;