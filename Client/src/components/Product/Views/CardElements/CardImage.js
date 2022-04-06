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
// import { StaticImage } from "gatsby-plugin-image";
import { myUrl, url } from "../../../../config";
import Image from "../../../../img/img.jpg";
import Vmag from "../../../../img/vimg.jpg";

function Item(props) {
  return (
    <Box maxHeight={200} minHeight={200}>
      {/* <StaticImage
        placeholder="blurred"
        //need to resize image
        component="img"
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

const CardImage = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const images = props.images;

  return (
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
            <Item key={i}>{url + img}</Item>
          ))}
        </Carousel>
      </div>
    </Box>
  );
};

export default CardImage;
