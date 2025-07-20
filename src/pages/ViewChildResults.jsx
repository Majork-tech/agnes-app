import React, { useState } from 'react';
import {
  Card,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Download, Person, Assessment, ArrowBack } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';



const mockStudent = {
  name: 'John Doe',
  grade: '10',
  email: 'john.doe@student.com',
};

const mockQuizzes = [
  {
    id: 1,
    quiz_name: 'Algebra Basics',
    score: 88,
    marking_pdf: '/mock/marked_algebra.pdf',
    report_pdf: '/mock/report_algebra.pdf',
    date: '2024-06-01',
  },
  {
    id: 2,
    quiz_name: 'Geometry Fundamentals',
    score: 92,
    marking_pdf: '',
    report_pdf: '/mock/report_geometry.pdf',
    date: '2024-06-05',
  },
  {
    id: 3,
    quiz_name: 'Trigonometry Intro',
    score: 75,
    marking_pdf: '/mock/marked_trig.pdf',
    report_pdf: '',
    date: '2024-06-10',
  },
];

const averageScore =
  mockQuizzes.length > 0
    ? Math.round(
        mockQuizzes.reduce((sum, q) => sum + q.score, 0) / mockQuizzes.length
      )
    : 0;

const mockAttendance = [
  { id: 1, title: 'Algebra Support Session', date: '2024-06-01', status: 'Present' },
  { id: 2, title: 'Geometry Q&A', date: '2024-06-05', status: 'Absent' },
  { id: 3, title: 'Trigonometry Live Class', date: '2024-06-10', status: 'Present' },
];

const ViewChildResults = () => {
  const theme = useTheme();
  const [checkedRow, setCheckedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewedRows, setReviewedRows] = useState([]);
  const [attendanceCheckedRow, setAttendanceCheckedRow] = useState(null);
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [reviewedAttendanceRows, setReviewedAttendanceRows] = useState([]);

  const handleCheck = (rowId) => {
    setCheckedRow(rowId);
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setCheckedRow(null);
  };
  const handleDialogConfirm = () => {
    setDialogOpen(false);
    setReviewedRows((prev) => [...prev, checkedRow]);
    setCheckedRow(null);
  };

  const handleAttendanceCheck = (rowId) => {
    setAttendanceCheckedRow(rowId);
    setAttendanceDialogOpen(true);
  };
  const handleAttendanceDialogClose = () => {
    setAttendanceDialogOpen(false);
    setAttendanceCheckedRow(null);
  };
  const handleAttendanceDialogConfirm = () => {
    setAttendanceDialogOpen(false);
    setReviewedAttendanceRows((prev) => [...prev, attendanceCheckedRow]);
    setAttendanceCheckedRow(null);
  };

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
            <Button
              startIcon={<ArrowBack />}
              component={RouterLink}
              to="/parent-dashboard2"
              sx={{ mr: 2 }}
            >
              Back
            </Button>
            <Assessment sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.primary.main, letterSpacing: 1 }}>
              Average Score: {averageScore}
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          {/* Quiz Table */}
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2 }}>
            Quiz Results & Tutor Reports
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                  <TableCell sx={{ color: 'white' }}></TableCell>
                  <TableCell sx={{ color: 'white' }}>Quiz Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Score</TableCell>
                  <TableCell sx={{ color: 'white' }}>Tutor Marking</TableCell>
                  <TableCell sx={{ color: 'white' }}>Tutor Report</TableCell>
                  <TableCell sx={{ color: 'white' }}>Date Attempted</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockQuizzes.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>
                      <Checkbox
                        checked={reviewedRows.includes(q.id)}
                        onChange={() => handleCheck(q.id)}
                        color="primary"
                        disabled={reviewedRows.includes(q.id)}
                      />
                    </TableCell>
                    <TableCell>{q.quiz_name}</TableCell>
                    <TableCell>{q.score}/100</TableCell>
                    <TableCell>
                      {q.marking_pdf ? (
                        <Button
                          variant="outlined"
                          color="info"
                          size="small"
                          startIcon={<Download />}
                          href={q.marking_pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </Button>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No file
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {q.report_pdf ? (
                        <Button
                          variant="outlined"
                          color="info"
                          size="small"
                          startIcon={<Download />}
                          href={q.report_pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </Button>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No file
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>{q.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Confirm Review</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you have reviewed these items?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button onClick={handleDialogConfirm} color="primary" variant="contained">Confirm</Button>
            </DialogActions>
          </Dialog>
          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 2 }}>
            This is a mock report. For more details, contact your tutor or the admin.
          </Typography>

          {/* Attendance Register Table */}
          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2 }}>
            Attendance Register
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                  <TableCell sx={{ color: 'white' }}></TableCell>
                  <TableCell sx={{ color: 'white' }}>Class Title</TableCell>
                  <TableCell sx={{ color: 'white' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white' }}>Attendance Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockAttendance.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>
                      <Checkbox
                        checked={reviewedAttendanceRows.includes(a.id)}
                        onChange={() => handleAttendanceCheck(a.id)}
                        color="primary"
                        disabled={reviewedAttendanceRows.includes(a.id)}
                      />
                    </TableCell>
                    <TableCell>{a.title}</TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>{a.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={attendanceDialogOpen} onClose={handleAttendanceDialogClose}>
            <DialogTitle>Confirm Review</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you have reviewed this attendance record?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAttendanceDialogClose}>Cancel</Button>
              <Button onClick={handleAttendanceDialogConfirm} color="primary" variant="contained">Confirm</Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Box>
    </Box>
  );
};

export default ViewChildResults;