import React from 'react';
import { 
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box
} from '@mui/material';
import { Download, ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ViewSubmissions = () => {
  // Mock data - replace with real data from your API
  const submissions = [
    {
      id: 1,
      usr_login: 'student1',
      quiz_id: 'QUIZ101',
      answer_file: '/submissions/file1.pdf',
      submission_date: '2024-04-15 14:30:00'
    },
    // Add more mock data or fetch from your backend
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card elevation={6} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
          Quiz Submissions
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table stickyHeader aria-label="submissions table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Student Username</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Quiz ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Submission File</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Submission Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.length > 0 ? (
                submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.usr_login}</TableCell>
                    <TableCell>{submission.quiz_id}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<Download />}
                        href={submission.answer_file}
                        download
                      >
                        Download
                      </Button>
                    </TableCell>
                    <TableCell>{submission.submission_date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No submissions found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="warning"
            component={Link}
            to="/admindashboard"
            startIcon={<ArrowBack />}
            sx={{ px: 4, py: 1.5 }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default ViewSubmissions;