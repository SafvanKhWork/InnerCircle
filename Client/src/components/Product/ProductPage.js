import { Card, CardActions, Collapse } from "@mui/material";
import { Box, Paper } from "@mui/material";
import { Grid, Container } from "@mui/material";
import { useState } from "react";
import { CardMedia, CardContent, Typography, Tab, Tabs } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import theme from "../UI/Theme";
import Image from "../../img.jpg";
import AddCommentIcon from "@mui/icons-material/AddComment";
import RecommendIcon from "@mui/icons-material/Recommend";
import { CardHeader } from "@mui/material";
import { Avatar, Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import NewBid from "./NewBid";
import Search from "./Search";
import { Scrollbars } from "react-custom-scrollbars";
import SearchBar from "./Search";
import Comment from "./Comments";
import { PagesOutlined } from "@mui/icons-material";

const comments = [
  {
    user: "1",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "2tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "3tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "4tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "5tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "6tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "7tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "8tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "9tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "3tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "4tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "5tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "6tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "7tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "8tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "9tester",
    message: "Lorem Ipsum zoom",
  },
];

const ProductPage = (props) => {
  const [recc, setRecc] = useState(false);
  const [value, setValue] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container px={1} justifyContent="center" spacing={2}>
        <Grid item lg={3} xs={3}>
          <Paper elevation={4}>
            <Card>
              <Box minHeight={500} maxHeight={500} py={1} px={2}>
                <Box pb={3} sx={{ width: "100%", bgcolor: "background.paper" }}>
                  {/* <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab label="Comments" />
                    <Tab label="Recommend" />
                    <Tab label="Details" />
                  </Tabs>
                  <SearchBar />
                   */}
                  <Collapse in={!recc}>
                    <Comment comments={comments} size={12} desk={true} />
                  </Collapse>
                  <Collapse in={recc}>
                    <Box pt={2}>
                      <Search show={true} />
                    </Box>
                  </Collapse>
                </Box>
              </Box>
            </Card>
          </Paper>
        </Grid>
        <Grid item lg={6} xs={6}>
          <Paper elevation={4}>
            <Card>
              <Box minHeight={510} maxHeight={510}>
                <CardHeader
                  avatar={<Avatar src={Image} aria-label="recipe" />}
                  action={
                    <IconButton
                      onClick={() => setRecc(!recc)}
                      aria-label="settings"
                    >
                      {!recc ? (
                        <ShareIcon fontSize="medium" />
                      ) : (
                        <AddCommentIcon fontSize="medium" />
                      )}
                    </IconButton>
                  }
                  title="Username"
                  subheader="Created At"
                />
                <CardMedia component="img" height="460" image={Image} />
              </Box>
            </Card>
          </Paper>
        </Grid>
        <Grid item lg={3} xs={3}>
          <Paper elevation={4}>
            <Stack spacing>
              <Card>
                <Box minHeight={500} maxHeight={500} py={1} px={2}>
                  <Box
                    pb={3}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      bgcolor: "background.paper",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {"name"}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {"MDNM123"}
                      </Typography>
                      <Scrollbars
                        style={{ height: 200 }}
                        autoHide
                        autoHideTimeout={0}
                        autoHideDuration={200}
                      >
                        <Typography
                          textAlign={"left"}
                          fontFamily={"sans-serif"}
                          variant="body2"
                        >
                          {
                            "Cupidatat ad velit nostrud laborum elit ad. Fugiat cupidatat velit incididunt labore nisi ea nostrud veniam exercitation adipisicing in velit. Sint in id elit quis duis. Consequat Lorem eu sit quis amet nostrud commodo ut. Enim mollit exercitation reprehenderit minim aute. Elit nostrud quis commodo ex mollit laboris esse. Lorem laboris laboris laboris magna. Sint consectetur incididunt ut eiusmod nulla nostrud tempor incididunt sunt deserunt id. Eiusmod minim eu aute sunt. Officia in ex ut commodo excepteur labore. Ut qui nostrud enim culpa. Eiusmod adipisicing ut est ut non nostrud. Dolore excepteur eu sint eu officia laborum id aliquip commodo consectetur excepteur. Do dolore elit minim eiusmod."
                          }
                        </Typography>
                      </Scrollbars>
                    </CardContent>
                    <Stack px={2} pt={8}>
                      <Stack justifyContent="space-between" direction={"row"}>
                        <Typography sx={{ fontWeight: "bold" }} variant="body2">
                          Highest Bid:
                        </Typography>

                        <Typography
                          fontFamily={"monospace"}
                          variant="subtitle2"
                        >
                          1200$
                        </Typography>
                      </Stack>

                      <Stack justifyContent="space-between" direction={"row"}>
                        <Typography sx={{ fontWeight: "bold" } variant="body2">
                          Your Current Bid:
                        </Typography>

                        <Typography
                          fontFamily={"monospace"}
                          variant="subtitle2"
                        >
                          1190$
                        </Typography>
                      </Stack>
                    </Stack>
                    <Box pt={5}>
                      <NewBid />
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default ProductPage;
