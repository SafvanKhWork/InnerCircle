import { Box, Stack, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState, Fragment } from "react";

//

import { url, token } from "../../../../config";

const addComment = async (msg) => {};

const NewComment = (props) => {
  const [comment, setComment] = useState("");
  const { reRenderer } = props;
  return (
    <Box mt={props.mt}>
      <Stack spacing={1} direction="row">
        <TextField
          fullWidth
          onChange={(e) => {
            if (e.target.value !== comment) {
              setComment(e.target.value);
            }
          }}
          id="comment"
          label="comment"
          defaultValue=""
          size="small"
        />
        <Button
          onClick={(e) => {
            addComment(comment);
            setComment("");
            reRenderer(comment[0]);
          }}
          variant="outlined"
          size="small"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default NewComment;
