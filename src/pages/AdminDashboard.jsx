import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Chip, CircularProgress, Alert } from '@mui/material';
import { supabase } from '../config/supabase';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError('');
    try {
      const { data, error } = await supabase
        .from('parent_signup_requests')
        .select('*')
          .eq('status', 'pending')
        .order('submitted_at', { ascending: false });
        if (error) throw error;
        setRequests(data || []);
    } catch (err) {
        setError('Failed to fetch requests: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
    fetchRequests();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Pending Parent Signup Requests
        </Typography>
      {loading && <Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {requests.map((req) => (
          <Grid item xs={12} md={6} key={req.id}>
            <Card sx={{ borderLeft: '6px solid #1976d2' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Parent: {req.parent_first_name} {req.parent_last_name}
                </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Email: {req.parent_email}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Learner: {req.learner_first_name} {req.learner_last_name}
                  </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {req.learner_email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Grade: {req.learner_grade}
                  </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label={req.status} color="warning" />
                  <Typography variant="caption" sx={{ ml: 2 }}>
                    Submitted: {new Date(req.submitted_at).toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {!loading && requests.length === 0 && (
          <Grid item xs={12}>
            <Alert severity="info">No pending requests found.</Alert>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default AdminDashboard; 