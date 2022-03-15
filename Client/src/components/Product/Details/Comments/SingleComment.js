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
  ThemeProvider,
  TextField,
} from "@mui/material";
import { Send, ArrowForward, ArrowBack } from "@mui/icons-material";
import { useState, Fragment } from "react";
import { Scrollbars } from "react-custom-scrollbars";

const Comment = (props) => {
  const i = props.key;
  const comment = props.comment;
  return (
    <Box p={1}>
      {
        <Stack
          display={"flex"}
          alignContent={"flex-start"}
          spacing={1}
          direction="row"
        >
          <Box pt={1}>
            <Avatar src={Image} sx={{ width: 34, height: 34 }} />
          </Box>
          <Stack>
            <Typography fontFamily={"sans-serif"} variant="subtitle2">
              {comment.user}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {comment.message}
            </Typography>
          </Stack>
        </Stack>
      }
    </Box>
  );
};

export default Comment;
