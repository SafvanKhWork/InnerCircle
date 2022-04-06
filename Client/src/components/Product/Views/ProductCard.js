import { useState, Fragment } from "react";
import { Box, Card, ThemeProvider, Paper } from "@mui/material";
import { Link } from "react-router-dom";

//

import theme from "../../../theme";
import CardHead from "./CardElements/CardHead";
import CardImage from "./CardElements/CardImage";
import CardInfo from "./CardElements/CardInfo";
import CardButtons from "./CardElements/CardButtons";
import CardActivity from "./CardElements/CardActivity";

export default function ProductCard(props) {
  const [expandedDesc, setExpandedDesc] = useState(false);
  const [expandedBid, setExpandedBid] = useState(false);
  const [expandedRecc, setExpandedRecc] = useState(false);
  const [expandedComment, setExpandedComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const { product } = props;
  const values = {
    expandedDesc,
    expandedBid,
    expandedRecc,
    expandedComment,
    liked,
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 2 }}>
        <Paper elevation={4}>
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
