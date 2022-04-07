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

import Bid from "./SingleBid";
import { useSelector } from "react-redux";
import { getToken, getUser } from "../../../../store/User/userSlice";

let visitOn = false;
const Bids = (props) => {
  const [page, setPage] = useState(0);
  const account = useSelector(getUser);
  const size = props.size || 3;
  const setVisit = (value) => {
    visitOn = value;
  };
  let start = -size - page;
  let end = page > 0 ? 0 - page : undefined;

  let bids = [...props.bids]
    .sort(function (a, b) {
      return a.bid - b.bid;
    })
    .slice(start, end)
    .sort(function (a, b) {
      return b.bid - a.bid;
    });

  if (props.desk) {
    bids = [...props.bids].sort(function (a, b) {
      return b.bid - a.bid;
    });
  }

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

  setVisit(false);

  return (
    <Box p={1} mx={1}>
      <Stack spacing={1}>
        {bids.map((bid) => {
          return (
            <Box key={bid._id} p={1}>
              <Bid
                bid={bid}
                isOwner={account.username === props.product.owner.username}
              />
            </Box>
          );
        })}

        {!props.desk ? (
          <Box mt={1} px={2}>
            <Stack
              direction={"row"}
              display="flex"
              justifyContent={"space-between"}
            >
              <Button
                disabled={!back ? true : false}
                onClick={() => {
                  if (back) {
                    visitOn = true;
                    setPage(page + 2);
                  }
                }}
                fullWidth
              >
                <ArrowBack />
              </Button>

              <Button
                disabled={!forward ? true : false}
                onClick={() => {
                  if (forward) {
                    visitOn = true;
                    setPage(page - 2);
                  }
                }}
                fullWidth
              >
                <ArrowForward />
              </Button>
            </Stack>
          </Box>
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
};

export default Bids;
