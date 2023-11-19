import React from 'react';
import { styled } from '@mui/material/styles';

const RootStyle = styled('section')(({ theme }) => ({
  textAlign: 'justify',
  '& h4': {
    ...theme.typography.h5,
    marginTop: 24,
    marginBottom: 12,
  },
  '& h6': {
    ...theme.typography.h6,
    fontWeight: 400,
    marginTop: 24,
    marginBottom: 8,
  },
  '& p + ul': {
    marginTop: -14,
  },
  '& li': {
    ...theme.typography.body1,
  },
  '& p': {
    ...theme.typography.body1,
    marginTop: 0,
    marginBottom: 16,
  },
  '& em': {
    display: 'block',
    ...theme.typography.body2,
    marginTop: -8,
    marginBottom: 32,
    textAlign: 'right',
  },
}));

function Material({ content }) {
  return <RootStyle dangerouslySetInnerHTML={{ __html: content }} />;
}

export default Material;
