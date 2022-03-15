import { createTheme } from "@mui/material/styles";
const theme = [undefined, undefined, undefined, undefined, undefined];
theme[0] = createTheme({
  palette: {
    primary: {
      main: "#f50057",
    },
    secondary: {
      main: "#2962ff",
    },
  },
});

theme[1] = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#4db6ac",
      contrastText: "rgba(0,0,0,0.87)",
    },
    secondary: {
      main: "#00796b",
      contrastText: "#ffffff",
    },
    info: {
      main: "#64b5f6",
    },
    background: {
      default: "#daf7f7 ",
      paper: "#f7fdfc",
    },
    error: {
      main: "#e57373",
    },
    warning: {
      main: "#ffb74d",
    },
    success: {
      main: "#81c784",
    },
  },
});

theme[2] = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ffff00",
      contrastText: "rgba(0,0,0,0.87)",
    },
    secondary: {
      main: "#40c4ff",
      contrastText: "#000000",
    },
    info: {
      main: "#64b5f6",
    },
    background: {
      paper: "#5a5a5a",
      default: "#000000",
    },
    error: {
      main: "#e57373",
    },
    warning: {
      main: "#ffb74d",
    },
    success: {
      main: "#81c784",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.5)",
      disabled: "rgba(255,255,255,0.4)",
      hint: "rgba(255,255,255,0.4)",
    },
  },
});
let currTheme = theme[1];
export default currTheme;
