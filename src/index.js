import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import 'draft-js/dist/Draft.css';

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import AdminProvider from "./context/AdminContext";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
function Main() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
ReactDOM.render(
  <SnackbarProvider maxSnack={2}>
    <AdminProvider>
      <Router>
        <Main />
      </Router>
    </AdminProvider>
  </SnackbarProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
