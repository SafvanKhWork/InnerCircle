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

//
import theme from "../../../../theme";
import Comment from "./SingleComment";

const NewComment = (props) => {
  return (
    <Box mt={props.mt}>
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
  );
};

export default NewComment;
