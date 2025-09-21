import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar
} from '@mui/material';
import {
  LocalPolice,
  DirectionsCar,
  Assignment,
  Phone,
  LocationOn,
  Send
} from '@mui/icons-material';
import { sampleData } from '../data/sampleData';

const ResourceDeployment = () => {
  const [units] = useState(sampleData.policeUnits);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dispatchDialogOpen, setDispatchDialogOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'success';
      case 'On Patrol': return 'warning';
      case 'Emergency': return 'error';
      case 'Busy': return 'info';
      default: return 'default';
    }
  };

  const handleViewUnit = (unit) => {
    setSelectedUnit(unit);
    setDialogOpen(true);
  };

  const handleDispatch = (unit) => {
    setSelectedUnit(unit);
    setDispatchDialogOpen(true);
  };

  const UnitCard = ({ unit }) => (
    <Card sx={{ mb: 2, cursor: 'pointer' }} onClick={() => handleViewUnit(unit)}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2}>
            <Avatar 
              sx={{ 
                width: 56, 
                height: 56, 
                bgcolor: getStatusColor(unit.status) + '.main',
                mx: 'auto'
              }}
            >
              <LocalPolice />
            </Avatar>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Unit {unit.badgeNumber}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {unit.officerName}
            </Typography>
            <Chip 
              label={unit.status} 
              color={getStatusColor(unit.status)}
              size="small"
              sx={{ mt: 1 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{unit.location}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{unit.contact}</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Button 
                variant="contained" 
                size="small"
                startIcon={<Send />}
                disabled={unit.status === 'Emergency'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDispatch(unit);
                }}
                sx={{ mb: 1 }}
              >
                Dispatch
              </Button>
              <br />
              <Button 
                variant="outlined" 
                size="small"
                startIcon={<Phone />}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Contact
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Resource Deployment
      </Typography>

      <Grid container spacing={3}>
        {/* Status Overview */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">
                {units.filter(u => u.status === 'Available').length}
              </Typography>
              <Typography color="textSecondary">
                Available Units
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">
                {units.filter(u => u.status === 'On Patrol').length}
              </Typography>
              <Typography color="textSecondary">
                On Patrol
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="error.main">
                {units.filter(u => u.status === 'Emergency').length}
              </Typography>
              <Typography color="textSecondary">
                Emergency Response
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main">
                {units.length}
              </Typography>
              <Typography color="textSecondary">
                Total Units
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Units List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Police Units Status
            </Typography>
            {units.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </Paper>
        </Grid>

        {/* Deployment Map */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Unit Deployment Map
            </Typography>
            <Box 
              sx={{ 
                height: 400, 
                bgcolor: '#e3f2fd', 
                borderRadius: 1,
                position: 'relative',
                backgroundImage: `
                  linear-gradient(90deg, #e0e0e0 1px, transparent 1px),
                  linear-gradient(#e0e0e0 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            >
              {units.map((unit, index) => (
                <Box
                  key={unit.id}
                  sx={{
                    position: 'absolute',
                    left: `${20 + (index * 15)}%`,
                    top: `${30 + (index * 10)}%`,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: getStatusColor(unit.status) + '.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                  onClick={() => handleViewUnit(unit)}
                >
                  <LocalPolice sx={{ fontSize: 20 }} />
                </Box>
              ))}
              
              {/* Legend */}
              <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'white', p: 2, borderRadius: 1 }}>
                <Typography variant="caption" display="block">Legend:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'success.main', mr: 1 }} />
                  <Typography variant="caption">Available</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'warning.main', mr: 1 }} />
                  <Typography variant="caption">On Patrol</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'error.main', mr: 1 }} />
                  <Typography variant="caption">Emergency</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Unit Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedUnit && (
          <>
            <DialogTitle>
              Unit {selectedUnit.badgeNumber} - Details
            </DialogTitle>
            
            <DialogContent>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Unit ID</strong></TableCell>
                      <TableCell>{selectedUnit.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Badge Number</strong></TableCell>
                      <TableCell>{selectedUnit.badgeNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Officer Name</strong></TableCell>
                      <TableCell>{selectedUnit.officerName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Current Status</strong></TableCell>
                      <TableCell>
                        <Chip 
                          label={selectedUnit.status}
                          color={getStatusColor(selectedUnit.status)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Location</strong></TableCell>
                      <TableCell>{selectedUnit.location}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Contact</strong></TableCell>
                      <TableCell>{selectedUnit.contact}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              <Button variant="outlined" startIcon={<Phone />}>
                Contact Unit
              </Button>
              <Button variant="outlined" startIcon={<LocationOn />}>
                Track Location
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Assignment />}
                onClick={() => {
                  setDialogOpen(false);
                  setDispatchDialogOpen(true);
                }}
              >
                Assign Task
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Dispatch Dialog */}
      <Dialog 
        open={dispatchDialogOpen} 
        onClose={() => setDispatchDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedUnit && (
          <>
            <DialogTitle>
              Dispatch Unit {selectedUnit.badgeNumber}
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Incident Type</InputLabel>
                    <Select
                      defaultValue=""
                      label="Incident Type"
                    >
                      <MenuItem value="theft">Theft Report</MenuItem>
                      <MenuItem value="emergency">Medical Emergency</MenuItem>
                      <MenuItem value="lost">Lost Tourist</MenuItem>
                      <MenuItem value="patrol">Routine Patrol</MenuItem>
                      <MenuItem value="backup">Backup Required</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      defaultValue="Medium"
                      label="Priority"
                    >
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Destination</InputLabel>
                    <Select
                      defaultValue=""
                      label="Destination"
                    >
                      <MenuItem value="times_square">Times Square</MenuItem>
                      <MenuItem value="central_park">Central Park</MenuItem>
                      <MenuItem value="brooklyn_bridge">Brooklyn Bridge</MenuItem>
                      <MenuItem value="statue_liberty">Statue of Liberty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDispatchDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={() => setDispatchDialogOpen(false)}
              >
                Dispatch Unit
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ResourceDeployment;