import React, { useState, useEffect } from 'react';
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
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!isAuthenticated || userRole !== 'admin') {
        setLoading(false);
        setError("You are not authorized to view this page.");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const { data, error: supabaseError } = await supabase
          .from('quiz_results')
          .select('*');

        if (supabaseError) {
          throw supabaseError;
        }

        if (data) {
          const submissionsWithSignedUrls = await Promise.all(
            data.map(async (submission) => {
              if (submission.image_url) {
                const { data: signedUrlData, error: signedUrlError } = await supabase.storage
                  .from('quiz-submissions')
                  .createSignedUrl(submission.image_url.split('/').pop(), 60); // 60 seconds validity

                if (signedUrlError) {
                  console.error('Error creating signed URL:', signedUrlError);
                  return { ...submission, signed_url: null };
                }
                return { ...submission, signed_url: signedUrlData.signedUrl };
              }
              return submission;
            })
          );
          setSubmissions(submissionsWithSignedUrls);
        } else {
          setSubmissions([]);
        }

      } catch (err) {
        console.error("Error fetching submissions:", err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [isAuthenticated, userRole]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card elevation={6} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
          Quiz Submissions
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ my: 4 }}>
            {error}
          </Alert>
        ) : (
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table stickyHeader aria-label="submissions table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Quiz Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Topic</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Subtopic</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Score</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Percentage</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Submitted At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.length > 0 ? (
                  submissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>{submission.quiz_title}</TableCell>
                      <TableCell>{submission.quiz_topic}</TableCell>
                      <TableCell>{submission.quiz_subtopic}</TableCell>
                      <TableCell>{`${submission.score} / ${submission.total_questions}`}</TableCell>
                      <TableCell>{`${submission.percentage}%`}</TableCell>
                      <TableCell>
                        {submission.signed_url && (
                          <Button
                            variant="contained"
                            size="small"
                            href={submission.signed_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Image
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>{new Date(submission.submitted_at).toLocaleString()}</TableCell>
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
        )}

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