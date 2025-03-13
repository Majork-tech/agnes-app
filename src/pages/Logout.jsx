import { Typography, Container } from '@mui/material';

export default function Logout() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Logout
      </Typography>
      <Typography>You have been logged out</Typography>
    </Container>
  );
}