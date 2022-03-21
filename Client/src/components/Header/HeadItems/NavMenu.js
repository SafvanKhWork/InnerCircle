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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "../../Search/UniversalSearch";

const drawerWidth = 240;

const NavMenu = (props) => {
  const { pages, catagory } = props;
  const [search, setSearch] = React.useState(false);
  const [menu, setMenu] = React.useState(pages);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [results, setResults] = React.useState([]);
  const handleOpenNavMenu = (event) => {
    setSearch(false);
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const searchResults = (ar) => setResults(ar);

  return (
    <React.Fragment>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          backgroundColor: "primary",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        <Box m={1}>
          <Box p={1}>
            <div onClick={() => (!search ? setSearch(true) : "")}>
              <SearchBar search={search} searchResults={searchResults} />
            </div>
          </Box>
          {!search
            ? menu.map((page) => (
                <MenuItem
                  key={Math.random()}
                  onClick={() => {
                    setMenu(catagory);
                  }}
                  sx={{}}
                >
                  <Typography>{page}</Typography>
                </MenuItem>
              ))
            : results}
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default NavMenu;
