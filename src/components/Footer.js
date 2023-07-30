import React from 'react';
import { Container, Typography, Link } from '@mui/material';

function Footer({ sx }) {
  return (
    <Container
      component="footer"
      maxWidth={false}
      sx={{
        minHeight: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...sx,
      }}
    >
      <Typography variant="caption">© 2023 Pumping Tests</Typography>
      <Typography variant="caption">
        Разработано в{' '}
        <Link variant="caption" underline="hover" href="http://daat.agency" target="_blank">
          DAAT.AGENCY
        </Link>
      </Typography>
    </Container>
  );
}

export default Footer;
