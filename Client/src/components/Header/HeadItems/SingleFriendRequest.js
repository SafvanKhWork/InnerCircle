import { useState, useEffect } from "react";
import axios from "axios";

import {
  Stack,
  Grid,
  Button,
  IconButton,
  Box,
  Avatar,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { Done, Add } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getToken } from "../../../store/User/userSlice";
import { url } from "../../../config";

const acceptRequest = async (uname, token) => {
  await axios.patch(`${url}/accept-friend-request/${uname}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const rejectRequest = async (uname, token) => {
  await axios.delete(`${url}/reject-friend-request/${uname}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const SingleFriendRequest = (props) => {
  console.log("entered");
  const [user, setUser] = useState(true);
  const token = useSelector(getToken);
  useEffect(async () => {
    console.log(props);
    async function getUser(uname) {
      const { data, status: responseStatus } = await axios.get(
        `${url}/user/${uname}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    }
    setUser(await getUser(props.user));
  }, []);

  return (
    <Stack
      py={1}
      spacing={1}
      display="flex"
      justifyContent="space-between"
      alignItems="stretch"
      direction="row"
      minWidth={350}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item key={`${user.username}3`} pl={1} pr={1}>
          {<Avatar src={user.avatar} sx={{ width: 34, height: 34 }} />}
        </Grid>
        <Grid key={`${user.username}4`} item xs={true}>
          <Typography fontFamily={"sans-serif"} variant="title">
            {user.name || "[Deleted User]"}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.username || "[Deleted User]"}
          </Typography>
        </Grid>
      </Grid>
      <Stack direction={"row"}>
        <Button
          onClick={async (event) => await acceptRequest(user.username, token)}
          variant="text"
          sx={{ color: "green" }}
        >
          Accept
        </Button>
        <Button
          onClick={async (event) => {
            await rejectRequest(user.username, token);
          }}
          variant="text"
          sx={{ color: "red" }}
        >
          Reject
        </Button>
      </Stack>
    </Stack>
  );
};

export default SingleFriendRequest;
