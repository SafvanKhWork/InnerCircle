import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import IosShareIcon from "@mui/icons-material/IosShare";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { Stack, Grid, Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Scrollbars } from "react-custom-scrollbars";
import DoneIcon from "@mui/icons-material/Done";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ResultItem = (props) => {
  const [isSent, setIsSent] = useState(false);
  const user = props.user;

  return (
    <Stack
      px={2}
      py={1}
      spacing={1}
      justifyContent="left"
      alignItems="center"
      direction="row"
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item key={`${user.username}3`} pl={1} pr={1}>
          {<Avatar src={Image} sx={{ width: 34, height: 34 }} />}
        </Grid>
        <Grid key={`${user.username}4`} item xs={true}>
          <Typography fontFamily={"sans-serif"} variant="title">
            {user.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.username}
          </Typography>
        </Grid>
      </Grid>
      <IconButton
        onClick={() => {
          setIsSent(!isSent);
        }}
        variant="text"
      >
        {!isSent ? (
          <AddIcon sx={{ color: "primary" }} />
        ) : (
          <DoneIcon sx={{ color: "#4db6ac" }} />
        )}
      </IconButton>
    </Stack>
  );
};

export default ResultItem;
