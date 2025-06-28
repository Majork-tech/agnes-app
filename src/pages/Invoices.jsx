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

// Mock data for students
const mockStudents = [
  { usr_id: 1, usr_name: 'John Doe' },
  { usr_id: 2, usr_name: 'Jane Smith' },
  { usr_id: 3, usr_name: 'Alice Johnson' },
];

const UploadInvoice = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [invoiceFile, setInvoiceFile] = useState(null);

  useEffect(() => {
    // Fetch students from the backend (mock data for now)
    // Replace this with an API call to fetch real data
    console.log('Fetching students...');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock upload functionality
    console.log('Selected Student ID:', selectedStudent);
    console.log('Invoice File:', invoiceFile);
    alert('Invoice uploaded successfully! (Mock)');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Upload Invoice for a Student
      </Typography>

      {mockStudents.length > 0 ? (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, border: '1px solid #ccc', borderRadius: 2 }}>
          {/* Select Student Dropdown */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Student</InputLabel>
            <Select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              required
            >
              {mockStudents.map((student) => (
                <MenuItem key={student.usr_id} value={student.usr_id}>
                  {student.usr_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Upload Invoice Input */}
          <Box sx={{ mb: 3 }}>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setInvoiceFile(e.target.files[0])}
              required
              style={{ display: 'none' }}
              id="invoice-upload"
            />
            <label htmlFor="invoice-upload">
              <Button variant="contained" component="span">
                Upload Invoice (PDF)
              </Button>
            </label>
            {invoiceFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {invoiceFile.name}
              </Typography>
            )}
          </Box>

          {/* Submit Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mb: 3 }}
          >
            Upload Invoice
          </Button>
        </Box>
      ) : (
        <Typography variant="body1" align="center" color="textSecondary">
          No students found.
        </Typography>
      )}

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

export default UploadInvoice;