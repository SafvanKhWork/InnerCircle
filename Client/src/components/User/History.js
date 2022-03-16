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
  const { item } = props;
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
              <img
                height={72}
                width={72}
                src={Image}
                style={{ borderRadius: "4px " }}
              />
            </Box>
            <Stack>
              <div>NAme</div>
              <div>Value</div>
              <div>Date</div>
            </Stack>
          </Stack>
        </Card>
      </Paper>
    </ThemeProvider>
  );
};

export default History;
