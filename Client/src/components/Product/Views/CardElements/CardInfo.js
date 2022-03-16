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

const CardInfo = (props) => {
  const { expandedDesc, product } = props;
  return (
    <CardContent>
      <Typography variant="h5" component="div">
        {product.name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {product.model}
      </Typography>
      <Collapse in={expandedDesc} timeout="auto" unmountOnExit>
        <Typography variant="body2">
          <br />
          {product.description}
        </Typography>
      </Collapse>
    </CardContent>
  );
};

export default CardInfo;
