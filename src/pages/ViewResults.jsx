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

// Mock data
const mockData = {
  pageTitle: "Quiz Results",
  isAdmin: true,
  results: [
    { result_id: 1, usr_login: 'student1', quiz_id: 101, score: 85 },
    { result_id: 2, usr_login: 'student2', quiz_id: 102, score: 90 },
    { result_id: 3, usr_login: 'student3', quiz_id: 103, score: 78 },
  ]
};

const ViewResults = () => {
  const { pageTitle, isAdmin, results } = mockData;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {pageTitle}
        </Typography>

        {/* Check if there are results */}
        {results.length > 0 ? (
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main', color: 'white' }}>
                  <TableCell sx={{ color: 'white' }}>Result ID</TableCell>
                  {isAdmin && <TableCell sx={{ color: 'white' }}>Student Username</TableCell>}
                  <TableCell sx={{ color: 'white' }}>Quiz ID</TableCell>
                  <TableCell sx={{ color: 'white' }}>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row) => (
                  <TableRow key={row.result_id}>
                    <TableCell>{row.result_id}</TableCell>
                    {isAdmin && <TableCell>{row.usr_login}</TableCell>}
                    <TableCell>{row.quiz_id}</TableCell>
                    <TableCell>{row.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 4 }}>
            {isAdmin ? "No results found for any students." : "No results found for your quizzes."}
          </Typography>
        )}

        {/* Logout Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            color="error" 
            component={Link} 
            to="/logout"
            startIcon={<Download />}
          >
            Logout
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/admindashboard"
            startIcon={<ArrowBack />}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default ViewResults;