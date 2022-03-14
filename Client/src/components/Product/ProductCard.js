import React, { Fragment } from "react";
import ShareIcon from "@mui/icons-material/Share";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Typography from "@mui/material/Typography";
import Image from "../../img/img.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ThemeProvider, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red, green, blue, yellow } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import { MenuItem, Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
import theme from "../UI/Theme";
import Bids from "./Bids";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SpokeIcon from "@mui/icons-material/Spoke";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "./Comments";
import Menu from "@mui/material/Menu";
import SearchBar from "./Search";
import NewBid from "./NewBid";
import Carousel from "react-material-ui-carousel";
import Vmag from "../../img/vimg.jpg";

function Item(props) {
  return (
    <Box maxHeight={200} minHeight={200}>
      {/* <img
        sx={{ flex: 1, height: "100%", width: "100%", resizeMode: "contain" }}
        src={props.children}
      /> */}
      <CardMedia
        //need to resize image
        component="img"
        src={props.children}
      />
    </Box>
  );
}

const handleToCart = {};

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
];

const bids = [
  {
    name: "zack1",
    bid: 1800,
    time: "time",
  },
  {
    name: "zack",
    bid: 18,
    time: "time",
  },
  {
    name: "zack",
    bid: 190,
    time: "time",
  },
  {
    name: "zack",
    bid: 1,
    time: "time",
  },
  {
    name: "zack",
    bid: 186,
    time: "time",
  },
];

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard(props) {
  const [expandedDesc, setExpandedDesc] = React.useState(false);
  const [expandedBid, setExpandedBid] = React.useState(false);
  const [expandedRecc, setExpandedRecc] = React.useState(false);
  const [expandedComment, setExpandedComment] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const [liked, setLiked] = React.useState(false);

  const images = [Image, Vmag, Image];
  //

  const handleClickSave = (e) => {
    if (e.target.value) {
      handleToCart[e.target.label] = e.target.value;
    }
  };
  //

  const handleLike = () => {
    setLiked(!liked);
  };

  //

  //
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
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 2 }}>
        <Paper elevation={4}>
          <Card variant="text">
            <React.Fragment>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    S
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Username"
                subheader="Created At"
              />
              <Box maxHeight={200} minHeight={200}>
                <div
                  onMouseEnter={() => setIsFocused(true)}
                  onMouseLeave={() => setIsFocused(false)}
                >
                  <Carousel
                    indicators={false}
                    autoPlay={isFocused}
                    interval={3000}
                    stopAutoPlayOnHover={false}
                    navButtonsAlwaysInvisible
                    cycleNavigation={true}
                    duration={1000}
                    animation="fade"
                  >
                    {images.map((img, i) => (
                      <Item key={i}>{img}</Item>
                    ))}
                  </Carousel>
                </div>
              </Box>
              <CardContent>
                <Typography variant="h5" component="div">
                  {props.product.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {props.product.model}
                </Typography>

                {props.isPotrait ? (
                  <Collapse in={expandedDesc} timeout="auto" unmountOnExit>
                    <Typography variant="body2">
                      <br />
                      {props.product.description}
                    </Typography>
                  </Collapse>
                ) : (
                  ""
                )}
              </CardContent>
              <CardActions p={1} disableSpacing>
                <IconButton aria-label="like" onClick={handleLike}>
                  {liked ? (
                    <FavoriteIcon sx={{ color: red[500] }} />
                  ) : (
                    <FavoriteIcon />
                  )}
                </IconButton>
                <IconButton p={1} aria-label="like">
                  <ExpandMore
                    expand={expandedComment}
                    onClick={handleExpandComment}
                    aria-expandedComment={expandedComment}
                    aria-label="show more"
                  >
                    {expandedComment ? (
                      <CommentIcon sx={{ color: blue[500] }} />
                    ) : (
                      <CommentIcon />
                    )}
                  </ExpandMore>
                </IconButton>
                <IconButton p={1} aria-label="bid">
                  <ExpandMore
                    expand={expandedBid}
                    onClick={handleExpandBid}
                    aria-expandedBid={expandedBid}
                    aria-label="show more"
                  >
                    {expandedBid ? (
                      <MonetizationOnIcon sx={{ color: green[500] }} />
                    ) : (
                      <MonetizationOnIcon />
                    )}
                  </ExpandMore>
                </IconButton>
                <IconButton p={1} id="recc">
                  <ExpandMore
                    expand={expandedRecc}
                    onClick={handleExpandRecc}
                    aria-expandedComment={expandedRecc}
                    aria-label="show more"
                  >
                    {expandedRecc ? (
                      <ShareIcon sx={{ color: yellow[700] }} />
                    ) : (
                      <ShareIcon />
                    )}
                  </ExpandMore>
                </IconButton>

                {!props.isPotrait ? (
                  ""
                ) : (
                  <ExpandMore
                    expand={expandedDesc}
                    onClick={handleExpandDesc}
                    aria-expandedDesc={expandedDesc}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                )}
              </CardActions>
              <Stack direction={"column-reverse"}>
                <Collapse in={expandedBid} timeout="auto" unmountOnExit>
                  <NewBid />
                  <Bids bids={bids} />
                </Collapse>
                <Collapse in={expandedRecc} timeout="auto" unmountOnExit>
                  <Box justifyContent="center" p={1}>
                    <SearchBar />
                  </Box>
                </Collapse>
                <Collapse in={expandedComment} timeout="auto" unmountOnExit>
                  <Comments comments={comments} />
                </Collapse>
              </Stack>
            </React.Fragment>
          </Card>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
