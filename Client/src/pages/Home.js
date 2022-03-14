import { useState } from "react";
import Products from "../components/Product/Products";
import { CardContent, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";
import { Box } from "@mui/system";
import { Collapse } from "@mui/material";
import { Paper } from "@mui/material";
import { Card } from "@mui/material";
import Scrollbars from "react-custom-scrollbars";
import theme from "../components/UI/Theme";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { Fragment } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

const Feed = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape").matches
  );
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
          <Paper elevation={4}>
            <Card>
              <Box
                justifyContent={"space-between"}
                minHeight={520}
                maxHeight={520}
                py={1}
                px={2}
              >
                <Box pb={3} sx={{ width: "100%", bgcolor: "background.paper" }}>
                  {/* <Tabs value={value} onChange={handleChange} centered> */}
                  {/* <Tabs centered>
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                  </Tabs> */}

                  <Collapse in={!false}></Collapse>
                </Box>
              </Box>
            </Card>
          </Paper>
        </Grid>
        <Grid item lg={9} xs={9}>
          <Scrollbars
            style={{ height: "100%" }}
            autoHide
            autoHideTimeout={0}
            autoHideDuration={1000}
          >
            <Products products={props.products} />
          </Scrollbars>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Feed;
