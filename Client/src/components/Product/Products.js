import Grid from "@mui/material/Grid";
import { useState, Fragment, useEffect } from "react";
import Stack from "@mui/material/Stack";

// import

import ProductCard from "./ProductCard";

const Products = (props) => {
  const products = props.products;
  const [amounts, setAmounts] = useState({});

  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape").matches
  );
  const status = { amounts, setAmounts };
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setIsLandscape(window.matchMedia("(orientation: landscape").matches);
    setWidth(window.innerWidth);
  });
  let s = props.s ? props.s : width < 700 ? 6 : width < 1150 ? 6 : 4;
  if (isLandscape) {
    return (
      <Grid
        container
        mt={width > 1150 ? 16 : 0}
        px={width > 1225 ? 18 : width > 850 ? 12 : 0}
        justifyContent="center"
        spacing={1}
      >
        {products.map((product, i) => {
          return (
            <Grid item lg={s} xs={s}>
              <ProductCard
                index={i}
                isPotrait={!isLandscape}
                status={status}
                product={product}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }
  if (!isLandscape) {
    return (
      <Stack spacing={2}>
        {products.map((product, i) => {
          return (
            <ProductCard
              index={i}
              status={status}
              isPotrait={!isLandscape}
              product={product}
            />
          );
        })}
      </Stack>
    );
  }
};

export default Products;
