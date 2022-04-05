import { useState, Fragment, useEffect } from "react";
import {
  CardContent,
  Grid,
  ThemeProvider,
  Box,
  Collapse,
  Paper,
  Card,
  SpeedDial,
  SpeedDialAction,
  Tabs,
  Tab,
  TabList,
  TabPanel,
} from "@mui/material";
import { FileCopy, Save, Print, Share } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

//

import Products from "../Product/Products";
import { setCurrent } from "../../store/Products/productListSlice";

const actions = [
  { icon: <FileCopy />, name: "Copy" },
  { icon: <Save />, name: "Save" },
  { icon: <Print />, name: "Print" },
  { icon: <Share />, name: "Share" },
];

const Feed = (props) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const feed = useSelector((state) => state.products.feed);
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape").matches
  );
  useEffect(() => {
    dispatch(setCurrent(feed));
  }, [feed]);
  const products = useSelector((state) => state.products.current);
  const [change, setChange] = useState(false);

  window.addEventListener("resize", () => {
    setIsLandscape(window.matchMedia("(orientation: landscape").matches);
    setWidth(window.innerWidth);
  });

  return (
    <Box m={isLandscape ? 2 : 0}>
      <Box px={1} p={1}>
        <Products products={products} />
      </Box>
    </Box>
  );
};
export default Feed;
