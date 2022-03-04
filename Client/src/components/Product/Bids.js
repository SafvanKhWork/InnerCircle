import {
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Fragment } from "react";
import Image from "../../img.jpg";

const Bids = (props) => {
  return (
    <Box pt={1} justifyContent="center">
      {props.bids.map((bid) => {
        return (
          <Box p={1}>
            <Stack
              spacing={1}
              justifyContent="center"
              alignItems="center"
              direction="row"
            >
              {
                <Fragment>
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item pl={1} pr={1}>
                      {<Avatar src={Image} sx={{ width: 34, height: 34 }} />}
                    </Grid>
                    <Grid item xs={true}>
                      <Typography variant="h6">{bid.bid}$</Typography>
                      <Typography color="text.secondary" variant="body2">
                        {bid.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton aria-label="settings">
                        <ThumbUpIcon />
                      </IconButton>
                      <IconButton aria-label="settings">
                        <ThumbDownIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Divider />
                </Fragment>
              }
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
};

export default Bids;