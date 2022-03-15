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
import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import { red, green, blue, yellow } from "@mui/material/colors";

//

import theme from "../../../theme";
import Bids from "../Details/Bids/Bids";
import Comments from "../Details/Comments/Comments";
import Image from "../../../img/img.jpg";
import SearchBar from "../../Search/Search";
import NewBid from "../Details/Bids/NewBid";
import Vmag from "../../../img/vimg.jpg";

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
    user: "nine",
    message: "blue.",
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

export default function ProductCard(props) {
  const [expandedDesc, setExpandedDesc] = useState(false);
  const [expandedBid, setExpandedBid] = useState(false);
  const [expandedRecc, setExpandedRecc] = useState(false);
  const [expandedComment, setExpandedComment] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [liked, setLiked] = useState(false);

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
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  S
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVert />
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
                  {expandedRecc ? (
                    <Share sx={{ color: yellow[700] }} />
                  ) : (
                    <Share />
                  )}
                </ExpandMoreFun>
              </IconButton>

              {!props.isPotrait ? (
                ""
              ) : (
                <ExpandMoreFun
                  expand={expandedDesc}
                  onClick={handleExpandDesc}
                  aria-expandedDesc={expandedDesc}
                  aria-label="show more"
                >
                  <ExpandMore />
                </ExpandMoreFun>
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
                <Box textAlign={"justify"}>
                  <Comments comments={comments} />
                </Box>
              </Collapse>
            </Stack>
          </Card>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
