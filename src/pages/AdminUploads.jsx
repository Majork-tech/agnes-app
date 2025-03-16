import React, { useState } from 'react';
import {
  Container,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Link,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Mock data for admin-uploaded files
const mockFiles = [
  {
    file_name: 'Math Notes.pdf',
    file_path: '/files/math_notes.pdf',
    file_type: 'pdf',
  },
  {
    file_name: 'Science Presentation.pptx',
    file_path: '/files/science_presentation.pptx',
    file_type: 'presentation',
  },
  {
    file_name: 'History Assignment.docx',
    file_path: '/files/history_assignment.docx',
    file_type: 'document',
  },
];

const AdminUploadeds = () => {
  const [files, setFiles] = useState(mockFiles);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Files Uploaded by the Admin for You
        </Typography>

        {files.length > 0 ? (
          <List>
            {files.map((file, index) => (
              <ListItem
                key={index}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  mb: 2,
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
              >
                <ListItemText
                  primary={
                    <Link
                      href={file.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {file.file_name}
                    </Link>
                  }
                  secondary={`Type: ${file.file_type}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            No files uploaded by the admin.
          </Typography>
        )}

        {/* Back to Dashboard Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="warning"
            component={RouterLink}
            to="/student-dashboard"
            startIcon={<ArrowBack />}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default AdminUploadeds;