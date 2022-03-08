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
      main: "#efef04",
    },
    secondary: {
      main: "#5ee6e6",
    },
    info: {
      main: "#567c96",
    },
    background: {
      default: "#000000",
      paper: "#797979",
    },
    divider: "#dce775",
  },
});
let currTheme = theme[1];
export default currTheme;
