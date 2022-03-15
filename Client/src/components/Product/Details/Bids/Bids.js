import {
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  Grid,
  ButtonGroup,
  Card,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  ArrowForward,
  ArrowBack,
} from "@mui/icons-material";
import { Scrollbars } from "react-custom-scrollbars";
import { useState, Fragment } from "react";
import { green, red } from "@mui/material/colors";
import PageButtons from "./PageButtons";

//

import Bid from "./SingleBid";

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

const Bids = (props) => {
  const [page, setPage] = useState(0);

  const size = props.size || 3;

  let start = -size - page;
  let end = page > 0 ? 0 - page : undefined;

  let bids = props.bids
    .sort(function (a, b) {
      return a.bid - b.bid;
    })
    .slice(start, end)
    .sort(function (a, b) {
      return b.bid - a.bid;
    });

  if (props.desk) {
    bids = props.bids.sort(function (a, b) {
      return b.bid - a.bid;
    });
  }

  return (
    <Box pt={1} mx={1}>
      <Stack spacing={1}>
        {bids.map((bid, i) => {
          return (
            <Box p={1}>
              <Bid bid={bid} />
            </Box>
          );
        })}

        {!props.desk ? <PageButtons start end page setPage /> : ""}
      </Stack>
    </Box>
  );
};

export default Bids;
