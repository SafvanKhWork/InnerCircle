import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Image from "../img.jpg";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";

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
