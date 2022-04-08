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
  Paper,
  LinearProgress,
} from "@mui/material";
import { Done, Add } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { url } from "../../config";
import { getToken, getUser } from "../../store/User/userSlice";
// import { getToken } from "../../../store/User/userSlice";
// import { url } from "../../../config";

// const acceptRequest = async (uname, authHeader) => {
//   console.log(authHeader);
//   await axios.patch(`${url}/accept-friend-request/${uname}`, authHeader);
// };
// const rejectRequest = async (uname, authHeader) => {
//   console.log(authHeader);
//   await axios.delete(`${url}/reject-friend-request/${uname}`, authHeader);
// };

const UserMinibar = (props) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const token = useSelector(getToken);
  let authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const account = useSelector(getUser);
  const acceptRequest = async (uname, authHeader) => {
    await axios.patch(
      `${url}/accept-friend-request/${uname}`,
      undefined,
      authHeader
    );
  };
  const rejectRequest = async (uname, authHeader) => {
    await axios.delete(`${url}/reject-friend-request/${uname}`, authHeader);
  };
  useEffect(async () => {
    async function getUserOn(uname) {
      try {
        const { data, status: responseStatus } = await axios.get(
          `${url}/user/${uname}`,
          authHeader
        );
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    }
    setUser(await getUserOn(props.user));
  }, []);
  const [inFriend, setInFriend] = useState(false);
  const [hasSentRequestTo, setHasSentRequestTo] = useState(false);
  useEffect(() => {
    setInFriend(account.circle.includes(user?.username));
    setHasSentRequestTo(account.sentFriendRequest.includes(user?.username));
  }, [user]);
  console.log({ inFriend, hasSentRequestTo });

  return (
    <Paper elevation={4}>
      <Box minHeight={50}>
        {loading ? (
          <LinearProgress />
        ) : (
          <Stack
            py={1}
            spacing={1}
            display="flex"
            justifyContent="space-between"
            alignItems="stretch"
            direction="row"
            minWidth={300}
          >
            <Grid container justifyContent="center" alignItems="center">
              <Grid item key={`${user?.username}3`} pl={1} pr={1}>
                {<Avatar src={user?.avatar} sx={{ width: 34, height: 34 }} />}
              </Grid>
              <Grid key={`${user?.username}4`} item xs={true}>
                <Typography fontFamily={"sans-serif"} variant="title">
                  {user?.name}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {user?.username}
                </Typography>
              </Grid>
            </Grid>

            {props.request ? (
              <Stack direction={"row"}>
                <Button
                  onClick={async (event) => {
                    await acceptRequest(user?.username, authHeader);
                  }}
                  variant="text"
                  sx={{ color: "green" }}
                >
                  Accept
                </Button>
                <Button
                  onClick={async (event) => {
                    await rejectRequest(props.user, authHeader);
                  }}
                  variant="text"
                  sx={{ color: "red" }}
                >
                  Reject
                </Button>
              </Stack>
            ) : (
              <Button
                disabled={hasSentRequestTo}
                onClick={async (event) => {
                  if (event.target.value === "Add Friend") {
                    await axios.post(
                      `${url}/add-friend/${props.user}`,
                      undefined,
                      authHeader
                    );
                    event.target.value = "Sent Request";
                  }
                  if (event.target.value === "Unfriend") {
                    await axios.delete(
                      `${url}/unfriend/${props.user}`,
                      undefined,
                      authHeader
                    );
                    event.target.value = "Add Friend";
                  }
                }}
                variant="text"
                sx={{ color: "green" }}
              >
                {inFriend ? "Unfriend" : " Add Friend"}
                {hasSentRequestTo ? "Sent Request" : " Add Friend"}
              </Button>
            )}
          </Stack>
        )}
      </Box>
    </Paper>
  );
};

export default UserMinibar;
