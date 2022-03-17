import { useState, Fragment } from "react";
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

//

import Products from "../Product/Products";

const actions = [
  { icon: <FileCopy />, name: "Copy" },
  { icon: <Save />, name: "Save" },
  { icon: <Print />, name: "Print" },
  { icon: <Share />, name: "Share" },
];

const Feed = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape").matches
  );

  const [change, setChange] = useState(false);

  window.addEventListener("resize", () => {
    setIsLandscape(window.matchMedia("(orientation: landscape").matches);
    setWidth(window.innerWidth);
  });

  return (
    <Box m={isLandscape ? 2 : 0}>
      <Box px={1} p={1}>
        <Products products={props.products} />
      </Box>
    </Box>
  );
};
export default Feed;
