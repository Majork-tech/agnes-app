import React, { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Mock data for student uploads
const mockUploads = [
  {
    id: 1,
    uploader_username: 'student1',
    file_name: 'assignment1.pdf',
    file_type: 'PDF',
    upload_date: '2023-10-01',
    problem_description: 'Math homework problem',
    file_path: '/files/assignment1.pdf',
  },
  {
    id: 2,
    uploader_username: 'student2',
    file_name: 'project.zip',
    file_type: 'ZIP',
    upload_date: '2023-10-02',
    problem_description: 'Science project submission',
    file_path: '/files/project.zip',
  },
  {
    id: 3,
    uploader_username: 'student3',
    file_name: 'essay.docx',
    file_type: 'DOCX',
    upload_date: '2023-10-03',
    problem_description: 'English essay draft',
    file_path: '/files/essay.docx',
  },
];

const ViewUploads = () => {
  const [uploads, setUploads] = useState(mockUploads);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Student Uploads
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Uploader</TableCell>
              <TableCell sx={{ color: 'white' }}>File Name</TableCell>
              <TableCell sx={{ color: 'white' }}>File Type</TableCell>
              <TableCell sx={{ color: 'white' }}>Upload Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Problem Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uploads.length > 0 ? (
              uploads.map((upload) => (
                <TableRow key={upload.id}>
                  <TableCell>{upload.id}</TableCell>
                  <TableCell>{upload.uploader_username}</TableCell>
                  <TableCell>{upload.file_name}</TableCell>
                  <TableCell>{upload.file_type}</TableCell>
                  <TableCell>{upload.upload_date}</TableCell>
                  <TableCell>{upload.problem_description}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      href={upload.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No uploads found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Back to Dashboard Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/studentdashboard"
          startIcon={<ArrowBack />}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default ViewUploads;