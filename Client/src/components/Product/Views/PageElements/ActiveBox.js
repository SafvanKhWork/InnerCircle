import { useEffect, useState } from "react";
import {
  Card,
  Box,
  CardActions,
  Collapse,
  Paper,
  Grid,
  Container,
  CardMedia,
  CardContent,
  Typography,
  Tab,
  Tabs,
  ThemeProvider,
  CardHeader,
  Avatar,
  Stack,
  IconButton,
  PagesOutlined,
} from "@mui/material";

import {
  MonetizationOn,
  Favorite,
  Comment,
  AddComment,
  Recommend,
  MoreVert,
  Share,
} from "@mui/icons-material";
import { red, green, blue, yellow } from "@mui/material/colors";
import { Scrollbars } from "react-custom-scrollbars";
import Carousel from "react-material-ui-carousel";

import Image from "../../../../img/img.jpg";
import Vmag from "../../../../img/vimg.jpg";
import CardHead from "../CardElements/CardHead";
import { url } from "../../../../config";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  getToken,
  refreshUser,
  getUser,
  refetchUser,
} from "../../../../store/User/userSlice";

function Item(props) {
  return (
    <Box>
      <CardMedia component="img" height="388" src={props.children} />
    </Box>
  );
}

const ActiveBox = (props) => {
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [refetched, setRefetched] = useState(false);
  let authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const {
    recc,
    setRecc,
    comm,
    setComm,
    value,
    setValue,
    width,
    setWidth,
    expandedBids,
    setExpandedBids,
    liked,
    setLiked,
    isFocused,
    setIsFocused,
  } = props.status;
  useEffect(() => {
    if (!liked && props.product.like.includes(String(user._id))) {
      setLiked(true);
      setRefetched(true);
    }
  }, [props.product]);
  const images = props.product.images;
  return (
    <Paper elevation={4}>
      <Card>
        <Box minHeight={510} maxHeight={510}>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/profile/${props.product.owner?.username}`}
          >
            <CardHead product={props.product} />
          </Link>
          <Box maxHeight={388} minHeight={388}>
            <div
              onMouseEnter={() => setIsFocused(true)}
              onMouseLeave={() => setIsFocused(false)}
            >
              <Carousel
                navButtonsWrapperProps="outside"
                cycleNavigation={true}
                duration={1000}
                interval={3000}
                animation="fade"
                stopAutoPlayOnHover={false}
                autoPlay={!isFocused}
                indicators={false}
              >
                {images.map((img, i) => (
                  <Item key={img + `${i}`}>{url + img}</Item>
                ))}
              </Carousel>
            </div>
          </Box>

          <CardActions pb={1} disableSpacing>
            <IconButton
              aria-label="like"
              onClick={async () => {
                await axios.patch(`${url}/like/${props.product._id}`, "", {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                dispatch(refetchUser());
                setRefetched(false);
                setLiked(!liked);
              }}
            >
              {liked ? <Favorite sx={{ color: red[500] }} /> : <Favorite />}
            </IconButton>
            <Typography sx={{ color: red[500] }}>
              {liked && !refetched
                ? props.product.likes + 1
                : props.product.likes || 0}
            </Typography>
            <IconButton
              onClick={() => {
                setComm(false);
                setComm(!comm);
                setExpandedBids(false);
              }}
              aria-label="settings"
            >
              {comm ? (
                <Comment sx={{ color: "#2196f3" }} fontSize="medium" />
              ) : (
                <Comment fontSize="medium" />
              )}
            </IconButton>
            <IconButton
              p={1}
              onClick={() => {
                setExpandedBids(!expandedBids);
                setComm(false);
                setRecc(false);
              }}
              aria-label="bid"
            >
              {expandedBids ? (
                <MonetizationOn sx={{ color: green[500] }} />
              ) : (
                <MonetizationOn />
              )}
            </IconButton>
            <IconButton
              onClick={() => {
                setRecc(!recc);
                setExpandedBids(false);
                setComm(false);
              }}
              aria-label="settings"
            >
              {!recc ? (
                <Share fontSize="medium" />
              ) : (
                <Share sx={{ color: "#fbc02d" }} fontSize="medium" />
              )}
            </IconButton>
          </CardActions>
        </Box>
      </Card>
    </Paper>
  );
};

export default ActiveBox;
