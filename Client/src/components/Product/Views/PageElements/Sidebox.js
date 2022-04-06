import { useState } from "react";
import {
  Card,
  Box,
  Collapse,
  Paper,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";

//

import Bids from "../../Details/Bids/Bids";
import NewBid from "../../Details/Bids/NewBid";
import Search from "../../../Search/Search";
import Comments from "../../Details/Comments/Comments";
import { useSelector } from "react-redux";
import { getUser } from "../../../../store/User/userSlice";

const SideBox = (props) => {
  const product = props.product;
  const bids = product.bids;
  const user = useSelector(getUser);
  const { recc, comm, expandedBids } = props.status;
  return (
    <Paper elevation={4}>
      <Card>
        <Box
          justifyContent={"space-between"}
          minHeight={500}
          maxHeight={500}
          py={1}
          px={2}
        >
          <Box pb={3} sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Collapse in={!expandedBids && !comm && !recc}>
              <CardContent>
                <Scrollbars
                  style={{ height: 260 }}
                  autoHide
                  autoHideTimeout={0}
                  autoHideDuration={200}
                >
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {product.model}
                  </Typography>

                  <Typography
                    textAlign={"left"}
                    fontFamily={"sans-serif"}
                    variant="body2"
                  >
                    {product.description}
                  </Typography>
                </Scrollbars>
              </CardContent>
              <Stack px={2} pt={8}>
                <Stack justifyContent="space-between" direction={"row"}>
                  <Typography sx={{ fontWeight: "bold" }} variant="body2">
                    Highest Bid:
                  </Typography>

                  <Typography fontFamily={"monospace"} variant="subtitle2">
                    {"1230$"}
                  </Typography>
                </Stack>

                <Stack justifyContent="space-between" direction={"row"}>
                  <Typography sx={{ fontWeight: "bold" }} variant="body2">
                    Your Current Bid:
                  </Typography>

                  <Typography fontFamily={"monospace"} variant="subtitle2">
                    {"1190$"}
                  </Typography>
                </Stack>
              </Stack>
              <Box pt={5}>
                <NewBid product={product} update={props.updateProduct} />
              </Box>
            </Collapse>
            <Collapse in={expandedBids}>
              <Scrollbars
                style={{ height: 445 }}
                autoHide
                autoHideTimeout={0}
                autoHideDuration={200}
              >
                <Bids product={product} desk={true} bids={bids} />
              </Scrollbars>
              <Box pt={1}>
                <NewBid product={product} update={props.updateProduct} />
              </Box>
            </Collapse>
            <Collapse in={comm}>
              <Comments product={product} size={12} desk={true} />
            </Collapse>
            <Collapse in={recc}>
              <Box pt={2}>
                <Search product={product} users={user.circle} show={true} />
              </Box>
            </Collapse>
          </Box>
        </Box>
      </Card>
    </Paper>
  );
};

export default SideBox;
