import { CssBaseline, ThemeProvider } from '@mui/material';
import router from './router';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { RealmProvider } from './contexts/RealmContext';
import { RouterProvider } from "react-router-dom";

let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RealmProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </RealmProvider>
    </ThemeProvider>
  );
}

export default App;
