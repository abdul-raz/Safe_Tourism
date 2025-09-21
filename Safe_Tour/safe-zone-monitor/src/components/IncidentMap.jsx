import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControlLabel,
  Switch,
  Button,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import {
  ZoomIn,
  ZoomOut,
  Layers,
  Warning,
  People,
  LocalPolice,
  LocationOn,
  Phone,
  Info
} from '@mui/icons-material';
import { sampleData } from '../data/sampleData';

const IncidentMap = () => {
  const [showTourists, setShowTourists] = useState(true);
  const [showPolice, setShowPolice] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [showRestricted, setShowRestricted] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMarkerClick = (marker, type) => {
    setSelectedMarker({ ...marker, type });
    setDialogOpen(true);
  };

  const getMarkerColor = (type, severity, status) => {
    switch (type) {
      case 'tourist':
        return status === 'Alert' ? '#f44336' : '#4caf50';
      case 'police':
        switch (status) {
          case 'Emergency': return '#f44336';
          case 'On Patrol': return '#ff9800';
          case 'Available': return '#4caf50';
          default: return '#757575';
        }
      case 'incident':
        switch (severity) {
          case 'High': return '#f44336';
          case 'Medium': return '#ff9800';
          case 'Low': return '#4caf50';
          default: return '#757575';
        }
      default:
        return '#757575';
    }
  };

  const MapMarker = ({ item, type, onClick }) => {
    const color = getMarkerColor(type, item.severity, item.status);
    
    return (
      <Box
        sx={{
          position: 'absolute',
          left: `${((item.lng + 74.1) / 0.3) * 100}%`,
          top: `${((40.9 - item.lat) / 0.3) * 100}%`,
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          zIndex: 1
        }}
        onClick={() => onClick(item, type)}
      >
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: color,
            border: '2px solid white',
            boxShadow: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              transform: 'scale(1.2)',
              transition: 'transform 0.2s'
            }
          }}
        >
          {type === 'tourist' && <People sx={{ fontSize: 12, color: 'white' }} />}
          {type === 'police' && <LocalPolice sx={{ fontSize: 12, color: 'white' }} />}
          {type === 'incident' && <Warning sx={{ fontSize: 12, color: 'white' }} />}
        </Box>
      </Box>
    );
  };

  const renderMarkerDetails = () => {
    if (!selectedMarker) return null;

    const { type } = selectedMarker;
    
    switch (type) {
      case 'tourist':
        return (
          <>
            <DialogTitle>
              Tourist Information
            </DialogTitle>
            <DialogContent>
              <Typography><strong>ID:</strong> {selectedMarker.id}</Typography>
              <Typography><strong>Name:</strong> {selectedMarker.name}</Typography>
              <Typography><strong>Location:</strong> {selectedMarker.location}</Typography>
              <Typography><strong>Safety Score:</strong> {selectedMarker.safetyScore}/100</Typography>
              <Typography><strong>Status:</strong> 
                <Chip 
                  label={selectedMarker.status} 
                  color={selectedMarker.status === 'Safe' ? 'success' : 'error'}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>
              <Typography><strong>Last Seen:</strong> {new Date(selectedMarker.lastSeen).toLocaleString()}</Typography>
              <Typography><strong>Phone:</strong> {selectedMarker.phone}</Typography>
              <Typography><strong>Hotel:</strong> {selectedMarker.hotel}</Typography>
            </DialogContent>
          </>
        );
      
      case 'police':
        return (
          <>
            <DialogTitle>
              Police Unit Information
            </DialogTitle>
            <DialogContent>
              <Typography><strong>Unit ID:</strong> {selectedMarker.id}</Typography>
              <Typography><strong>Badge Number:</strong> {selectedMarker.badgeNumber}</Typography>
              <Typography><strong>Officer:</strong> {selectedMarker.officerName}</Typography>
              <Typography><strong>Location:</strong> {selectedMarker.location}</Typography>
              <Typography><strong>Status:</strong> 
                <Chip 
                  label={selectedMarker.status} 
                  color={selectedMarker.status === 'Available' ? 'success' : 'warning'}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>
              <Typography><strong>Contact:</strong> {selectedMarker.contact}</Typography>
            </DialogContent>
          </>
        );
      
      case 'incident':
        return (
          <>
            <DialogTitle>
              Incident Information
            </DialogTitle>
            <DialogContent>
              <Typography><strong>Incident ID:</strong> {selectedMarker.id}</Typography>
              <Typography><strong>Type:</strong> {selectedMarker.type}</Typography>
              <Typography><strong>Location:</strong> {selectedMarker.location}</Typography>
              <Typography><strong>Severity:</strong> 
                <Chip 
                  label={selectedMarker.severity} 
                  color={selectedMarker.severity === 'High' ? 'error' : selectedMarker.severity === 'Medium' ? 'warning' : 'success'}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>
              <Typography><strong>Status:</strong> 
                <Chip 
                  label={selectedMarker.status} 
                  color={selectedMarker.status === 'Active' ? 'error' : 'success'}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>
              <Typography><strong>Time:</strong> {new Date(selectedMarker.time).toLocaleString()}</Typography>
              <Typography><strong>Description:</strong> {selectedMarker.description}</Typography>
            </DialogContent>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Real-Time Incident Map
      </Typography>

      <Grid container spacing={3}>
        {/* Map Controls */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Map Controls
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
              <Button variant="outlined" startIcon={<ZoomIn />}>
                Zoom In
              </Button>
              <Button variant="outlined" startIcon={<ZoomOut />}>
                Zoom Out
              </Button>
              <Button variant="outlined" startIcon={<Layers />}>
                Layers
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Layer Visibility
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={showTourists}
                  onChange={(e) => setShowTourists(e.target.checked)}
                />
              }
              label="Tourists"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showPolice}
                  onChange={(e) => setShowPolice(e.target.checked)}
                />
              }
              label="Police Units"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showIncidents}
                  onChange={(e) => setShowIncidents(e.target.checked)}
                />
              }
              label="Incidents"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showRestricted}
                  onChange={(e) => setShowRestricted(e.target.checked)}
                />
              }
              label="Restricted Zones"
            />
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Legend
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#4caf50' }} />
                </ListItemIcon>
                <ListItemText primary="Safe Tourist" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#f44336' }} />
                </ListItemIcon>
                <ListItemText primary="Alert Tourist" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalPolice sx={{ color: '#1976d2' }} />
                </ListItemIcon>
                <ListItemText primary="Police Unit" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Warning sx={{ color: '#ff9800' }} />
                </ListItemIcon>
                <ListItemText primary="Incident" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Map Area */}
        <Grid item xs={12} md={9}>
          <Paper 
            sx={{ 
              height: 600, 
              position: 'relative', 
              overflow: 'hidden',
              backgroundImage: 'url("/map-background.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              bgcolor: '#e3f2fd'
            }}
          >
            {/* Simulated Map Background */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                  linear-gradient(90deg, #e0e0e0 1px, transparent 1px),
                  linear-gradient(#e0e0e0 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                opacity: 0.3
              }}
            />

            {/* Restricted Zones */}
            {showRestricted && (
              <>
                <Box
                  sx={{
                    position: 'absolute',
                    left: '20%',
                    top: '30%',
                    width: '15%',
                    height: '20%',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    border: '2px dashed #f44336',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 0
                  }}
                >
                  <Typography variant="caption" color="error">
                    Restricted Zone A
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    left: '60%',
                    top: '60%',
                    width: '20%',
                    height: '15%',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    border: '2px dashed #f44336',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 0
                  }}
                >
                  <Typography variant="caption" color="error">
                    Construction Zone
                  </Typography>
                </Box>
              </>
            )}

            {/* Tourist Markers */}
            {showTourists && sampleData.tourists.map(tourist => (
              <MapMarker
                key={tourist.id}
                item={tourist}
                type="tourist"
                onClick={handleMarkerClick}
              />
            ))}

            {/* Police Unit Markers */}
            {showPolice && sampleData.policeUnits.map(unit => (
              <MapMarker
                key={unit.id}
                item={unit}
                type="police"
                onClick={handleMarkerClick}
              />
            ))}

            {/* Incident Markers */}
            {showIncidents && sampleData.incidents.map(incident => (
              <MapMarker
                key={incident.id}
                item={incident}
                type="incident"
                onClick={handleMarkerClick}
              />
            ))}

            {/* Map Info Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                p: 1,
                borderRadius: 1
              }}
            >
              <Typography variant="caption">
                Live Map - Updated every 30 seconds
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Marker Details Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        {renderMarkerDetails()}
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          {selectedMarker?.type === 'tourist' && (
            <Button variant="contained" startIcon={<Phone />}>
              Contact Tourist
            </Button>
          )}
          {selectedMarker?.type === 'police' && (
            <Button variant="contained" startIcon={<Phone />}>
              Contact Unit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IncidentMap;