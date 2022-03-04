import {
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  CardHeader,
} from "@mui/material";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Fragment } from "react";
import Image from "../../img.jpg";

const Bids = (props) => {
  return (
    <Box pt={1} justifyContent="left">
      {props.bids.map((bid) => {
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <CardHeader
            avatar={<Avatar src={Image} sx={{ width: 34, height: 34 }} />}
            action={
              <Stack
                pl={14}
                justifyContent="right"
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <IconButton aria-label="settings">
                  <ThumbUpIcon />
                </IconButton>
                <IconButton aria-label="settings">
                  <ThumbDownIcon />
                </IconButton>
              </Stack>
            }
            title={<Typography variant="h6">{bid.bid}$</Typography>}
            subheader={
              <Typography color="text.secondary" variant="body2">
                {bid.name}
              </Typography>
            }
          />
        </Stack>;
      })}
    </Box>
  );
};

export default Bids;
