import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createTheme, ThemeProvider} from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1E73BE",
        },
        secondary: {
            main: "#C4C7D1",
        },
    },
});

ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById('root')
);
