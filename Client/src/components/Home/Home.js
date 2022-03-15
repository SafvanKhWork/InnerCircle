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
import Scrollbars from "react-custom-scrollbars";

//
import SideBox from "./SideBox";
import theme from "../../theme";
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
  const [inSidebar, setInSidebar] = useState(0);

  window.addEventListener("resize", () => {
    setIsLandscape(window.matchMedia("(orientation: landscape").matches);
    setWidth(window.innerWidth);
  });

  if (!isLandscape) {
    return (
      <Fragment>
        {/* <SpeedDial
          ariaLabel="SpeedDial basic example"
          s
          sx={{ position: "relative", bottom: -218, right: -118 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial> */}
        <Products products={props.products} />
      </Fragment>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container px={1} justifyContent="center" spacing={2}>
        <Grid item lg={3} xs={3}>
          <SideBox />
        </Grid>
        <Grid item lg={9} xs={9}>
          <Scrollbars
            style={{ height: "100%" }}
            autoHide
            autoHideTimeout={0}
            autoHideDuration={1000}
          >
            <Box px={1} p={1}>
              <Products products={props.products} />
            </Box>
          </Scrollbars>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Feed;
