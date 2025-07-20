import React, { useState } from 'react';
import {
  Card,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Receipt, CloudUpload, ArrowBack } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';



const mockPending = [
  {
    id: 1,
    invoice_name: 'Invoice #001',
    amount: 'R500',
    issue_date: '2024-06-01',
    due_date: '2024-06-10',
    status: 'Pending',
  },
  {
    id: 2,
    invoice_name: 'Invoice #002',
    amount: 'R300',
    issue_date: '2024-06-05',
    due_date: '2024-06-15',
    status: 'Pending',
  },
];

const mockPaid = [
  {
    id: 3,
    invoice_name: 'Invoice #000',
    amount: 'R400',
    issue_date: '2024-05-01',
    due_date: '2024-05-10',
    status: 'Paid',
    paid_date: '2024-05-09',
  },
];

const ViewInvoices = () => {
  const theme = useTheme();
  const [view, setView] = useState('select'); // select | invoices | upload

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
          {view === 'select' && (
            <>
              <Typography variant="h4" align="center" sx={{ fontWeight: 800, color: theme.palette.primary.main, mb: 1, letterSpacing: 1 }}>
                Invoices
              </Typography>
              <Typography variant="subtitle1" align="center" sx={{ color: theme.palette.text.primary, mb: 4 }}>
                Choose an option below to view your invoices or upload proof of payment.
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Receipt />}
                    sx={{ width: '100%', height: 100, fontSize: 20, mb: 2 }}
                    onClick={() => setView('invoices')}
                  >
                    View Invoices
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<CloudUpload />}
                    sx={{ width: '100%', height: 100, fontSize: 20, mb: 2, bgcolor: theme.palette.secondary.main, color: 'white', '&:hover': { bgcolor: '#FFA000' } }}
                    onClick={() => setView('upload')}
                  >
                    Upload Proof of Payment
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {view === 'invoices' && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button
                  startIcon={<ArrowBack />}
                  onClick={() => setView('select')}
                  sx={{ mr: 2 }}
                >
                  Back
                </Button>
                <Typography variant="h5" sx={{ flexGrow: 1, color: theme.palette.primary.main }}>
                  Invoices
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2 }}>
                Invoices Pending
              </Typography>
              <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                      <TableCell sx={{ color: 'white' }}>Invoice</TableCell>
                      <TableCell sx={{ color: 'white' }}>Amount</TableCell>
                      <TableCell sx={{ color: 'white' }}>Issue Date</TableCell>
                      <TableCell sx={{ color: 'white' }}>Due Date</TableCell>
                      <TableCell sx={{ color: 'white' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockPending.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">No pending invoices.</TableCell>
                      </TableRow>
                    ) : (
                      mockPending.map((inv) => (
                        <TableRow key={inv.id}>
                          <TableCell>{inv.invoice_name}</TableCell>
                          <TableCell>{inv.amount}</TableCell>
                          <TableCell>{inv.issue_date}</TableCell>
                          <TableCell>{inv.due_date}</TableCell>
                          <TableCell>{inv.status}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2 }}>
                Invoices Paid
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                      <TableCell sx={{ color: 'white' }}>Invoice</TableCell>
                      <TableCell sx={{ color: 'white' }}>Amount</TableCell>
                      <TableCell sx={{ color: 'white' }}>Issue Date</TableCell>
                      <TableCell sx={{ color: 'white' }}>Due Date</TableCell>
                      <TableCell sx={{ color: 'white' }}>Paid Date</TableCell>
                      <TableCell sx={{ color: 'white' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockPaid.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">No paid invoices.</TableCell>
                      </TableRow>
                    ) : (
                      mockPaid.map((inv) => (
                        <TableRow key={inv.id}>
                          <TableCell>{inv.invoice_name}</TableCell>
                          <TableCell>{inv.amount}</TableCell>
                          <TableCell>{inv.issue_date}</TableCell>
                          <TableCell>{inv.due_date}</TableCell>
                          <TableCell>{inv.paid_date}</TableCell>
                          <TableCell>{inv.status}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          {view === 'upload' && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button
                  startIcon={<ArrowBack />}
                  onClick={() => setView('select')}
                  sx={{ mr: 2 }}
                >
                  Back
                </Button>
                <Typography variant="h5" sx={{ flexGrow: 1, color: theme.palette.primary.main }}>
                  Upload Proof of Payment
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Typography align="center" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                (Mock upload form goes here)
              </Typography>
              <Button variant="contained" color="primary" fullWidth disabled>
                Upload (Demo Only)
              </Button>
            </>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default ViewInvoices;