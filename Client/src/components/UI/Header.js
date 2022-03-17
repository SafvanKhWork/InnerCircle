import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Tooltip,
  Drawer,
  ListItem,
  ThemeProvider,
} from "@mui/material";

//
import theme from "../../theme";
import NavMenu from "./HeadItems/NavMenu";
import SearchBar from "../Search/Search.backup";
import AccountSettings from "./HeadItems/AccountSettings";
import { Link } from "react-router-dom";

const ResponsiveAppBar = (props) => {
  const pages = ["Discover", "Catagories", "Recommended"];
  const catagory = ["blue", "green", "yellow"];

  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar xs={100} disableGutters>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex", color: "white" },
              }}
            >
              <Link style={{ color: "inherit", textDecoration: "none" }} to="/">
                InnerCircle
              </Link>
            </Typography>
            <NavMenu pages={pages} catagory={catagory} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", color: "white" },
              }}
            >
              <Link style={{ color: "inherit", textDecoration: "none" }} to="/">
                InnerCircle
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <SearchBar />
            </Box>
            <AccountSettings status={props.status} />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
