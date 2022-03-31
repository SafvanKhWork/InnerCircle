import { useState, Fragment } from "react";
import { Box, Collapse, Stack } from "@mui/material";

import Bids from "../../Details/Bids/Bids";
import Comments from "../../Details/Comments/Comments";
import SearchBar from "../../../Search/Search";
import NewBid from "../../Details/Bids/NewBid";

const CardActivity = (props) => {
  const { expandedDesc, expandedBid, expandedRecc, expandedComment, liked } =
    props.catcher;
  const { product } = props;
  return (
    <Stack direction={"column-reverse"}>
      <Collapse in={expandedBid} timeout="auto" unmountOnExit>
        <NewBid />
        <Bids product={product} bids={product.bids} />
      </Collapse>
      <Collapse in={expandedRecc} timeout="auto" unmountOnExit>
        <Box justifyContent="center" p={1}>
          <SearchBar />
        </Box>
      </Collapse>
      <Collapse in={expandedComment} timeout="auto" unmountOnExit>
        <Box textAlign={"justify"}>
          <Comments product={product} comments={product.comments} />
        </Box>
      </Collapse>
    </Stack>
  );
};

export default CardActivity;
