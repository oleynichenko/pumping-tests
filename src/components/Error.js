import React from 'react';
import Typography from '@mui/material/Typography';

function Error({ error }) {
  return (
    <Typography component="h4" sx={{ mt: 4, textAlign: 'center' }}>
      {error}
    </Typography>
  );
}

export default Error;
