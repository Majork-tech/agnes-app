import React from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

// Mock data for student information, quiz results, and invoices
const student = {
  name: 'John Doe',
  surname: 'Smith',
  grade: '10',
  login: 'johnsmith',
};

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

const invoices = [
  {
    invoice_id: 1,
    invoice_pdf: '/invoices/invoice_1.pdf',
    invoice_date: '2023-10-01',
  },
  {
    invoice_id: 2,
    invoice_pdf: '/invoices/invoice_2.pdf',
    invoice_date: '2023-10-15',
  },
];

const ParentDashboard = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Parent Dashboard
      </Typography>

      {/* Student Information */}
      <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Student Information
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {student.name} {student.surname}
        </Typography>
        <Typography variant="body1">
          <strong>Grade:</strong> {student.grade}
        </Typography>
        <Typography variant="body1">
          <strong>Login:</strong> {student.login}
        </Typography>
      </Box>

      {/* Quiz Results */}
      <Typography variant="h5" gutterBottom>
        Quiz Results
      </Typography>
      {quizResults.length > 0 ? (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
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
                      <Link href={result.marked_pdf} target="_blank" rel="noopener noreferrer">
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
                      <Link href={result.report_pdf} target="_blank" rel="noopener noreferrer">
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
        <Typography variant="body1" color="textSecondary">
          No quiz results found for the student.
        </Typography>
      )}

      {/* Invoices */}
      <Typography variant="h5" gutterBottom>
        Invoices
      </Typography>
      {invoices.length > 0 ? (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Invoice File</TableCell>
                <TableCell>Date Uploaded</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice_id}>
                  <TableCell>{invoice.invoice_id}</TableCell>
                  <TableCell>
                    <Link href={invoice.invoice_pdf} target="_blank" rel="noopener noreferrer">
                      Download Invoice
                    </Link>
                  </TableCell>
                  <TableCell>{invoice.invoice_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No invoices found for the student.
        </Typography>
      )}

      {/* Logout Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/logout"
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default ParentDashboard;