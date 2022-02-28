import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../components/UI/Theme";
import CssBaseline from "@mui/material/CssBaseline";

import Products from "../components/Product/Products";

const Feed = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Container padding={10} component="main" maxWidth="xs" sx={2}>
        <CssBaseline />
        <Products />
      </Container>
    </ThemeProvider>
  );
};

export default Feed;
