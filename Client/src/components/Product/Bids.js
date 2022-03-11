import {
  Box,
  Stack,
  Avatar,
  Typography,
  Button,
  CardHeader,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { green, red } from "@mui/material/colors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Fragment } from "react";
import Image from "../../img.jpg";

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

  return (
    <Box pt={1} mx={1} justifyContent="center">
      <Stack>
        {bids.map((bid, i) => {
          return (
            <Box p={1}>
              <Stack
                spacing={1}
                justifyContent="center"
                alignItems="center"
                direction="row"
              >
                {
                  <Fragment key={i}>
                    <Grid container justifyContent="center" alignItems="center">
                      {/* <Grid item key={`${i}3`} pl={1} pr={1}> */}
                      {/* {<Avatar src={Image} sx={{ width: 34, height: 34 }} />}
                      </Grid> */}
                      <Grid key={`${i}4`} item xs={true}>
                        <Typography fontFamily={"sans-serif"} variant="title">
                          {bid.name}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          {"username"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                }
                <Typography fontFamily={"monospace"} color="h4" variant="body2">
                  {bid.bid}$
                </Typography>
                <Divider />
                <Button
                  variant="text"
                  sx={{ color: green[500] }}
                  aria-label="settings"
                >
                  Sell
                </Button>
                <Button
                  variant="text"
                  sx={{ color: red[500] }}
                  aria-label="settings"
                >
                  Decline
                </Button>
              </Stack>
            </Box>
          );
        })}
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
      </Stack>
    </Box>
  );
};

export default Bids;
