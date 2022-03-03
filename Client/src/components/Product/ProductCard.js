import React from "react";
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
import { ThemeProvider } from "@mui/material";
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
  const [currency, setCurrency] = React.useState("EUR");
  const [isEmpty, setIsEmpty] = React.useState(true);

  const handleChange = (event) => {
    setCurrency(event.target.value);
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
    setExpandedBid(!expandedBid);
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
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ExpandMore
                  expand={expandedBid}
                  onClick={handleExpandBid}
                  aria-expandedBid={expandedBid}
                  aria-label="show more"
                >
                  <AttachMoneyIcon />
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
              <Box p={1} justifyContent="center">
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
              </Box>
            </Collapse>
          </React.Fragment>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
