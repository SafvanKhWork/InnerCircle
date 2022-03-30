import {
  Box,
  Stack,
  Typography,
  Button,
  Collapse,
  Avatar,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { getToken, getUser } from "../../../../store/User/userSlice";

//

import Image from "../../../../img/img.jpg";
import { url } from "../../../../config";
import { useSelector } from "react-redux";

const Bid = (props) => {
  const [opt, setOpt] = useState(false);
  const [user, setUser] = useState(false);
  const token = useSelector(getToken);
  useEffect(() => {
    async function getUser(id) {
      const { data, status: responseStatus } = await axios.get(
        `${url}/user/id/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(data);
    }
    getUser(bid.user);
  }, []);

  const bid = props.bid;

  return (
    <div
      onClick={(event) => {
        if (!event.target.className.includes("MuiButton-root")) {
          setOpt(!opt);
        }
      }}
    >
      <Stack spacing={1} justifyContent="space-between" direction="row">
        {
          <Stack
            display={"flex"}
            alignContent={"flex-start"}
            spacing={1}
            direction="row"
          >
            <Avatar src={Image} sx={{ width: 34, height: 34 }} />

            <Stack>
              <Typography fontFamily={"sans-serif"} variant="title">
                {user.name}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {user.username}
              </Typography>
            </Stack>
          </Stack>
        }

        <Box justifyContent={"center"}>
          <Typography
            fontSize={18}
            fontFamily={"monospace"}
            color="h4"
            variant="body2"
          >
            {bid.bid}$
          </Typography>
        </Box>
      </Stack>
      <Box pt={1}>
        <Collapse in={opt}>
          <Stack spacing={1} direction="row">
            <Button
              color="inherit"
              variant="outlined"
              fullWidth
              sx={{ color: green[500] }}
            >
              Sell
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              fullWidth
              sx={{ color: red[500] }}
            >
              Decline
            </Button>
          </Stack>
        </Collapse>
      </Box>
    </div>
  );
};

export default Bid;
