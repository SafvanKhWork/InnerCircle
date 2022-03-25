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
  Divider,
  ListItem,
  ListItemText,
  ThemeProvider,
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  Menu,
  MenuList,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { user } from "../../../data";
import { url, token } from "../../../config";
import { Navigate } from "react-router-dom";

//

const AccountSettings = (props) => {
  const [open, setOpen] = React.useState(false);
  const drawerWidth = 240;
  const [user, setUser] = React.useState();
  const anchorRef = React.useRef(null);
  let responseStatus;

  const logout = async () => {
    const logout1 = await axios.post(`${url}/users/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(logout1.status);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
    }

    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar src={user.avatar} alt={user.name} />
        </IconButton>
      </Tooltip>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "right bottom" : "right top",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem key={"profile"} onClick={handleClose}>
                    <Link
                      style={{ color: "inherit", textDecoration: "none" }}
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem
                    key={"logout"}
                    onClick={async () => {
                      window.localStorage.setItem(
                        "inner-circle-user",
                        JSON.stringify({})
                      );
                      await logout();
                      props.status.setIsLoggedIn(false);
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default AccountSettings;
