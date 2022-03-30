import { useState, useEffect } from "react";
import axios from "axios";

import {
  Stack,
  Grid,
  Button,
  IconButton,
  Avatar,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { Done, Add } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getToken } from "../../../store/User/userSlice";
import { url } from "../../../config";

const SingleFriendRequest = (props) => {
  const [user, setUser] = useState(true);
  const token = useSelector(getToken);
  useEffect(() => {
    async function getUser(uname) {
      const { data, status: responseStatus } = await axios.get(
        `${url}/user/${uname}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(data);
    }
    getUser(props.user);
  }, []);
  console.log(user);
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
      <ButtonGroup color="inherit" variant="contained">
        <Button sx={{ color: "green" }}>Accept</Button>
        <Button sx={{ color: "salmon" }}>Reject</Button>
      </ButtonGroup>
    </Stack>
  );
};

export default SingleFriendRequest;
