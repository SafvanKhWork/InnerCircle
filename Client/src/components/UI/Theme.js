import { createTheme, ThemeProvider } from "@mui/material/styles";
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#f50057",
//     },
//     secondary: {
//       main: "#2962ff",
//     },
//   },
// });

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
      contrastText: "#ffffff",
    },
    info: {
      main: "#2196f3",
    },
  },
});
export default theme;
