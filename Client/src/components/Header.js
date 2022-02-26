import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./UI/Theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            align={"center"}
            fontSize={35}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            InnerCircle
          </Typography>
          <Button color="inherit">SignOut</Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
