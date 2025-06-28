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
  Divider,
  Alert
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Description, ReceiptLong, Logout } from '@mui/icons-material';

// Unified color palette
const palette = {
  bg: '#F2F8FD',
  card: '#FFFFFF',
  primary: '#1565C0',
  accent: '#0288D1',
  text: '#37474F',
  muted: '#90A4AE'
};

const student = {
  name: 'John',
  surname: 'Smith',
  grade: '10',
  login: 'johnsmith',
};

const quizResults = [
  { id: 1, name: 'Math Quiz 1', score: 85, marked: '/marked/math_quiz_1.pdf', report: '/reports/math_quiz_1_report.pdf' },
  { id: 2, name: 'Science Quiz 1', score: 90, marked: '/marked/science_quiz_1.pdf', report: '' }
];

const invoices = [
  { id: 1, file: '/invoices/invoice_1.pdf', date: '2023-10-01' },
  { id: 2, file: '/invoices/invoice_2.pdf', date: '2023-10-15' }
];

const ParentDashboard2 = () => (
  <Box sx={{ backgroundColor: palette.bg, minHeight: '100vh', py: 6 }}>
    <Container maxWidth="md">
      {/* Demo Alert */}
      <Alert severity="info" sx={{ mb: 4, fontWeight: 600, bgcolor: palette.card, color: palette.primary }}>
        Demo Mode: Using mock data
      </Alert>

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: palette.primary, mb: 1 }}>
          Parent Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ color: palette.muted }}>
          Overview of your student's activities
        </Typography>
        <Divider sx={{ width: 80, height: 4, bgcolor: palette.accent, mx: 'auto', mt: 2 }} />
      </Box>

      {/* Student Info Card */}
      <Paper elevation={2} sx={{ p: 3, mb: 6, borderRadius: 2, backgroundColor: palette.card }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: palette.text, mb: 2 }}>
          Student Information
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {Object.entries(student).map(([key, value]) => (
            <Box key={key} sx={{ mb: 1, minWidth: '45%' }}>
              <Typography variant="body2" sx={{ color: palette.muted, fontWeight: 500, textTransform: 'capitalize' }}>
                {key.replace('_', ' ')}
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text, fontWeight: 700 }}>
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Quiz Results Table */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: palette.text, mb: 2 }}>
          Quiz Results
        </Typography>
        <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ backgroundColor: palette.accent }}>
              <TableRow>
                <TableCell sx={{ color: '#FFF', fontWeight: 600 }}>ID</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 600 }}>Quiz</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 600 }}>Score</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 600 }}>Marked</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 600 }}>Report</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizResults.map(({ id, name, score, marked, report }) => (
                <TableRow key={id} hover>
                  <TableCell>{id}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{score}%</TableCell>
                  <TableCell>
                    {marked ? (
                      <Button
                        component={RouterLink}
                        to={marked}
                        startIcon={<Description />}
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        Download
                      </Button>
                    ) : (
                      <Typography sx={{ color: palette.muted }}>N/A</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {report ? (
                      <Button
                        component={RouterLink}
                        to={report}
                        startIcon={<ReceiptLong />}
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        Download
                      </Button>
                    ) : (
                      <Typography sx={{ color: palette.muted }}>N/A</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Invoices Table */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: palette.text, mb: 2 }}>
          Invoices
        </Typography>
        <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ backgroundColor: palette.accent }}>
              <TableRow>
                <TableCell sx={{ color: '#FFF', fontWeight: 600 }}>Invoice</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 600 }} align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map(({ id, file, date }) => (
                <TableRow key={id} hover>
                  <TableCell>{id}</TableCell>
                  <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <Button
                      component={RouterLink}
                      to={file}
                      startIcon={<ReceiptLong />}
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Tutor Direct Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/tutor-direct-parent-mock"
          sx={{ textTransform: 'none', fontWeight: 600, mb: 2 }}
        >
          Tutor Direct
        </Button>
      </Box>

      {/* Logout Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          startIcon={<Logout />}
          component={RouterLink}
          to="/login"
          sx={{ backgroundColor: palette.primary, textTransform: 'none', fontWeight: 600 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  </Box>
);

export default ParentDashboard2;