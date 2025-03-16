import React from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

// Mock data for invoices
const invoices = [
  {
    invoice_id: 1,
    invoice_pdf: '/invoices/invoice_1.pdf',
    invoice_date: '2023-10-01',
  },
  {
    invoice_id: 2,
    invoice_pdf: '/invoices/invoice_2.pdf',
    invoice_date: '2023-10-15',
  },
];

const ViewInvoices = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Child Invoices
      </Typography>

      {invoices.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Invoice File</TableCell>
                <TableCell>Date Uploaded</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice_id}>
                  <TableCell>{invoice.invoice_id}</TableCell>
                  <TableCell>
                    <a href={invoice.invoice_pdf} target="_blank" rel="noopener noreferrer">
                      Download Invoice
                    </a>
                  </TableCell>
                  <TableCell>{invoice.invoice_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" align="center" color="textSecondary">
          No invoices found for the student.
        </Typography>
      )}
    </Container>
  );
};

export default ViewInvoices;