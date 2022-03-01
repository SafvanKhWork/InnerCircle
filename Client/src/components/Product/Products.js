import Grid from "@mui/material/Grid";
import { useState, Fragment, useEffect } from "react";
import Stack from "@mui/material/Stack";

// import

import ProductCard from "./ProductCard";

const Products = (props) => {
  const products = props.products;
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape").matches
  );
  window.addEventListener("resize", () =>
    setIsLandscape(window.matchMedia("(orientation: landscape").matches)
  );
  if (isLandscape) {
    return (
      <Grid container justifyContent="center" spacing={1}>
        {products.map((product) => {
          return (
            <Grid item lg={3} xs={3}>
              <ProductCard isPotrait={!isLandscape} product={product} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
  if (!isLandscape) {
    return (
      <Stack spacing={1}>
        {products.map((product) => {
          return <ProductCard isPotrait={!isLandscape} product={product} />;
        })}
      </Stack>
    );
  }
};

export default Products;
