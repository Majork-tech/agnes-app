import React, { useState } from 'react';
import {
  Container,
  Card,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Mock data for video lessons
const mockVideos = [
  {
    video_name: 'Introduction to Algebra',
    video_description: 'Learn the basics of algebra in this introductory video.',
    video_path: '/videos/algebra_intro.mp4',
  },
  {
    video_name: 'Geometry Basics',
    video_description: 'Understand the fundamentals of geometry.',
    video_path: '/videos/geometry_basics.mp4',
  },
  {
    video_name: 'Trigonometry Explained',
    video_description: 'A detailed explanation of trigonometric concepts.',
    video_path: '/videos/trigonometry_explained.mp4',
  },
];

const ViewVideos = () => {
  const [videos, setVideos] = useState(mockVideos);
  const grade = 10; // Mock grade (replace with dynamic data)

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 4, boxShadow: 3 }}>
        {videos.length > 0 ? (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Video Lessons for Grade {grade}
            </Typography>

            {videos.map((video, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                  {video.video_name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {video.video_description}
                </Typography>
                <video
                  width="100%"
                  height="auto"
                  controls
                  controlsList="nodownload"
                  disablePictureInPicture
                  style={{ borderRadius: 4 }}
                >
                  <source src={video.video_path} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            ))}
          </>
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            No video lessons available for your grade.
          </Typography>
        )}

        {/* Back to Dashboard Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="warning"
            component={Link}
            to="/student-dashboard"
            startIcon={<ArrowBack />}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default ViewVideos;