import { useState } from "react";
import {
  CardMedia,
  Fab,
  Card,
  Box,
  Avatar,
  CardContent,
  ThemeProvider,
  Grid,
  Paper,
  Tab,
  Tabs,
  ButtonGroup,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Scrollbars from "react-custom-scrollbars";

//
import Products from "../Product/Products";
import theme from "../../theme";
import Image from "../../img/img.jpg";
import data from "../../data";

const Profile = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container px={1} justifyContent="center" spacing={2}>
        <Grid item lg={3} xs={3}>
          <Paper elevation={4}>
            <Card>
              <Box
                justifyContent={"space-between"}
                minHeight={540}
                maxHeight={540}
                py={1}
                px={2}
              >
                <Box pb={3} sx={{ width: "100%", bgcolor: "background.paper" }}>
                  {/* <Tabs value={value} onChange={handleChange} centered> 
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                  </Tabs> */}
                </Box>
              </Box>
            </Card>
          </Paper>
        </Grid>
        <Grid item lg={9} xs={9}>
          <Box px={2} pb={1}>
            <Paper elevation={4}>
              <Box
                justifyContent={"flex-end"}
                justifyItems={"inherit"}
                maxHeight={164}
                minHeight={164}
              >
                <Box display="flex" justifyContent="center" pt={2}>
                  <Avatar
                    src={Image}
                    style={{
                      border: "1px solid #fff",
                    }}
                    sx={{ width: 76, height: 76 }}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
          <Scrollbars
            style={{ height: "383px" }}
            autoHide
            autoHideTimeout={1}
            autoHideDuration={1000}
          >
            <Box px={2} py={1}>
              <Products products={data} />
            </Box>
          </Scrollbars>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Profile;
