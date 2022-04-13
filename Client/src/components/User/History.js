import { useState, Fragment, useEffect } from "react";
import {
  Grid,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  ThemeProvider,
  Divider,
  Collapse,
  Avatar,
  IconButton,
  TextField,
  MenuItem,
  Paper,
  Stack,
  Badge,
} from "@mui/material";
import {
  Share,
  AttachMoney,
  TextSnippet,
  Favorite,
  ExpandMore,
  MoreVert,
  Remove,
  Add,
  MonetizationOn,
  SpokeIcon,
  Comment,
} from "@mui/icons-material";
import Image from "../../img/img.jpg";
import theme from "../../theme";
import { useSelector } from "react-redux";
import { getToken } from "../../store/User/userSlice";
import axios from "axios";
import { url } from "../../config";

const History = (props) => {
  let color;
  const token = useSelector(getToken);
  const [toUser, setToUser] = useState({});
  const borrowed = true;
  let user2;
  const { item } = props;
  if (item.act === "sold") {
    color = "#A00101";
    user2 = "To";
  }
  useEffect(async () => {
    const { data } = await axios.get(`${url}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (data) {
      setToUser(data);
    }
  }, []);
  if (item.act === "bought") {
    color = "#03870E";
    user2 = "From";
  }
  if (item.act === "rented") {
    color = "#034287";
    user2 = borrowed ? "From" : "To";
  }
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={4}>
        <Card>
          <Box m={0.8}>
            <Stack
              direction={"row"}
              display="flex"
              justifyContent={"space-between"}
            >
              <Stack spacing={0.4}>
                <Typography
                  fontFamily={"sans-serif"}
                  variant="title"
                  fontSize={28}
                  component="div"
                >
                  {item.name}
                </Typography>
                <Typography variant="caption">
                  {item.model || "NULL"}
                </Typography>
              </Stack>

              <Stack display={"flex"} justifyContent={"left"}>
                <Typography fontSize={24}>{item.value}$</Typography>
                <Typography
                  align="right"
                  variant={"subtitle2"}
                  sx={{
                    color: color,
                  }}
                >
                  {item.act}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              display="flex"
              justifyContent={"space-between"}
            >
              <Typography variant="body2">
                {user2}: {toUser.username}
              </Typography>
              <Typography align="right" variant="body2">
                {item.createdAt}
              </Typography>
            </Stack>
          </Box>
        </Card>
      </Paper>
    </ThemeProvider>
  );
};

export default History;
