import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
  Chip,
  Card,
  CardContent,
  Divider,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Send,
  Campaign,
  Emergency,
  Person,
  Notifications,
  Phone,
  Chat
} from '@mui/icons-material';
import { sampleData } from '../data/sampleData';

const Communication = () => {
  const [communications] = useState(sampleData.communications);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [broadcastDialogOpen, setBroadcastDialogOpen] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Normal':
        return 'primary';
      default:
        return 'default';
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
      setSelectedChat(null);
    }
  };

  const MessageItem = ({ message }) => (
    <ListItem
      alignItems="flex-start"
      button
      selected={selectedChat?.id === message.id}
      onClick={() => setSelectedChat(message)}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: getPriorityColor(message.priority) + '.main' }}>
          {message.from === 'Control Center' ? <Campaign /> : <Person />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2">
              {message.from} → {message.to}
            </Typography>
            <Chip label={message.priority} color={getPriorityColor(message.priority)} size="small" />
          </Box>
        }
        secondary={
          <>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {message.message}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {new Date(message.time).toLocaleString()}
            </Typography>
          </>
        }
      />
    </ListItem>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Communication Center
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<Emergency />}
                onClick={() => setBroadcastDialogOpen(true)}
                fullWidth
              >
                Emergency Broadcast
              </Button>
              <Button variant="contained" color="warning" startIcon={<Campaign />} fullWidth>
                All Units Alert
              </Button>
              <Button variant="outlined" startIcon={<Phone />} fullWidth>
                Conference Call
              </Button>
              <Button variant="outlined" startIcon={<Notifications />} fullWidth>
                Send Notification
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Online Units
            </Typography>
            <List dense>
              {sampleData.policeUnits.map((unit) => (
                <ListItem key={unit.id} button>
                  <ListItemAvatar>
                    <Badge color="success" variant="dot" overlap="circular">
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        <Person />
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText primary={unit.badgeNumber} secondary={unit.officerName} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Communications
            </Typography>
            <List sx={{ maxHeight: 400, overflow: 'auto' }}>
              {communications.map((message) => (
                <div key={message.id}>
                  <MessageItem message={message} />
                  <Divider />
                </div>
              ))}
            </List>

            {selectedChat && (
              <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 1, bgcolor: '#fafafa' }}>
                <Typography variant="subtitle1" gutterBottom>
                  Selected Chat Details
                </Typography>
                <Typography><strong>From:</strong> {selectedChat.from}</Typography>
                <Typography><strong>To:</strong> {selectedChat.to}</Typography>
                <Typography><strong>Message:</strong> {selectedChat.message}</Typography>
                <Typography><strong>Time:</strong> {new Date(selectedChat.time).toLocaleString()}</Typography>
                <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setSelectedChat(null)}>Clear Selection</Button>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                    <Button
                      variant="contained"
                      startIcon={<Send />}
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      Send Message
                    </Button>
                    <Button variant="outlined" size="small" startIcon={<Chat />}>
                      Voice Call
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={broadcastDialogOpen} onClose={() => setBroadcastDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Emergency color="error" />
            Emergency Broadcast
          </Box>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Broadcast To</InputLabel>
                <Select defaultValue="all" label="Broadcast To">
                  <MenuItem value="all">All Units</MenuItem>
                  <MenuItem value="patrol">Patrol Units Only</MenuItem>
                  <MenuItem value="emergency">Emergency Units Only</MenuItem>
                  <MenuItem value="specific">Specific Unit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Priority Level</InputLabel>
                <Select defaultValue="High" label="Priority Level">
                  <MenuItem value="Critical">Critical</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={4} label="Emergency Message" placeholder="Enter emergency broadcast message..." />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setBroadcastDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" startIcon={<Campaign />} onClick={() => setBroadcastDialogOpen(false)}>
            Send Broadcast
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Communication;
