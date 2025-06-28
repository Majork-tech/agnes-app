import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
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
  Link,
} from '@mui/material';
import { ArrowBack, ExitToApp } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';

const ViewResultsStudent = () => {
  const { user, loading: authLoading } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user?.id) return;
    const fetchResults = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('student_id', user.id)
        .order('submitted_at', { ascending: false });
      if (error) {
        setError('Failed to load quiz results.');
        setResults([]);
      } else {
        setResults(data || []);
      }
      setLoading(false);
    };
    fetchResults();
  }, [user, authLoading]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Quiz Results
        </Typography>

        {loading ? (
          <Typography variant="body1" align="center">Loading...</Typography>
        ) : error ? (
          <Typography variant="body1" align="center" color="error">{error}</Typography>
        ) : results.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white' }}>Result ID</TableCell>
                  <TableCell sx={{ color: 'white' }}>Quiz ID</TableCell>
                  <TableCell sx={{ color: 'white' }}>Quiz Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Score</TableCell>
                  <TableCell sx={{ color: 'white' }}>Marked Work</TableCell>
                  <TableCell sx={{ color: 'white' }}>Report</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.id}</TableCell>
                    <TableCell>{result.quiz_id}</TableCell>
                    <TableCell>{result.quiz_title || result.quiz_name}</TableCell>
                    <TableCell>{result.score}</TableCell>
                    <TableCell>
                      {result.marked_pdf ? (
                        <Link
                          href={result.marked_pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </Link>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No file available
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {result.report_pdf ? (
                        <Link
                          href={result.report_pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </Link>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No file available
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            No results found for your quizzes.
          </Typography>
        )}

        {/* Logout Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<ExitToApp />}
            component={RouterLink}
            to="/logout"
          >
            Logout
          </Button>
        </Box>
      </Card>

      {/* Back to Dashboard Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/student-dashboard"
          startIcon={<ArrowBack />}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default ViewResultsStudent;