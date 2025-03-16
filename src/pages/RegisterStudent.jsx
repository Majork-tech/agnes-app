import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    usr_name: '',
    usr_surname: '',
    usr_email: '',
    usr_type: 'student',
    usr_grade: '',
    student_login: '',
    usr_login: '',
    usr_password: '',
  });

  const [showStudentFields, setShowStudentFields] = useState(false);
  const [showParentFields, setShowParentFields] = useState(false);

  useEffect(() => {
    // Auto-generate username and password
    const usrLogin = 'user' + Math.floor(Math.random() * 100000); // Example username generation
    const usrPassword = Math.random().toString(36).slice(-8); // Example password generation
    setFormData((prevData) => ({
      ...prevData,
      usr_login: usrLogin,
      usr_password: usrPassword,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Show/hide student or parent fields based on user type
    if (name === 'usr_type') {
      setShowStudentFields(value === 'student');
      setShowParentFields(value === 'parent');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form Data:', formData);
    alert('Sign up successful! (Mock)');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up Form
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, border: '1px solid #ccc', borderRadius: 2 }}>
        {/* First Name */}
        <TextField
          fullWidth
          label="First Name"
          name="usr_name"
          value={formData.usr_name}
          onChange={handleChange}
          required
          sx={{ mb: 3 }}
        />

        {/* Last Name */}
        <TextField
          fullWidth
          label="Last Name"
          name="usr_surname"
          value={formData.usr_surname}
          onChange={handleChange}
          required
          sx={{ mb: 3 }}
        />

        {/* Email */}
        <TextField
          fullWidth
          label="Email"
          type="email"
          name="usr_email"
          value={formData.usr_email}
          onChange={handleChange}
          required
          sx={{ mb: 3 }}
        />

        {/* User Type */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>User Type</InputLabel>
          <Select
            name="usr_type"
            value={formData.usr_type}
            onChange={handleChange}
            required
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="parent">Parent</MenuItem>
          </Select>
        </FormControl>

        {/* Student-specific fields */}
        {showStudentFields && (
          <TextField
            fullWidth
            label="Grade"
            name="usr_grade"
            value={formData.usr_grade}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
        )}

        {/* Parent-specific fields */}
        {showParentFields && (
          <TextField
            fullWidth
            label="Associated Student's Username"
            name="student_login"
            value={formData.student_login}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
        )}

        {/* Hidden fields for generated username and password */}
        <input type="hidden" name="usr_login" value={formData.usr_login} />
        <input type="hidden" name="usr_password" value={formData.usr_password} />

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
        >
          Sign Up
        </Button>
      </Box>

      {/* Back to Dashboard Button */}
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        component={Link}
        to="/admindashboard"
        startIcon={<ArrowBack />}
        sx={{ mt: 2 }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default RegisterStudent;