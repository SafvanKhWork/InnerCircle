import { useState, useEffect } from "react";
import {
  Stack,
  Grid,
  Button,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import { Done, Add } from "@mui/icons-material";
import { url } from "../../config";
import { useSelector } from "react-redux";
import { getToken, getUser } from "../../store/User/userSlice";
import axios from "axios";
import { refreshRecommandation } from "../../store/Products/productListSlice";
import { Link } from "react-router-dom";
//Work In Progress
const ResultItem = (props) => {
  const account = useSelector(getUser);
  const [isSent, setIsSent] = useState(false);
  const [user, setUser] = useState(props.user || {});
  const token = useSelector(getToken);
  const recommand = props.recommand;
  const product = useSelector((state) => state.productInView);
  const inFriend = account.circle.includes(user?.username);
  const hasSentRequestTo = account.sentFriendRequest.includes(user?.username);

  // console.log(user);
  useEffect(async () => {
    async function getUser(uname) {
      try {
        const { data, status: responseStatus } = await axios.get(
          `${url}/user/${uname}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(data);
        return data;
      } catch (error) {
        // console.log(error.message);
      }
    }
    // console.log(props.username);
    if (props.username) {
      setUser(await getUser(props.username));
    }
  }, [props.username]);
  const sendFriendRequest = async (user, product) => {
    axios.patch(
      `${url}/recommand`,
      { user, product },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  return (
    <Link to={`/profile/${user._id}`}>
      <Stack
        px={2}
        py={1}
        spacing={1}
        justifyContent="left"
        alignItems="center"
        direction="row"
      >
        <div onClick={props.handleCloseNavMenu}>
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
          <IconButton
            disabled={isSent}
            onClick={async () => {
              await sendFriendRequest(user?._id);
              setIsSent(true);
            }}
            variant="text"
          >
            {!isSent ? (
              <Add sx={{ color: "primary" }} />
            ) : (
              <Done sx={{ color: "#4db6ac" }} />
            )}
          </IconButton>
        </div>
      </Stack>
    </Link>
  );
};

export default ResultItem;
