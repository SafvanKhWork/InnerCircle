import {
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  CardHeader,
  Divider,
  Grid,
  Button,
} from "@mui/material";

import {} from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Fragment } from "react";
import Image from "../../img.jpg";
import theme from "../UI/Theme";
import { Scrollbars } from "react-custom-scrollbars";

let changed = false;

const Comments = (props) => {
  const [page, setPage] = useState(0);

  const size = props.size || 3;

  let start = -size - page;
  let end = page > 0 ? 0 - page : undefined;
  let forward = false;
  let back = true;

  let comments = props.comments.slice(start, end).reverse();

  if (changed) {
    forward = end < 0;
    back = 0 - start < props.comments.length;
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

  changed = false;
  if (props.desk) {
    let comments = props.comments;
    return (
      <ThemeProvider theme={theme}>
        <Box p={1} justifyContent="center">
          <Scrollbars
            style={{ height: 430 }}
            autoHide
            autoHideTimeout={0}
            autoHideDuration={200}
          >
            {comments.map((comment, i) => {
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
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          {/* <Grid item key={`${i}1`} pl={1} pr={1}>
                        {<Avatar src={Image} sx={{ width: 34, height: 34 }} />}
                      </Grid> */}
                          <Grid item xs={true} key={`${i}2`}>
                            <Typography
                              fontFamily={"monospace"}
                              variant="title"
                            >
                              {comment.message}
                            </Typography>
                            <Typography
                              fontFamily={"sans-serif"}
                              color="text.secondary"
                              variant="body2"
                            >
                              {comment.user}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider />
                      </Fragment>
                    }
                  </Stack>
                </Box>
              );
            })}
          </Scrollbars>
          <Box mt={2}>
            <Stack spacing={1} direction="row">
              <TextField
                fullWidth
                id="comment"
                label="comment"
                defaultValue=""
                size="small"
              />
              <Button variant="outlined" size="small">
                Add
              </Button>
            </Stack>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  //Mobile
  return (
    <ThemeProvider theme={theme}>
      <Box p={1} justifyContent="center">
        <Box>
          <Stack spacing={1} direction="row">
            <TextField
              fullWidth
              id="comment"
              label="comment"
              defaultValue=""
              size="small"
            />
            <Button variant="outlined" size="small">
              Add
            </Button>
          </Stack>
        </Box>

        {comments.map((comment, i) => {
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
                      {/* <Grid item key={`${i}1`} pl={1} pr={1}>
                        {<Avatar src={Image} sx={{ width: 34, height: 34 }} />}
                      </Grid> */}
                      <Grid item xs={true} key={`${i}2`}>
                        <Typography fontFamily={"monospace"} variant="title">
                          {comment.message}
                        </Typography>
                        <Typography
                          fontFamily={"sans-serif"}
                          color="text.secondary"
                          variant="body2"
                        >
                          {comment.user}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Fragment>
                }
              </Stack>
            </Box>
          );
        })}
        <Box mt={1} px={2}>
          <Grid container justifyContent={"center"} spacing={1}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={!back ? true : false}
                onClick={() => {
                  if (back) {
                    changed = true;
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
                    changed = true;
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
      </Box>
    </ThemeProvider>
  );
};

export default Comments;
