import { useState } from "react";
import {
  Card,
  Box,
  CardActions,
  Collapse,
  Paper,
  Grid,
  Container,
  CardMedia,
  CardContent,
  Typography,
  Tab,
  Tabs,
  ThemeProvider,
  CardHeader,
  Avatar,
  Stack,
  IconButton,
  PagesOutlined,
  TextField,
  Input,
} from "@mui/material";
import theme from "../../theme";

const NewPost = (props) => {
  const [recc, setRecc] = useState(false);
  const [comm, setComm] = useState(false);
  const [value, setValue] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [expandedBids, setExpandedBids] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const status = {
    recc,
    setRecc,
    comm,
    setComm,
    value,
    setValue,
    width,
    setWidth,
    expandedBids,
    setExpandedBids,
    liked,
    setLiked,
    isFocused,
    setIsFocused,
  };

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
                minHeight={500}
                maxHeight={500}
                py={1}
                px={2}
              >
                <CardContent>
                  <TextField />
                  <TextField />
                  <TextField />
                </CardContent>
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
                  title="Username"
                  subheader="Created At"
                />
                <Input accept="image/*" id="icon-button-file" type="file">
                  <Box maxHeight={388} minHeight={388}></Box>
                </Input>
              </Box>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default NewPost;
