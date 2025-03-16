import React from 'react';
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
} from '@mui/material';

// Mock data for quiz results
const quizResults = [
  {
    quiz_id: 1,
    quiz_name: 'Math Quiz 1',
    score: 85,
    marked_pdf: '/marked/math_quiz_1.pdf',
    report_pdf: '/reports/math_quiz_1_report.pdf',
  },
  {
    quiz_id: 2,
    quiz_name: 'Science Quiz 1',
    score: 90,
    marked_pdf: '/marked/science_quiz_1.pdf',
    report_pdf: '', // No report available
  },
];

const ViewChildResults = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Child Quiz Results
      </Typography>

      {quizResults.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Quiz ID</TableCell>
                <TableCell>Quiz Name</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Marked Sheet</TableCell>
                <TableCell>Report</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizResults.map((result) => (
                <TableRow key={result.quiz_id}>
                  <TableCell>{result.quiz_id}</TableCell>
                  <TableCell>{result.quiz_name}</TableCell>
                  <TableCell>{result.score}</TableCell>
                  <TableCell>
                    {result.marked_pdf ? (
                      <a href={result.marked_pdf} target="_blank" rel="noopener noreferrer">
                        Download
                      </a>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No file available
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {result.report_pdf ? (
                      <a href={result.report_pdf} target="_blank" rel="noopener noreferrer">
                        Download
                      </a>
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
          No quiz results found for the student.
        </Typography>
      )}
    </Container>
  );
};

export default ViewChildResults;