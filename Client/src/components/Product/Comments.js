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
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Fragment } from "react";
import Image from "../../img.jpg";
import theme from "../UI/Theme";

const Comments = (props) => {
  const [amount, setAmount] = useState(0);
  let start = -3 - amount;
  let end = amount > 0 ? 0 - amount : undefined;
  let comments = props.comments.slice(start, end);
  return (
    <ThemeProvider theme={theme}>
      <Box p={1} justifyContent="center">
        <Box px={2}>
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

        {comments.map((comment) => {
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
        <Box mt={1} px={2}>
          <Button
            onClick={() => {
              if (0 - start < props.comments.length) {
                setAmount(amount + 2);
              }
            }}
            fullWidth
            variant="text"
            size="small"
          >
            Load More Comments
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Comments;
