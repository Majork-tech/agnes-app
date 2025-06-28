import React, { useState } from 'react';
import {
  Container,
  Card,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider
} from '@mui/material';
import { ArrowBack, PictureAsPdf, OndemandVideo } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const palette = {
  bg: '#F7FAFC',
  card: '#FFFFFF',
  primary: '#1976D2',
  accent: '#FFB300',
  text: '#37474F',
};

const mockPDFs = [
  {
    id: 1,
    file_name: 'Algebra_Worksheet.pdf',
    description: 'Practice problems for algebra basics.',
    file_path: '/files/algebra_worksheet.pdf',
  },
  {
    id: 2,
    file_name: 'Geometry_Revision.pdf',
    description: 'Revision worksheet for geometry.',
    file_path: '/files/geometry_revision.pdf',
  },
];

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
];

const topics = [
  { topic: 'Algebra', subtopics: ['Linear Equations', 'Exponents'] },
  { topic: 'Geometry', subtopics: ['Triangles', 'Circles'] },
  { topic: 'Trigonometry', subtopics: ['Basic Trig', 'Graphs'] },
];

const ViewLearningMaterialMock = () => {
  const [view, setView] = useState('select'); // select | pdf | video
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');

  // Filtered data
  const filteredPDFs = mockPDFs.filter(pdf => {
    if (!selectedTopic) return true;
    if (!selectedSubtopic) return pdf.description.toLowerCase().includes(selectedTopic.toLowerCase());
    return (
      pdf.description.toLowerCase().includes(selectedTopic.toLowerCase()) &&
      pdf.description.toLowerCase().includes(selectedSubtopic.toLowerCase())
    );
  });
  const filteredVideos = mockVideos.filter(video => {
    if (!selectedTopic) return true;
    if (!selectedSubtopic) return video.video_description.toLowerCase().includes(selectedTopic.toLowerCase());
    return (
      video.video_description.toLowerCase().includes(selectedTopic.toLowerCase()) &&
      video.video_description.toLowerCase().includes(selectedSubtopic.toLowerCase())
    );
  });

  return (
    <Box sx={{ backgroundColor: palette.bg, minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Card sx={{ p: 4, boxShadow: 3, borderRadius: 3 }}>
          {view === 'select' && (
            <>
              <Typography variant="h3" align="center" sx={{ fontWeight: 800, color: palette.primary, mb: 1, letterSpacing: 1 }}>
                1DILE MATH APP
              </Typography>
              <Typography variant="subtitle1" align="center" sx={{ color: palette.text, mb: 4 }}>
                Access a variety of learning resources to boost your understanding. Choose between interactive video lessons and downloadable PDF worksheets tailored for your grade.
              </Typography>
              <Typography variant="h4" align="center" sx={{ fontWeight: 700, color: palette.text, mb: 4 }}>
                Choose Learning Material
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PictureAsPdf />}
                    sx={{ width: '100%', height: 120, fontSize: 22, mb: 2 }}
                    onClick={() => setView('pdf')}
                  >
                    PDF Worksheets
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<OndemandVideo />}
                    sx={{ width: '100%', height: 120, fontSize: 22, mb: 2, bgcolor: palette.accent, color: 'white', '&:hover': { bgcolor: '#FFA000' } }}
                    onClick={() => setView('video')}
                  >
                    Videos
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {view === 'pdf' && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button
                  startIcon={<ArrowBack />}
                  onClick={() => setView('select')}
                  sx={{ mr: 2 }}
                >
                  Back
                </Button>
                <Typography variant="h5" sx={{ flexGrow: 1, color: palette.primary }}>
                  PDF Worksheets
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Box sx={{ minWidth: 180 }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>Topic</Typography>
                  <select
                    value={selectedTopic}
                    onChange={e => { setSelectedTopic(e.target.value); setSelectedSubtopic(''); }}
                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  >
                    <option value="">All</option>
                    {topics.map(t => (
                      <option key={t.topic} value={t.topic}>{t.topic}</option>
                    ))}
                  </select>
                </Box>
                <Box sx={{ minWidth: 180 }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>Subtopic</Typography>
                  <select
                    value={selectedSubtopic}
                    onChange={e => setSelectedSubtopic(e.target.value)}
                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                    disabled={!selectedTopic}
                  >
                    <option value="">All</option>
                    {topics.find(t => t.topic === selectedTopic)?.subtopics.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: palette.primary }}>
                      <TableCell sx={{ color: 'white' }}>File Name</TableCell>
                      <TableCell sx={{ color: 'white' }}>Description</TableCell>
                      <TableCell sx={{ color: 'white' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPDFs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">No worksheets found for the selected filters.</TableCell>
                      </TableRow>
                    ) : (
                      filteredPDFs.map((pdf) => (
                        <TableRow key={pdf.id}>
                          <TableCell>{pdf.file_name}</TableCell>
                          <TableCell>{pdf.description}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="info"
                              size="small"
                              href={pdf.file_path}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          {view === 'video' && (
            <>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Box sx={{ minWidth: 180 }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>Topic</Typography>
                  <select
                    value={selectedTopic}
                    onChange={e => { setSelectedTopic(e.target.value); setSelectedSubtopic(''); }}
                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  >
                    <option value="">All</option>
                    {topics.map(t => (
                      <option key={t.topic} value={t.topic}>{t.topic}</option>
                    ))}
                  </select>
                </Box>
                <Box sx={{ minWidth: 180 }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>Subtopic</Typography>
                  <select
                    value={selectedSubtopic}
                    onChange={e => setSelectedSubtopic(e.target.value)}
                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                    disabled={!selectedTopic}
                  >
                    <option value="">All</option>
                    {topics.find(t => t.topic === selectedTopic)?.subtopics.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {filteredVideos.length === 0 ? (
                <Typography align="center" sx={{ my: 4 }} color="text.secondary">
                  No videos found for the selected filters.
                </Typography>
              ) : (
                filteredVideos.map((video, idx) => (
                  <Box key={idx} sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ color: palette.text }} gutterBottom>
                      {video.video_name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
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
                ))
              )}
            </>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default ViewLearningMaterialMock; 