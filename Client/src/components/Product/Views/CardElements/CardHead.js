import { useState, Fragment } from "react";
import moment from "moment";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
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
import { red, green, blue, yellow } from "@mui/material/colors";

import Image from "../../../../img/img.jpg";

const CardHead = (props) => {
  const product = props.product;
  return (
    <CardHeader
      avatar={<Avatar src={product.owner.avatar} aria-label="recipe" />}
      title={`${product.owner.username}`}
      subheader={
        product.new ||
        `${formatDistance(new Date(product.createdAt), new Date(), {
          addSuffix: true,
        })}`
      }
    />
  );
};

export default CardHead;
