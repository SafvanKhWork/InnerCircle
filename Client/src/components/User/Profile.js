import { useState, useEffect } from "react";
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
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Scrollbars from "react-custom-scrollbars";
import { Navigate, useParams } from "react-router-dom";
//
import Products from "../Product/Products";
import theme from "../../theme";
import History from "./History";
import UserMinibar from "./UserMinibar";
import { useDispatch, useSelector } from "react-redux";
import { getUser, refreshUserField } from "../../store/User/userSlice";
import axios from "axios";
import { url } from "../../config";
import { refreshUserInView } from "../../store/User/userInViewSlice";

const active = {
  color: "#fff",
  background: "#4db6ac",
};

const inactive = { color: "#4db6ac" };

const Profile = (props) => {
  const dispatch = useDispatch();
  const { uname: username } = useParams();
  const account = useSelector(getUser);
  const userInView = useSelector((state) => state.userInView);
  const user = props.profile ? { ...account } : userInView;
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(async () => {
    if (user._id) {
      const response = await axios.get(`${url}/products/owner/${user._id}`);
      if (response.data) {
        //{ ...response.data, owner: user }
        const prossedData = response.data.map((item) => {
          const prePost = { ...item, owner: user };
          return prePost;
        });
        setPosts(prossedData);
      }
    }
  }, [user._id]);
  useEffect(async () => {
    if (!props.profile) {
      const { data } = await axios.get(`${url}/user/${username}`);
      if (data) {
        let sold = 0;
        let bought = 0;
        data.history.forEach((entry) => {
          if (entry.status === "sold") {
            sold++;
          }
        });
        data.history.forEach((entry) => {
          if (entry.status === "bought") {
            bought++;
          }
        });
        dispatch(refreshUserInView({ ...data, sold, bought }));
      }
    }
    if (props.profile) {
      let sold = 0;
      let bought = 0;
      account.history.forEach((entry) => {
        if (entry.status === "sold") {
          sold++;
        }
      });
      account.history.forEach((entry) => {
        if (entry.status === "bought") {
          bought++;
        }
      });
      dispatch(refreshUserField({ sold, bought }));
    }
  }, []);

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
                {props.profile ? (
                  <Button
                    onClick={onClick.bind(undefined, 2)}
                    sx={value == 2 ? active : inactive}
                  >
                    Requests
                  </Button>
                ) : (
                  ""
                )}
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
                    <UserMinibar key={el} user={el} />
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
                minHeight={116}
              >
                <Box p={1}>
                  <Stack
                    direction={"row"}
                    display="flex"
                    justifyContent={"space-between"}
                  >
                    <Box display={"flex"} alignContent={"center"}>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item key={`${user?.username}3`} pl={1} pr={1}>
                          <Avatar
                            src={Image}
                            style={{
                              border: "1px solid #fff",
                            }}
                            sx={{ width: 76, height: 76 }}
                          />
                        </Grid>
                        <Grid key={`${user?.username}4`} item xs={true}>
                          <Typography
                            fontSize={32}
                            fontFamily={"sans-serif"}
                            variant="h4"
                          >
                            {user?.name}
                          </Typography>
                          <Typography
                            fontSize={22}
                            color="text.secondary"
                            variant="body2"
                          >
                            {user?.username}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box minWidth={400} px={2}>
                      <Grid textAlign={"center"} container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            fontSize={40}
                            fontFamily={"sans-serif"}
                            variant="h4"
                            color="text.secondary"
                          >
                            {user?.sold}
                          </Typography>
                          <Typography
                            fontSize={14}
                            color="text.secondary"
                            variant="body2"
                          >
                            {"Sold"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            fontSize={40}
                            fontFamily={"sans-serif"}
                            variant="h4"
                            color="text.secondary"
                          >
                            {user?.bought}
                          </Typography>
                          <Typography
                            fontSize={14}
                            color="text.secondary"
                            variant="body2"
                          >
                            {"Bought"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Button fullWidth variant="outlined">
                            Edit Profile
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Stack>
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
              <Products products={posts} />
            </Box>
          </Scrollbars>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Profile;
