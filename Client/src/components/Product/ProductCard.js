import React, { Fragment } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "../../img.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ThemeProvider, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import theme from "../UI/Theme";
import Bids from "./Bids";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SpokeIcon from "@mui/icons-material/Spoke";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "./Comments";
import Menu from "@mui/material/Menu";

const users = [
  { name: "safvan" },
  { name: "lukman" },
  { name: "test1" },
  { name: "subhan" },

  { name: "test4" },
];

const comments = [
  {
    user: "tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "tester",
    message: "Lorem Ipsum zoom",
  },
  {
    user: "tester",
    message: "Lorem Ipsum zoom",
  },
];

const bids = [
  {
    name: "zack",
    bid: 180,
    time: "time",
  },
  {
    name: "zack",
    bid: 180,
    time: "time",
  },
  {
    name: "zack",
    bid: 180,
    time: "time",
  },
  {
    name: "zack",
    bid: 180,
    time: "time",
  },
  {
    name: "zack",
    bid: 180,
    time: "time",
  },
];
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },

  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
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
  const [expandedComment, setExpandedComment] = React.useState(false);
  const [currency, setCurrency] = React.useState("EUR");
  const [isEmpty, setIsEmpty] = React.useState(true);

  const [anchorRe, setAnchorRe] = React.useState(null);
  const open = Boolean(anchorRe);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleOpenRe = (event) => {
    setAnchorRe(event.currentTarget);
  };
  const handleCloseRe = () => {
    setAnchorRe(null);
  };

  //One State Behind
  const handleChangeAdd = (e) => {
    setIsEmpty(!e.target.value || e.target.value < 1);
    props.status.setAmounts((amount) => ({
      ...amount,
      ...{ [e.target.id]: e.target.value },
    }));
    // console.log(props.status.amounts);
  };

  //
  const handleExpandDesc = () => {
    setExpandedDesc(!expandedDesc);
  };
  const handleExpandBid = () => {
    setExpandedComment(false);
    setExpandedBid(!expandedBid);
  };
  const handleExpandComment = () => {
    setExpandedBid(false);
    setExpandedComment(!expandedComment);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 2 }}>
        <Card variant="outlined">
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
            <CardMedia
              component="img"
              height="164"
              image={Image}
              alt={props.product.name}
            />
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
              <IconButton aria-label="like">
                <FavoriteIcon color="red" />
              </IconButton>
              <IconButton p={1} aria-label="like">
                <ExpandMore
                  expand={expandedComment}
                  onClick={handleExpandComment}
                  aria-expandedComment={expandedComment}
                  aria-label="show more"
                >
                  <CommentIcon />
                </ExpandMore>
              </IconButton>
              <IconButton
                p={1}
                aria-label="reco"
                aria-controls={open ? "reme" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleOpenRe}
                id="reco"
              >
                <SpokeIcon />
              </IconButton>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorRe}
                p={1}
                m={1}
                open={open}
                onClose={handleCloseRe}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {users.map((user) => {
                  return (
                    <Stack
                      px={2}
                      py={1}
                      spacing={1}
                      justifyContent="left"
                      alignItems="center"
                      direction="row"
                    >
                      <Avatar src={Image} sx={{ width: 24, height: 24 }} />
                      <Typography variant="h6">{user.name}</Typography>
                      <Divider />
                    </Stack>
                  );
                })}
              </Menu>
              <IconButton p={1} aria-label="bid">
                <ExpandMore
                  expand={expandedBid}
                  onClick={handleExpandBid}
                  aria-expandedBid={expandedBid}
                  aria-label="show more"
                >
                  <MonetizationOnIcon />
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
            <Collapse in={expandedBid} timeout="auto" unmountOnExit>
              {/* <Box p={1} justifyContent="center">
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <item>
                    <TextField
                      size="small"
                      select
                      value={currency}
                      onChange={handleChange}
                      id="curr"
                      label="Cur"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </item>
                  <item>
                    <TextField
                      size="small"
                      maxRows="1"
                      id={`amount${props.index}`}
                      onChange={handleChangeAdd}
                      label="Amount"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </item>
                  <item>
                    {isEmpty ? (
                      <Button disabled variant="outlined">
                        Bid
                      </Button>
                    ) : (
                      <Button variant="outlined">Bid</Button>
                    )}
                    
                  </item>
                </Stack>
              </Box> */}
              <Bids bids={bids} />
            </Collapse>
            <Collapse in={expandedComment} timeout="auto" unmountOnExit>
              <Comments comments={comments} />
            </Collapse>
          </React.Fragment>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
