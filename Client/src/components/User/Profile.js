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
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Scrollbars from "react-custom-scrollbars";

//
import Products from "../Product/Products";
import theme from "../../theme";
import Image from "../../img/img.jpg";
import data from "../../data";
import History from "./History";

const Profile = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });
  const history = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <ThemeProvider theme={theme}>
      <Grid container px={1} justifyContent="center" spacing={2}>
        <Grid item lg={3} xs={3}>
          <Scrollbars
            style={{ height: "100%" }}
            autoHide
            autoHideTimeout={0}
            autoHideDuration={1000}
          >
            <Box p={1}>
              <Stack spacing={2}>
                {history.map((el) => (
                  <History />
                ))}
              </Stack>
            </Box>
          </Scrollbars>
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
