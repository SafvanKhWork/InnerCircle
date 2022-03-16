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
import { styled } from "@mui/system";
import { red, green, blue, yellow } from "@mui/material/colors";

import Bids from "../../Details/Bids/Bids";
import Comments from "../../Details/Comments/Comments";
import SearchBar from "../../../Search/Search";
import NewBid from "../../Details/Bids/NewBid";

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
    user: "nine",
    message: "blue.",
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

const bids = [
  {
    name: "zack1",
    bid: 1800,
    time: "time",
  },
  {
    name: "zack",
    bid: 18,
    time: "time",
  },
  {
    name: "zack",
    bid: 190,
    time: "time",
  },
  {
    name: "zack",
    bid: 1,
    time: "time",
  },
  {
    name: "zack",
    bid: 186,
    time: "time",
  },
];

const CardActivity = (props) => {
  const { expandedDesc, expandedBid, expandedRecc, expandedComment, liked } =
    props.catcher;

  return (
    <Stack direction={"column-reverse"}>
      <Collapse in={expandedBid} timeout="auto" unmountOnExit>
        <NewBid />
        <Bids bids={bids} />
      </Collapse>
      <Collapse in={expandedRecc} timeout="auto" unmountOnExit>
        <Box justifyContent="center" p={1}>
          <SearchBar />
        </Box>
      </Collapse>
      <Collapse in={expandedComment} timeout="auto" unmountOnExit>
        <Box textAlign={"justify"}>
          <Comments comments={comments} />
        </Box>
      </Collapse>
    </Stack>
  );
};

export default CardActivity;
