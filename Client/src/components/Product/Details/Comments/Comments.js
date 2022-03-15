import { Box, ThemeProvider } from "@mui/material";

import CommentPage from "./CommentPage";
import CommentScroll from "./CommentScroll";
import theme from "../../../../theme";
import NewComment from "./NewComment";

const comments = [
  {
    user: "1",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "2tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "3tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "4tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "5tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "6tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "7tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "8tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "9tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "3tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "4tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "5tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "6tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "7tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "8tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "9tester",
    message:
      "Tempor sint qui cillum id deserunt culpa duis eiusmod commodo sint irure non proident non.",
  },
];

const Comments = (props) => {
  //Mobile
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
