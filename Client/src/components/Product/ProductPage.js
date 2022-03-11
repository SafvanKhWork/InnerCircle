import { Card } from "@mui/material";
import { Box, Paper } from "@mui/material";
import { Grid } from "@mui/material";
import { useState } from "react";
import { CardMedia, Tab, Tabs } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import theme from "../UI/Theme";
import Image from "../../img.jpg";
import { CardHeader } from "@mui/material";
import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import SearchBar from "./Search";
import { PagesOutlined } from "@mui/icons-material";

const ProductPage = (props) => {
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
              <Box minHeight={500} py={1} px={2}>
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
                  </Tabs> */}
                </Box>
                <SearchBar />
              </Box>
            </Card>
          </Paper>
        </Grid>
        <Grid item lg={6} xs={6}>
          <Paper elevation={4}>
            <Card>
              <Box minHeight={520}>
                <CardHeader
                  avatar={<Avatar src={Image} aria-label="recipe" />}
                  action={
                    <IconButton aria-label="settings">
                      <MoreVert />
                    </IconButton>
                  }
                  title="Username"
                  subheader="Created At"
                />
                <CardMedia component="img" height="164" image={Image} />
              </Box>
            </Card>
          </Paper>
        </Grid>
        <Grid item lg={3} xs={3}>
          <Paper elevation={4}>
            <Card>
              <Box minHeight={500} py={1} px={2}>
                <Box
                  pb={3}
                  sx={{ width: "100%", bgcolor: "background.paper" }}
                ></Box>
              </Box>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default ProductPage;
