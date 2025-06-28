import React, { useState } from 'react';
import {
  Container,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Mock data for quizzes
const mockQuizzes = [
  {
    quiz_id: 1,
    quiz_name: 'Math Quiz 1',
    pdf_file: '/quizzes/math_quiz_1.pdf',
  },
  {
    quiz_id: 2,
    quiz_name: 'Science Quiz 1',
    pdf_file: '/quizzes/science_quiz_1.pdf',
  },
  {
    quiz_id: 3,
    quiz_name: 'History Quiz 1',
    pdf_file: '/quizzes/history_quiz_1.pdf',
  },
];

const ViewQuizzesStudent = () => {
  const [quizzes, setQuizzes] = useState(mockQuizzes);
  const studentGrade = 10; // Mock student grade (replace with dynamic data)

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 4, boxShadow: 3 }}>
        {quizzes.length > 0 ? (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Available Quizzes for Grade {studentGrade}
            </Typography>

            <List>
              {quizzes.map((quiz) => (
                <ListItem
                  key={quiz.quiz_id}
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    mb: 2,
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                >
                  <ListItemText
                    primary={`Quiz ID: ${quiz.quiz_id}`}
                    secondary={`Quiz Name: ${quiz.quiz_name}`}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      href={quiz.pdf_file}
                      download
                    >
                      Download PDF
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      component={Link}
                      to={`/attempt-quiz/${quiz.quiz_id}`}
                    >
                      Attempt Quiz
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            No quizzes available for your grade.
          </Typography>
        )}
      </Card>

      {/* Back to Dashboard Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/student-dashboard"
          startIcon={<ArrowBack />}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default ViewQuizzesStudent;