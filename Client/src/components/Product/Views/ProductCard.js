import { useState, Fragment, useRef, useLayoutEffect, useEffect } from "react";
import { Box, Card, ThemeProvider, Paper } from "@mui/material";
import { Link } from "react-router-dom";

//

import theme from "../../../theme";
import CardHead from "./CardElements/CardHead";
import CardImage from "./CardElements/CardImage";
import CardInfo from "./CardElements/CardInfo";
import CardButtons from "./CardElements/CardButtons";
import CardActivity from "./CardElements/CardActivity";
import { useDispatch, useSelector } from "react-redux";
import applicationStateSlice, {
  setCardHeight,
} from "../../../store/ApplicationStates/applicationStateSlice";

export default function ProductCard(props) {
  const targetRef = useRef();
  const dispatch = useDispatch();
  const [expandedDesc, setExpandedDesc] = useState(false);
  const [expandedBid, setExpandedBid] = useState(false);
  const [expandedRecc, setExpandedRecc] = useState(false);
  const [expandedComment, setExpandedComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [height, setHeight] = useState(0);
  const { product } = props;
  const values = {
    expandedDesc,
    expandedBid,
    expandedRecc,
    expandedComment,
    liked,
  };
  // const minHeight = useSelector((state) => state.applicationState.cardHeight);
  // useLayoutEffect(() => {
  //   if (targetRef.current) {
  //     setHeight(targetRef.current.offsetHeight);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (height > minHeight) {
  //     dispatch(setCardHeight(height));
  //   }
  // }, [height]);
  // console.log(height, minHeight);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 2 }}>
        <Paper ref={targetRef} elevation={4}>
          <Card variant="text">
            <CardHead product={product} />

            {props.isPotrait ? (
              <Fragment>
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={`/product/${product._id}`}
                >
                  <CardImage images={product.images} />
                  <CardInfo
                    expandedDesc={expandedDesc}
                    product={props.product}
                  />
                </Link>
                <CardButtons
                  thrower={{
                    setExpandedDesc,
                    setExpandedBid,
                    setExpandedRecc,
                    setExpandedComment,
                    setLiked,
                    ...values,
                  }}
                />
                <CardActivity product={product} catcher={values} />
              </Fragment>
            ) : (
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={`/product/${props.product._id}`}
              >
                <CardImage images={product.images} />
                <CardInfo expandedDesc={expandedDesc} product={props.product} />
              </Link>
            )}
          </Card>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
