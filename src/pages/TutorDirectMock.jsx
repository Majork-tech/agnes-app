import React, { useRef, useState } from 'react';
import {
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
import { useTheme } from '@mui/material/styles';
import { Send, AttachFile, ArrowBack, VideoCall } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';



const mockTutor = {
  name: 'Tutor Jane',
  avatar: '',
};

const TutorDirectMock = () => {
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
        sender: 'student',
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

  const theme = useTheme();
  return (
    <Box sx={{
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      p: 4
    }}>
      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3, minHeight: 600, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 800, color: theme.palette.primary.main, mb: 1, letterSpacing: 1 }}>
            1DILE MATH APP
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ color: theme.palette.text.primary, mb: 3 }}>
            Chat with your tutor, upload files, and get help in real time. You can also join a live Zoom class for face-to-face support.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Button component={RouterLink} to="/student-dashboard2" startIcon={<ArrowBack />} sx={{ mr: 2 }}>
              Back
            </Button>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>{mockTutor.name[0]}</Avatar>
            <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
              Tutor Direct (Demo)
            </Typography>
          </Box>
          <Paper sx={{ flexGrow: 1, p: 2, mb: 2, overflowY: 'auto', maxHeight: 350 }} elevation={1}>
            <List>
              {messages.map((msg, idx) => (
                <ListItem key={idx} alignItems={msg.sender === 'student' ? 'right' : 'left'}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: msg.sender === 'student' ? theme.palette.secondary.main : theme.palette.primary.main }}>
                      {msg.sender === 'student' ? 'S' : 'T'}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={msg.text || (msg.upload ? msg.upload.name : '')}
                    secondary={msg.time}
                    sx={{ textAlign: msg.sender === 'student' ? 'right' : 'left' }}
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
              onClick={() => navigate('/zoom-class-mock')}
            >
              Attend Zoom Class
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default TutorDirectMock; 