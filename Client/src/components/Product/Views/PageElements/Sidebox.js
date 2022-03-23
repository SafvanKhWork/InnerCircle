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

import Bids from "../../Details/Bids/Bids";
import NewBid from "../../Details/Bids/NewBid";
import Search from "../../../Search/Search";
import Comments from "../../Details/Comments/Comments";

const SideBox = (props) => {
  const product = props.product;
  const bids = product.bids;
  const comments = product.comments;

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
                <Typography variant="h5" component="div">
                  {"name"}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {"MDNM123"}
                </Typography>
                <Scrollbars
                  style={{ height: 200 }}
                  autoHide
                  autoHideTimeout={0}
                  autoHideDuration={200}
                >
                  <Typography
                    textAlign={"left"}
                    fontFamily={"sans-serif"}
                    variant="body2"
                  >
                    {
                      "Cupidatat ad velit nostrud laborum elit ad. Fugiat cupidatat velit incididunt labore nisi ea nostrud veniam exercitation adipisicing in velit. Sint in id elit quis duis. Consequat Lorem eu sit quis amet nostrud commodo ut. Enim mollit exercitation reprehenderit minim aute. Elit nostrud quis commodo ex mollit laboris esse. Lorem laboris laboris laboris magna. Sint consectetur incididunt ut eiusmod nulla nostrud tempor incididunt sunt deserunt id. Eiusmod minim eu aute sunt. Officia in ex ut commodo excepteur labore. Ut qui nostrud enim culpa. Eiusmod adipisicing ut est ut non nostrud. Dolore excepteur eu sint eu officia laborum id aliquip commodo consectetur excepteur. Do dolore elit minim eiusmod."
                    }
                  </Typography>
                </Scrollbars>
              </CardContent>
              <Stack px={2} pt={8}>
                <Stack justifyContent="space-between" direction={"row"}>
                  <Typography sx={{ fontWeight: "bold" }} variant="body2">
                    Highest Bid:
                  </Typography>

                  <Typography fontFamily={"monospace"} variant="subtitle2">
                    1200$
                  </Typography>
                </Stack>

                <Stack justifyContent="space-between" direction={"row"}>
                  <Typography sx={{ fontWeight: "bold" }} variant="body2">
                    Your Current Bid:
                  </Typography>

                  <Typography fontFamily={"monospace"} variant="subtitle2">
                    1190$
                  </Typography>
                </Stack>
              </Stack>
              <Box pt={5}>
                <NewBid />
              </Box>
            </Collapse>
            <Collapse in={expandedBids}>
              <Scrollbars
                style={{ height: 500 }}
                autoHide
                autoHideTimeout={0}
                autoHideDuration={200}
              >
                <Bids desk={true} bids={bids} />
              </Scrollbars>
            </Collapse>
            <Collapse in={comm}>
              <Comments size={12} desk={true} />
            </Collapse>
            <Collapse in={recc}>
              <Box pt={2}>
                <Search show={true} />
              </Box>
            </Collapse>
          </Box>
        </Box>
      </Card>
    </Paper>
  );
};

export default SideBox;
