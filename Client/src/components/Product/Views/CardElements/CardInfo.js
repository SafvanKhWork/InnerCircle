import { useEffect, useState, Fragment } from "react";
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
  AvatarGroup,
  Alert,
  AlertTitle,
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
  Assistant,
} from "@mui/icons-material";
import axios from "axios";
import { url } from "../../../../config";
import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import { red, green, blue, yellow } from "@mui/material/colors";
import { useSelector } from "react-redux";

const CardInfo = (props) => {
  const [suggesters, setSuggesters] = useState([]);
  const { expandedDesc, product } = props;
  const [recommandedBy, setRecommandedBy] = useState(undefined);
  const recommandedBy2 = useSelector((state) => state.products.recommandors);

  useEffect(() => {
    if (product && recommandedBy2) {
      setRecommandedBy(recommandedBy2[product.product_name]);
    }
  }, [recommandedBy2, product]);
  useEffect(async () => {
    const promises = recommandedBy?.map(
      async (user) => await axios.get(`${url}/user/${user}`)
    );
    if (promises) {
      const reUsers = await Promise.all(promises);
      const suggesterList = reUsers
        .map((element) => {
          if (element.data) {
            return element.data;
          }
        })
        .filter((data) => data);
      setSuggesters(suggesterList);
    }
  }, [recommandedBy]);

  return (
    <CardContent>
      <Stack direction={"row"} display="flex" justifyContent={"space-between"}>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>{" "}
        <Typography variant="h5" component="div">
          {"₹" + product.price}
        </Typography>
      </Stack>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {product.model}
      </Typography>
      {recommandedBy ? (
        <Box borderRadius={"0.2em"} sx={{ backgroundColor: "#d1ecea" }} p={0.8}>
          <Stack display={"flex"} direction="row" justifyContent={"flex-start"}>
            <AvatarGroup max={3}>
              {suggesters.map((user) => (
                <Avatar
                  key={user._id}
                  sx={{ width: 24, height: 24 }}
                  src={user.avatar}
                  alt={user.name}
                />
              ))}
            </AvatarGroup>
            <Typography
              fontFamily={"sans-serif"}
              fontStyle={"italic"}
              display={"flex"}
              alignSelf={"center"}
              fontSize={"medium"}
              sx={{ color: "" }}
            >
              {`${suggesters[0]?.username}${
                suggesters.length > 1 ? " and +" + (suggesters.length - 1) : ""
              } recommanded
              ${product?.name} to you.`}
            </Typography>
          </Stack>
        </Box>
      ) : (
        ""
      )}
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
