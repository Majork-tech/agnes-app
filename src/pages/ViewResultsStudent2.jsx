import React from 'react';
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
  Divider
} from '@mui/material';
import { ArrowBack, ExitToApp, ListAlt } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const mockResults = [
  {
    id: 1,
    quiz_name: 'Algebra Basics',
    score: 88,
    marked_pdf: '/mock/tutor-marking',
    report_pdf: '/mock/report',
  },
  {
    id: 2,
    quiz_name: 'Geometry Fundamentals',
    score: 92,
    marked_pdf: '',
    report_pdf: '/mock/report',
  },
  {
    id: 3,
    quiz_name: 'Trigonometry Intro',
    score: 75,
    marked_pdf: '/mock/tutor-marking',
    report_pdf: '',
  },
];

const ViewResultsStudent2 = () => {
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
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <Card sx={{ p: 4, boxShadow: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ListAlt sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
              Quiz Results (Demo)
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                  <TableCell sx={{ color: 'white' }}>Quiz Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Score</TableCell>
                  <TableCell sx={{ color: 'white' }}>Tutor Marking</TableCell>
                  <TableCell sx={{ color: 'white' }}>Report</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.quiz_name}</TableCell>
                    <TableCell>{result.score}/100</TableCell>
                    <TableCell>
                      {result.marked_pdf ? (
                        <Link href={result.marked_pdf} component={RouterLink} to="/mock/tutor-marking" underline="hover">
                          Download
                        </Link>
                      ) : (
                        <Typography color="textSecondary">No file</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {result.report_pdf ? (
                        <Link href={result.report_pdf} component={RouterLink} to="/mock/report" underline="hover">
                          Download
                        </Link>
                      ) : (
                        <Typography color="textSecondary">No file</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              component={RouterLink}
              to="/student-dashboard2"
              sx={{ bgcolor: theme.palette.primary.main, '&:hover': { bgcolor: theme.palette.primary.dark } }}
            >
              Back to Dashboard
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

// Simple mock download pages
export function MockTutorMarking() {
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ p: 6, textAlign: 'center' }}>
        <Typography variant="h5">This will download as PDF</Typography>
      </Card>
    </Box>
  );
}

export function MockReport() {
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ p: 6, textAlign: 'center' }}>
        <Typography variant="h5">This will download as PDF</Typography>
      </Card>
    </Box>
  );
}

export default ViewResultsStudent2; 