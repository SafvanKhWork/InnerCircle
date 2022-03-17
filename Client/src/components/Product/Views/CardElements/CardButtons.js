import { useState, Fragment } from "react";
import {
  Grid,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  ThemeProvider,
  Divider,
  Collapse,
  Avatar,
  IconButton,
  TextField,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";
import {
  Share,
  AttachMoney,
  TextSnippet,
  Favorite,
  ExpandMore,
  MoreVert,
  Remove,
  Add,
  MonetizationOn,
  SpokeIcon,
  Comment,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import { red, green, blue, yellow } from "@mui/material/colors";

const ExpandMoreFun = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const handleToCart = {};

const handleClickSave = (e) => {
  if (e.target.value) {
    handleToCart[e.target.label] = e.target.value;
  }
};

const CardButtons = (props) => {
  const {
    expandedDesc,
    setExpandedDesc,
    expandedBid,
    setExpandedBid,
    expandedRecc,
    setExpandedRecc,
    expandedComment,
    setExpandedComment,
    liked,
    setLiked,
  } = props.thrower;
  console.log(props.thrower);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleExpandDesc = () => {
    setExpandedDesc(!expandedDesc);
  };
  const handleExpandBid = () => {
    setExpandedComment(false);
    setExpandedRecc(false);
    setExpandedBid(!expandedBid);
  };
  const handleExpandComment = () => {
    setExpandedBid(false);
    setExpandedComment(!expandedComment);
    setExpandedRecc(false);
  };
  const handleExpandRecc = () => {
    setExpandedBid(false);
    setExpandedComment(false);
    setExpandedRecc(!expandedRecc);
  };
  return (
    <Fragment>
      <CardActions p={1} disableSpacing>
        <IconButton aria-label="like" onClick={handleLike}>
          {liked ? <Favorite sx={{ color: red[500] }} /> : <Favorite />}
        </IconButton>
        <IconButton p={1} aria-label="like">
          <ExpandMoreFun
            expand={expandedComment}
            onClick={handleExpandComment}
            aria-expandedComment={expandedComment}
            aria-label="show more"
          >
            {expandedComment ? (
              <Comment sx={{ color: blue[500] }} />
            ) : (
              <Comment />
            )}
          </ExpandMoreFun>
        </IconButton>
        <IconButton p={1} aria-label="bid">
          <ExpandMoreFun
            expand={expandedBid}
            onClick={handleExpandBid}
            aria-expandedBid={expandedBid}
            aria-label="show more"
          >
            {expandedBid ? (
              <MonetizationOn sx={{ color: green[500] }} />
            ) : (
              <MonetizationOn />
            )}
          </ExpandMoreFun>
        </IconButton>
        <IconButton p={1} id="recc">
          <ExpandMoreFun
            expand={expandedRecc}
            onClick={handleExpandRecc}
            aria-expandedComment={expandedRecc}
            aria-label="show more"
          >
            {expandedRecc ? <Share sx={{ color: yellow[700] }} /> : <Share />}
          </ExpandMoreFun>
        </IconButton>

        <ExpandMoreFun
          expand={expandedDesc}
          onClick={handleExpandDesc}
          aria-expandedDesc={expandedDesc}
          aria-label="show more"
        >
          <ExpandMore />
        </ExpandMoreFun>
      </CardActions>
    </Fragment>
  );
};

export default CardButtons;
