import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { Container, Paper, Typography, TextField, Button, Box, Alert, CircularProgress } from '@mui/material';

const AdminSignup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestId = searchParams.get('requestId');
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);
  const [parentPassword, setParentPassword] = useState('');
  const [learnerPassword, setLearnerPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('parent_signup_requests')
        .select('*')
        .eq('id', requestId)
        .single();
      if (error) {
        setError('Failed to fetch request: ' + error.message);
      } else {
        setRequest(data);
      }
      setLoading(false);
    };
    if (requestId) fetchRequest();
  }, [requestId]);

  const handleCreateAccounts = async () => {
    setCreating(true);
    setError('');
    setSuccess('');
    let parentUserId = null;
    let learnerUserId = null;

    try {
      // Try to create parent account
      const { data: parentData, error: parentError } = await supabase.auth.signUp({
        email: request.parent_email,
        password: parentPassword,
        options: {
          data: {
            role: 'parent',
            name: `${request.parent_first_name} ${request.parent_last_name}`
          }
        }
      });

      if (parentError) {
        if (parentError.message && parentError.message.includes('already registered')) {
          setError('Parent email is already registered. Only the learner account will be created.');
        } else {
          throw parentError;
        }
      } else {
        parentUserId = parentData.user.id;
      }

      // Create learner account
      const { data: learnerData, error: learnerError } = await supabase.auth.signUp({
        email: request.learner_email,
        password: learnerPassword,
        options: {
          data: {
            role: 'student',
            name: `${request.learner_first_name} ${request.learner_last_name}`
          }
        }
      });
      if (learnerError) throw learnerError;
      learnerUserId = learnerData.user.id;

      // Insert profiles for new users only
      const profilesToInsert = [];
      if (parentUserId) {
        profilesToInsert.push({
          id: parentUserId,
          email: request.parent_email,
          role: 'parent',
          first_name: request.parent_first_name,
          last_name: request.parent_last_name
        });
      }
      if (learnerUserId) {
        profilesToInsert.push({
          id: learnerUserId,
          email: request.learner_email,
          role: 'student',
          first_name: request.learner_first_name,
          last_name: request.learner_last_name
        });
      }
      if (profilesToInsert.length > 0) {
        await supabase.from('profiles').insert(profilesToInsert);
      }

      // Mark request as approved
      await supabase.from('parent_signup_requests').update({ status: 'approved' }).eq('id', request.id);

      setSuccess('Accounts created successfully! (Parent may have already existed)');
    } catch (err) {
      setError('Failed to create accounts: ' + (err.message || err.error_description));
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <Box sx={{ textAlign: 'center', mt: 8 }}><CircularProgress /></Box>;
  }

  if (!request) {
    return <Alert severity="error">Request not found.</Alert>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Admin: Create Parent & Learner Accounts
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          For request: <b>{request.parent_email}</b> / <b>{request.learner_email}</b>
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}<br/>
            <b>Parent Password:</b> {parentPassword}<br/>
            <b>Learner Password:</b> {learnerPassword}
          </Alert>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Parent Password"
            type="text"
            value={parentPassword}
            onChange={e => setParentPassword(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Learner Password"
            type="text"
            value={learnerPassword}
            onChange={e => setLearnerPassword(e.target.value)}
            required
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateAccounts}
            disabled={creating || !parentPassword || !learnerPassword}
          >
            {creating ? 'Creating...' : 'Create Accounts'}
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminSignup; 