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

let visitOn = false;

const BidButtons = (props) => {
  const { start, end, page, setPage } = props.status;
  let forward = false;
  let back = true;
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
            <ArrowBack />
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
            <ArrowForward />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BidButtons;
