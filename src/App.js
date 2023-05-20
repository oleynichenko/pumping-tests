import { CssBaseline, ThemeProvider } from '@mui/material';
import Test from './components/Test';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { RealmProvider } from './contexts/RealmContext';

let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RealmProvider>
        <CssBaseline />
        <Test />
      </RealmProvider>
    </ThemeProvider>
  );
}

export default App;
