import { useState, Fragment } from "react";
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

const History = (props) => {
  let color;

  const { item } = props;
  if (item.status === "sold") {
    color = "#A00101";
  }
  if (item.status === "rented") {
    color = "#03870E";
  }
  if (item.status === "bought") {
    color = "#034287";
  }
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={4}>
        <Card>
          <Stack
            display={"flex"}
            justifyContent={"space-between"}
            direction={"row"}
          >
            <Box m={0.8}>
              <Stack
                display={"flex"}
                justifyContent={"flex-start"}
                direction={"row"}
              >
                <img
                  height={132}
                  width={132}
                  src={Image}
                  style={{ borderRadius: "3px" }}
                />

                <Stack px={1} spacing={0.4}>
                  <Typography fontSize={28} variant="title" component="div">
                    {item.name}
                    <Typography
                      borderRadius={"0.75em"}
                      variant={"subtitle2"}
                      maxWidth={
                        item.status === "sold"
                          ? 43
                          : item.status === "rented"
                          ? 54
                          : 62
                      }
                      textAlign="center"
                      sx={{
                        color: "#fff",
                        backgroundColor: color,
                      }}
                    >
                      {item.status}
                    </Typography>
                  </Typography>
                  <Typography color="text.secondary">
                    {item.model || "KW7120"}
                  </Typography>
                  <Typography variant="subtitle1">{item.value}$</Typography>
                  <Typography variant="caption">{item.createdAt}</Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Card>
      </Paper>
    </ThemeProvider>
  );
};

export default History;
