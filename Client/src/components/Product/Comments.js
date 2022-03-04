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

const Comments = (props) => {
  return (
    <Box pt={1} justifyContent="center">
      {props.comments.map((comment) => {
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
                      <Typography variant="title">{comment.user}$</Typography>
                      <Typography color="text.secondary" variant="body2">
                        {comment.message}
                      </Typography>
                    </Grid>
                    <Grid item></Grid>
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

export default Comments;
