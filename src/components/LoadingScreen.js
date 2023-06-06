import { styled } from '@mui/material/styles';
import Spinner from './Spinner';

const RootStyle = styled('div')(() => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const LoadingScreen = () => {
  return (
    <RootStyle>
      <Spinner />
    </RootStyle>
  );
}

export { LoadingScreen };