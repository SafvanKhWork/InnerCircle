import { useState } from "react";
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

function Item(props) {
  return (
    <Box>
      <CardMedia component="img" height="388" src={props.children} />
    </Box>
  );
}

const ActiveBox = (props) => {
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
  const images = [Image, Vmag];
  return (
    <Paper elevation={4}>
      <Card>
        <Box minHeight={510} maxHeight={510}>
          <CardHeader
            avatar={<Avatar src={Image} aria-label="recipe" />}
            title="Username"
            subheader="Created At"
          />

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
                  <Item>{img}</Item>
                ))}
              </Carousel>
            </div>
          </Box>

          <CardActions pb={1} disableSpacing>
            <IconButton
              aria-label="like"
              onClick={() => {
                setLiked(!liked);
              }}
            >
              {liked ? <Favorite sx={{ color: red[500] }} /> : <Favorite />}
            </IconButton>
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
