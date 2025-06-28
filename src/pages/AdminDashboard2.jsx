import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  Chip,
  Alert,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Quiz,
  Visibility,
  Grading,
  ListAlt,
  VideoLibrary,
  UploadFile,
  People,
  Receipt,
  AdminPanelSettings,
  CheckCircle,
  Cancel,
  Refresh,
  FamilyRestroom,
  School
} from '@mui/icons-material';

const mockParentRequests = [
  {
    id: 1,
    parentFirstName: 'Jane',
    parentLastName: 'Doe',
    parentEmail: 'jane.doe@example.com',
    parentPhone: '123-456-7890',
    status: 'pending',
    submitted_at: '2023-10-01T10:00:00Z',
  },
  {
    id: 2,
    parentFirstName: 'John',
    parentLastName: 'Smith',
    parentEmail: 'john.smith@example.com',
    parentPhone: '987-654-3210',
    status: 'approved',
    submitted_at: '2023-10-02T12:00:00Z',
  },
];

const AdminDashboard2 = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Alert severity="info" sx={{ mb: 3, fontWeight: 'bold', fontSize: '1.2rem' }}>
        Demo Mode: This dashboard is using mock data.
      </Alert>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
        <AdminPanelSettings sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          Admin Dashboard (Demo)
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your educational platform and student progress.
        </Typography>
      </Paper>
      {/* Dashboard Grid */}
      <Grid container spacing={3}>
        {/* Example mock dashboard items */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Students</Typography>
              <Typography variant="h4" color="primary">15</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Quizzes</Typography>
              <Typography variant="h4" color="success.main">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Submissions</Typography>
              <Typography variant="h4" color="info.main">23</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Parent Requests Table (Mock) */}
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Parent Signup Requests (Mock Data)
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {mockParentRequests.map((req) => (
          <Box key={req.id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
            <Typography><b>Name:</b> {req.parentFirstName} {req.parentLastName}</Typography>
            <Typography><b>Email:</b> {req.parentEmail}</Typography>
            <Typography><b>Phone:</b> {req.parentPhone}</Typography>
            <Typography><b>Status:</b> <Chip label={req.status} color={req.status === 'approved' ? 'success' : 'warning'} size="small" /></Typography>
            <Typography><b>Submitted:</b> {new Date(req.submitted_at).toLocaleString()}</Typography>
          </Box>
        ))}
      </Paper>
    </Container>
  );
};

export default AdminDashboard2; 