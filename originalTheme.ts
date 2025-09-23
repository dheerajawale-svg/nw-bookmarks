import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(0, 140, 154, 1)",
    },
    secondary: {
      main: "rgba(0, 143, 140, 1)",
    },
    text: {
      primary: "rgba(45, 47, 47, 1)",
      secondary: "rgba(95, 99, 99, 1)",
    },
    grey: {
      50: "rgba(244, 245, 245, 1)",
      100: "rgba(234, 235, 235, 1)",
      300: "rgba(146, 150, 150, 1)",
      400: "rgba(112, 117, 117, 1)",
      500: "rgba(95, 99, 99, 1)",
      600: "rgba(71, 71, 71, 1)",
      800: "rgba(45, 47, 47, 1)",
      900: "rgba(20, 21, 21, 1)",
    },
    background: {
      paper: "rgba(252, 253, 253, 1)",
      default: "rgba(244, 245, 245, 1)",
    },
  },
  typography: {
    fontFamily: "'Frutiger LT Std', Helvetica, Arial, sans-serif",
    h1: {
      fontSize: "14px",
      fontWeight: 400,
      letterSpacing: "0px",
      lineHeight: "18px",
    },
    h2: {
      fontSize: "12px",
      fontWeight: 400,
      letterSpacing: "0px",
      lineHeight: "16px",
    },
    caption: {
      fontSize: "11px",
      fontWeight: 400,
      letterSpacing: "0px",
      lineHeight: "14px",
    },
    body1: {
      fontSize: "12px",
      fontWeight: 400,
      letterSpacing: "0px",
      lineHeight: "16px",
    },
    body2: {
      fontSize: "11px",
      fontWeight: 400,
      letterSpacing: "0px",
      lineHeight: "18px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: ({ theme }) => ({
          ...theme.typography.h1,
        }),
        secondary: ({ theme }) => ({
          ...theme.typography.body1,
        }),
      },
    },
  },
});
