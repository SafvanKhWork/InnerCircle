import {
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  Grid,
  ButtonGroup,
  Card,
  Collapse,
} from "@mui/material";
import { useState } from "react";
import { green, red } from "@mui/material/colors";
import { IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Scrollbars } from "react-custom-scrollbars";
import { Avatar } from "@mui/material";
import { Fragment } from "react";
import Image from "../../img/img.jpg";

const Bid = (props) => {
  const [opt, setOpt] = useState(false);

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
          <Stack spacing={1} direction="row">
            <Avatar src={Image} sx={{ width: 34, height: 34 }} />

            <Stack>
              <Typography fontFamily={"sans-serif"} variant="title">
                {bid.name}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {"username"}
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