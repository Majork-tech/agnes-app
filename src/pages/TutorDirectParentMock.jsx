import React, { useRef, useState } from 'react';
import {
  Container,
  Card,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  Avatar,
  Paper,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip
} from '@mui/material';
import { Send, AttachFile, ArrowBack, VideoCall } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const palette = {
  bg: '#F7FAFC',
  card: '#FFFFFF',
  primary: '#1976D2',
  accent: '#FFB300',
  text: '#37474F',
};

const mockTutor = {
  name: 'Tutor Jane',
  avatar: '',
};

const TutorDirectParentMock = () => {
  const [messages, setMessages] = useState([
    { sender: 'tutor', text: 'Hello! How can I help you today?', time: '09:00' },
  ]);
  const [input, setInput] = useState('');
  const [upload, setUpload] = useState(null);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const handleSend = () => {
    if (!input && !upload) return;
    setMessages((msgs) => [
      ...msgs,
      {
        sender: 'parent',
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        upload,
      },
    ]);
    setInput('');
    setUpload(null);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    // Automatic tutor reply
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          sender: 'tutor',
          text: 'Thank you for your message! A live tutor will be available soon. In the meantime, feel free to upload any files, images, or questions you want to discuss using the attachment pin below.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, 1200);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUpload(file);
  };

  return (
    <Box sx={{ backgroundColor: palette.bg, minHeight: '100vh', py: 6 }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3, minHeight: 600, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 800, color: palette.primary, mb: 1, letterSpacing: 1 }}>
            1DILE MATH APP
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ color: palette.text, mb: 3 }}>
            Chat with your tutor, upload files, and get help in real time. You can also join a live Zoom class for face-to-face support.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Button component={RouterLink} to="/parent-dashboard2" startIcon={<ArrowBack />} sx={{ mr: 2 }}>
              Back
            </Button>
            <Avatar sx={{ bgcolor: palette.primary, mr: 2 }}>{mockTutor.name[0]}</Avatar>
            <Typography variant="h5" sx={{ fontWeight: 700, color: palette.text }}>
              Tutor Direct (Parent Demo)
            </Typography>
          </Box>
          <Paper sx={{ flexGrow: 1, p: 2, mb: 2, overflowY: 'auto', maxHeight: 350 }} elevation={1}>
            <List>
              {messages.map((msg, idx) => (
                <ListItem key={idx} alignItems={msg.sender === 'parent' ? 'right' : 'left'}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: msg.sender === 'parent' ? palette.accent : palette.primary }}>
                      {msg.sender === 'parent' ? 'P' : 'T'}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={msg.text || (msg.upload ? msg.upload.name : '')}
                    secondary={msg.time}
                    sx={{ textAlign: msg.sender === 'parent' ? 'right' : 'left' }}
                  />
                  {msg.upload && (
                    <ListItemSecondaryAction>
                      <Button
                        variant="outlined"
                        size="small"
                        href={URL.createObjectURL(msg.upload)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </Button>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              ))}
              <div ref={chatEndRef} />
            </List>
          </Paper>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="You can upload anything" arrow>
              <IconButton
                component="label"
                color="primary"
                sx={{
                  boxShadow: !upload ? '0 0 16px 4px #42A5F5' : 0,
                  transition: 'box-shadow 0.3s',
                  '&:hover': {
                    boxShadow: '0 0 20px 6px #42A5F5',
                  },
                }}
              >
                <AttachFile />
                <Input type="file" sx={{ display: 'none' }} onChange={handleUpload} />
              </IconButton>
            </Tooltip>
            <TextField
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              fullWidth
              size="small"
              sx={{ bgcolor: 'white', borderRadius: 2 }}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            />
            <Button variant="contained" color="primary" endIcon={<Send />} onClick={handleSend}>
              Send
            </Button>
          </Box>
          {upload && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Attached: {upload.name}
            </Typography>
          )}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<VideoCall />}
              onClick={() => navigate('/zoom-class-mock', { state: { fromParent: true } })}
            >
              Attend Zoom Class
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default TutorDirectParentMock; 