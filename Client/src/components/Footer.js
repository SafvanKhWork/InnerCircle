import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";

import Fab from "@mui/material/Fab";
import Image from "../img.jpg";

import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function Footer() {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Grid container justifyContent="center" spacing={8}>
          <Grid item>
            <IconButton color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={Image} />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

// <IconButton color="inherit" aria-label="open drawer">
//           <MenuIcon />
//         </IconButton>

//         <Box sx={{ flexGrow: 1 }} />
//         <IconButton color="inherit">
//           <SearchIcon />
//         </IconButton>
//         <IconButton color="inherit">
//           <PermIdentityIcon />
//         </IconButton>
