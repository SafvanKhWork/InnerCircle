import { Scrollbars } from "react-custom-scrollbars";

//

import Comment from "./SingleComment";

const CommentScroll = (props) => {
  let comments = [...props.comments].reverse();

  return (
    <Scrollbars
      style={{ height: 430 }}
      autoHide
      autoHideTimeout={0}
      autoHideDuration={200}
    >
      {comments.map((comment, i) => {
        return <Comment key={i} comment={comment} />;
      })}
    </Scrollbars>
  );
};

export default CommentScroll;
