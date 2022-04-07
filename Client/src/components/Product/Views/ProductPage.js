import { useState, useEffect, Fragment } from "react";
import { Grid, ThemeProvider, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../../config";

//

import theme from "../../../theme";
import SideBox from "./PageElements/Sidebox";
import ActiveBox from "./PageElements/ActiveBox";
import Alternatives from "./PageElements/Alternatives";
import { useDispatch, useSelector } from "react-redux";
import {
  exitProduct,
  refreshProduct,
} from "../../../store/Products/productInViewSlice";

const ProductPage = (props) => {
  const { id: productID } = useParams();
  const [recc, setRecc] = useState(false);
  const [comm, setComm] = useState(false);
  const [value, setValue] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [expandedBids, setExpandedBids] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inProgress, setInProgress] = useState(true);
  const dispatch = useDispatch();
  //Relocate
  async function updateProduct(id) {
    const { data, status: responseStatus } = await axios.get(
      `${url}/products/id/${id}`
    );
    dispatch(refreshProduct(data));
  }

  const product = useSelector((state) => state.productInView);
  //

  useEffect(async () => {
    await updateProduct(productID);
    setInProgress(false);

    return () => {
      dispatch(exitProduct());
    };
  }, []);

  const status = {
    recc,
    setRecc,
    comm,
    setComm,
    value,
    setValue,
    width,
    setWidth,
    expandedBids,
    setExpandedBids,
    liked,
    setLiked,
    isFocused,
    setIsFocused,
  };

  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });

  return (
    <Fragment>
      {inProgress ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            py: 4,
          }}
        >
          <CircularProgress
            size={56}
            variant="indeterminate"
            sx={{ color: "#4db6ac" }}
          />
        </Box>
      ) : (
        <ThemeProvider theme={theme}>
          <Grid container px={1} justifyContent="center" spacing={2}>
            <Grid item lg={3} xs={3}>
              <SideBox
                updateProduct={async () => {
                  updateProduct(product._id);
                }}
                product={product}
                status={status}
              />
            </Grid>
            <Grid item lg={6} xs={6}>
              <ActiveBox product={product} status={status} />
            </Grid>
            <Grid item lg={3} xs={3}>
              <Alternatives product={product} />
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </Fragment>
  );
};
export default ProductPage;
