import {CssBaseline, ThemeProvider} from '@mui/material';
import Test from './components/Test';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Test />
    </ThemeProvider>
  );
}

export default App;
