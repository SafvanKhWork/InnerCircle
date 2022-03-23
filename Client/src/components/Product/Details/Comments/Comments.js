import { Box, ThemeProvider } from "@mui/material";

import CommentPage from "./CommentPage";
import CommentScroll from "./CommentScroll";
import theme from "../../../../theme";
import NewComment from "./NewComment";

const Comments = (props) => {
  const comments = props.comments;

  return (
    <ThemeProvider theme={theme}>
      <Box p={1} justifyContent="center">
        {props.desk ? <CommentScroll comments={comments} /> : ""}
        <NewComment mt={props.desk ? 2 : 0} />
        {!props.desk ? <CommentPage comments={comments} /> : ""}
      </Box>
    </ThemeProvider>
  );
};

export default Comments;
