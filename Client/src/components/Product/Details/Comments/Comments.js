import { Box, ThemeProvider } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { url, token } from "../../../../config";
import CommentPage from "./CommentPage";
import CommentScroll from "./CommentScroll";
import theme from "../../../../theme";
import NewComment from "./NewComment";

const Comments = (props) => {
  const { product } = props;
  const [comments, setComments] = useState(product.comments);
  const updateComments = async () => {
    const { data, status: responseStatus } = await axios.get(
      `${url}/comments/${product._id}`
    );
    if (responseStatus == 200) {
      setComments(data);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Box p={1} justifyContent="center">
        {props.desk ? <CommentScroll comments={comments} /> : ""}
        <NewComment
          update={updateComments}
          product={product}
          mt={props.desk ? 2 : 0}
        />
        {!props.desk ? <CommentPage comments={comments} /> : ""}
      </Box>
    </ThemeProvider>
  );
};

export default Comments;
