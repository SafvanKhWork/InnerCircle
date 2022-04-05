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
import { Navigate } from "react-router-dom";
//
import Products from "../Product/Products";
import theme from "../../theme";
import History from "./History";
import UserMinibar from "./UserMinibar";
import { useSelector } from "react-redux";
import { getUser } from "../../store/User/userSlice";

const active = {
  color: "#fff",
  background: "#4db6ac",
};

const inactive = { color: "#4db6ac" };

const Profile = (props) => {
  const user = useSelector(getUser);

  const products = useSelector((state) => state.products.discover);
  const [width, setWidth] = useState(window.innerWidth);
  const [rug, setRug] = useState(false);
  const [value, setValue] = useState(1);
  const onClick = (BId) => setValue(BId);
  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });
  if (!user) {
    return <Navigate to="/" />;
  }
  const Image = user?.avatar ?? "";
  const history = user?.history || [];
  const friendRequest = user?.friendRequest;
  const circle = user?.circle;

  return (
    <ThemeProvider theme={theme}>
      <Grid container px={1} justifyContent="center">
        <Grid item lg={3} xs={3}>
          <Box pb={1} px={1}>
            <Paper elevation={6}>
              <ButtonGroup
                onMouseEnter={(e) => {
                  active.color = "#000";
                  inactive.color = "#000";
                  setRug(!rug);
                }}
                onMouseLeave={(e) => {
                  active.color = "#fff";
                  inactive.color = "#4db6ac";
                  setRug(!rug);
                }}
                color="inherit"
                fullWidth
                variant="text"
              >
                <Button
                  onClick={onClick.bind(undefined, 0)}
                  sx={value == 0 ? active : inactive}
                >
                  Circle
                </Button>
                <Button
                  onClick={onClick.bind(undefined, 1)}
                  sx={value == 1 ? active : inactive}
                >
                  History
                </Button>
                <Button
                  onClick={onClick.bind(undefined, 2)}
                  sx={value == 2 ? active : inactive}
                >
                  Requests
                </Button>
              </ButtonGroup>
            </Paper>
          </Box>
          <Scrollbars
            style={{ height: "92%" }}
            autoHide
            autoHideTimeout={0}
            autoHideDuration={1000}
          >
            <Box p={1}>
              {value === 1 ? (
                <Stack spacing={1}>
                  {history.map((el) => (
                    <History item={el} />
                  ))}
                </Stack>
              ) : (
                ""
              )}
              {value === 2 ? (
                <Stack spacing={1}>
                  {friendRequest.map((el) => (
                    <UserMinibar request user={el} />
                  ))}
                </Stack>
              ) : (
                ""
              )}
              {value === 0 ? (
                <Stack spacing={1}>
                  {circle.map((el) => (
                    <UserMinibar user={el} />
                  ))}
                </Stack>
              ) : (
                ""
              )}
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
              <Products products={products} />
            </Box>
          </Scrollbars>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Profile;
