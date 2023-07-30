import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Error({ error }) {
  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        {error}
      </Typography>
    </Container>
  );
}

export default Error;
