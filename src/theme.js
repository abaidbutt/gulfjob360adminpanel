import { createMuiTheme } from "@material-ui/core/styles";
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#252834",
      light: "#575858",
      dark: "#242823",
      contrastText: "#DFF0D8",
    },
    secondary: {
      main: "#13B493",
      light: "#DFFFFA",
      dark: "#0A795E",
      contrastText: "#252834",
    },
    text: {
      primary: "#242424",
      secondary: "#3F3F3F",
    },
    background: {
      default: "#f7fafc",
      paper: "#fff",
    },
  },
  contrastThreshold: 3,

  typography: {
    h1: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "32px",
      fontWeight: "500",
      color: "#211E1E",
    },
    h2: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "30px",
      fontWeight: "500",
      color: "#211E1E",
    },
    h3: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "24px",
      fontWeight: "100",
      color: "#242424",
    },
    h4: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "22px",
      fontWeight: "500",
      color: "#404040",
    },
    h5: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "18px",
      fontWeight: "500",
      color: "#404040",
    },
    h6: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "18px",
      fontWeight: "500",
      color: "#4C4C4C",
    },
    title1: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "48px",
      fontWeight: "500",
      color: "#242424",
    },
    title2: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "42px",
      fontWeight: "100",
      color: "#242424",
    },
    subtitle1: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "16px",
      color: "#404040",
    },
    subtitle2: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "14px",
      color: "#242424",
    },
  },
  overrides: {
    "@global": {
      ul: {
        color: "red",
      },
    },
  },
});
export const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 20,
        width: "100%",
        marginBottom: "20",
        height: "50vh",
        border: "1px solid lightgray",
        padding: "10px",
        borderRadius: "10px",
      },
      editor: {
        borderTop: "1px solid gray",
      },
    },
  },
});
