import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent
} from '@mui/material';
import {
  Add,
  Edit,
  Visibility,
  Assignment,
  Person,
  CalendarToday
} from '@mui/icons-material';
import { sampleData } from '../data/sampleData';

const EFIRManagement = () => {
  const [firs] = useState(sampleData.firs);
  const [selectedFir, setSelectedFir] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'error';
      case 'Under Investigation': return 'warning';
      case 'Closed': return 'success';
      default: return 'default';
    }
  };

  const handleViewFir = (fir) => {
    setSelectedFir(fir);
    setIsEditing(false);
    setDialogOpen(true);
  };

  const handleEditFir = (fir) => {
    setSelectedFir(fir);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleAddFir = () => {
    setSelectedFir({
      id: '',
      caseNumber: '',
      type: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
      touristId: '',
      description: '',
      officerInCharge: '',
      witnesses: []
    });
    setIsEditing(true);
    setDialogOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        E-FIR & Case Management
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="error.main">
                {firs.filter(f => f.status === 'Open').length}
              </Typography>
              <Typography color="textSecondary">
                Open Cases
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">
                {firs.filter(f => f.status === 'Under Investigation').length}
              </Typography>
              <Typography color="textSecondary">
                Under Investigation
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">
                {firs.filter(f => f.status === 'Closed').length}
              </Typography>
              <Typography color="textSecondary">
                Closed Cases
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main">
                {firs.length}
              </Typography>
              <Typography color="textSecondary">
                Total FIRs
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* FIR List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                FIR Cases
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={handleAddFir}
              >
                New FIR
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Case Number</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Tourist ID</TableCell>
                    <TableCell>Officer in Charge</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {firs.map((fir) => (
                    <TableRow key={fir.id}>
                      <TableCell>{fir.caseNumber}</TableCell>
                      <TableCell>{fir.type}</TableCell>
                      <TableCell>{fir.date}</TableCell>
                      <TableCell>
                        <Chip 
                          label={fir.status}
                          color={getStatusColor(fir.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{fir.touristId}</TableCell>
                      <TableCell>{fir.officerInCharge}</TableCell>
                      <TableCell>
                        <Button 
                          size="small" 
                          startIcon={<Visibility />}
                          onClick={() => handleViewFir(fir)}
                          sx={{ mr: 1 }}
                        >
                          View
                        </Button>
                        <Button 
                          size="small" 
                          startIcon={<Edit />}
                          onClick={() => handleEditFir(fir)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* FIR Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedFir && (
          <>
            <DialogTitle>
              {isEditing ? (selectedFir.id ? 'Edit FIR' : 'New FIR') : 'FIR Details'}
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Case Number"
                    value={selectedFir.caseNumber}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={selectedFir.type}
                      label="Type"
                    >
                      <MenuItem value="Theft">Theft</MenuItem>
                      <MenuItem value="Assault">Assault</MenuItem>
                      <MenuItem value="Missing Person">Missing Person</MenuItem>
                      <MenuItem value="Medical Emergency">Medical Emergency</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    value={selectedFir.date}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={selectedFir.status}
                      label="Status"
                    >
                      <MenuItem value="Open">Open</MenuItem>
                      <MenuItem value="Under Investigation">Under Investigation</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tourist ID"
                    value={selectedFir.touristId}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Officer in Charge"
                    value={selectedFir.officerInCharge}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={4}
                    value={selectedFir.description}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                  />
                </Grid>
                {selectedFir.witnesses && selectedFir.witnesses.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Witnesses:
                    </Typography>
                    {selectedFir.witnesses.map((witness, index) => (
                      <Chip key={index} label={witness} sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Grid>
                )}
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              {isEditing && (
                <Button variant="contained" onClick={() => setDialogOpen(false)}>
                  Save FIR
                </Button>
              )}
              {!isEditing && (
                <Button variant="outlined" onClick={() => setIsEditing(true)}>
                  Edit FIR
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default EFIRManagement;