import * as React from "react";
import {
  CircularProgress,
  Box,
  IconButton,
  Typography,
  Drawer,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "../../Search/UniversalSearch";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../../config";
import {
  refreshCatagory,
  setCurrent,
} from "../../../store/Products/productListSlice";
import { getToken } from "../../../store/User/userSlice";

const drawerWidth = 240;

const NavMenu = (props) => {
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const { discover, recommandation, feed } = useSelector(
    (state) => state.products
  );
  const catagory = useSelector((state) => state.products.catagory);
  const { pages } = props;
  const [search, setSearch] = React.useState(false);
  const [menu, setMenu] = React.useState("pages");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const catagories = useSelector((state) => state.products.catagories);
  const changeResult = (value) => {
    if (search) {
      setResults(value);
    }
  };

  const handleOpenNavMenu = (event) => {
    setMenu(pages);
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
          {!search ? (
            <React.Fragment>
              {menu !== "catagories" ? (
                <React.Fragment>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      dispatch(setCurrent([...feed]));
                    }}
                    key={"Home"}
                  >
                    <Typography>Home</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      dispatch(setCurrent([...discover]));
                    }}
                    key={"Discover"}
                  >
                    <Typography>Discover</Typography>
                  </MenuItem>
                  {/* <Divider /> */}
                  <MenuItem
                    key={"Catagory"}
                    onClick={() => {
                      dispatch(setCurrent([...catagory]));
                      setMenu("catagories");
                    }}
                  >
                    <Typography>Catagory</Typography>
                  </MenuItem>
                  {/* <Divider /> */}
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      dispatch(setCurrent([...recommandation]));
                    }}
                    key={"Recommanded"}
                  >
                    <Typography>Recommanded</Typography>
                  </MenuItem>
                </React.Fragment>
              ) : (
                catagories.map((catagory, i) => (
                  <MenuItem
                    key={catagory._id}
                    onClick={async (event) => {
                      const tempCatagory = discover.filter(
                        (product) => product.catagory === catagory.name
                      );

                      handleCloseNavMenu();
                      dispatch(refreshCatagory([...tempCatagory]));
                      dispatch(setCurrent([...tempCatagory]));
                    }}
                  >
                    {catagory.name}
                  </MenuItem>
                ))
              )}
            </React.Fragment>
          ) : // menu.map((page, i) => (
          //   <MenuItem
          //     key={"menuitem" + i}
          //     onClick={() => {
          //       setMenu(catagories);
          //     }}
          //   >
          //     <Typography>{page}</Typography>
          //   </MenuItem>
          // ))
          search && loading ? (
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
