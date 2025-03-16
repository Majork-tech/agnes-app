import React, { useState } from 'react';
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

// Mock data for quiz results
const mockResults = [
  {
    result_id: 1,
    quiz_id: 101,
    quiz_name: 'Math Quiz 1',
    score: 85,
    marked_pdf: '/marked/math_quiz_1.pdf',
    report_pdf: '/reports/math_quiz_1_report.pdf',
  },
  {
    result_id: 2,
    quiz_id: 102,
    quiz_name: 'Science Quiz 1',
    score: 90,
    marked_pdf: '/marked/science_quiz_1.pdf',
    report_pdf: '', // No report available
  },
  {
    result_id: 3,
    quiz_id: 103,
    quiz_name: 'History Quiz 1',
    score: 78,
    marked_pdf: '', // No marked work available
    report_pdf: '/reports/history_quiz_1_report.pdf',
  },
];

const ViewResultsStudent = () => {
  const [results, setResults] = useState(mockResults);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Quiz Results
        </Typography>

        {results.length > 0 ? (
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
                  <TableRow key={result.result_id}>
                    <TableCell>{result.result_id}</TableCell>
                    <TableCell>{result.quiz_id}</TableCell>
                    <TableCell>{result.quiz_name}</TableCell>
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