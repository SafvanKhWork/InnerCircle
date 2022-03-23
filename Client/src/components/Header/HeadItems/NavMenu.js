import * as React from "react";
import {
  CircularProgress,
  Box,
  IconButton,
  Typography,
  Drawer,
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
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState([]);

  const changeResult = (value) => {
    if (search) {
      setResults(value);
    }
  };

  const handleOpenNavMenu = (event) => {
    setSearch(false);
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
              <SearchBar
                products={props.products}
                search={search}
                setLoading={setLoading}
                changeResult={changeResult}
              />
            </div>
          </Box>
          {!search
            ? menu.map((page, i) => (
                <MenuItem
                  key={"menuitem" + i}
                  onClick={() => {
                    setMenu(catagory);
                  }}
                  sx={{}}
                >
                  <Typography>{page}</Typography>
                </MenuItem>
              ))
            : ""}
          {search && loading ? (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                py: 4,
              }}
            >
              <CircularProgress
                size={56}
                variant="indeterminate"
                sx={{ color: "#4db6ac" }}
              />
            </Box>
          ) : (
            results
          )}
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default NavMenu;
