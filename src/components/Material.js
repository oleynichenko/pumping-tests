import React from 'react';
import { styled } from '@mui/material/styles';

const RootStyle = styled('section')(({ theme }) => ({
  textAlign: 'justify',
  '& h4': {
    ...theme.typography.h5,
    marginTop: 24,
    marginBottom: 12,
  },
  '& p': {
    ...theme.typography.body1,
    marginTop: 0,
    marginBottom: 16,
  },
}));

function Material({ content }) {
  return <RootStyle dangerouslySetInnerHTML={{ __html: content }} />;
}

export default Material;
