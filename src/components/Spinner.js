import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner({ sx }) {
  return (
    <Stack flexDirection="row" justifyContent="center" alignItems="center" sx={sx}>
      <CircularProgress size={60} />
    </Stack>
  );
}