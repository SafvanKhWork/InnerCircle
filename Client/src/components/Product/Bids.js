import {
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  Grid,
  ButtonGroup,
  Card,
} from "@mui/material";
import { useState } from "react";
import { green, red } from "@mui/material/colors";
import { IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Scrollbars } from "react-custom-scrollbars";
import { Avatar } from "@mui/material";
import { Fragment } from "react";
import Image from "../../img/img.jpg";
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

let visitOn = false;

const Bids = (props) => {
  const [page, setPage] = useState(0);

  const size = props.size || 3;

  let start = -size - page;
  let end = page > 0 ? 0 - page : undefined;
  let forward = false;
  let back = true;

  let bids = props.bids
    .sort(function (a, b) {
      return a.bid - b.bid;
    })
    .slice(start, end)
    .sort(function (a, b) {
      return b.bid - a.bid;
    });

  if (visitOn) {
    forward = end < 0;
    back = 0 - start < props.bids.length;
    if (!back) {
      back = false;
      forward = true;
    } else if (!forward) {
      back = true;
      forward = false;
    } else {
      back = forward = true;
    }
  }

  visitOn = false;
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

        {!props.desk ? (
          <Box m={1} px={2}>
            <Grid container justifyContent={"center"} spacing={1}>
              <Grid item xs={12} sm={6}>
                <Button
                  disabled={!back ? true : false}
                  onClick={() => {
                    if (back) {
                      visitOn = true;
                      setPage(page + 2);
                    }
                  }}
                  fullWidth
                  size="small"
                >
                  <ArrowBackIcon />
                  Previous
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  disabled={!forward ? true : false}
                  onClick={() => {
                    if (forward) {
                      visitOn = true;
                      setPage(page - 2);
                    }
                  }}
                  fullWidth
                  size="small"
                >
                  Next
                  <ArrowForwardIcon />
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
};

export default Bids;
