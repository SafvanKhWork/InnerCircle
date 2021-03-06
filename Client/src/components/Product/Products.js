import { Grid, LinearProgress, Stack } from "@mui/material";
import { useState, Fragment, useEffect, useRef } from "react";

//

import ProductCard from "./Views/ProductCard";

const Products = (props) => {
  const products = props.products || [];
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
  if (isLandscape && !props.infiScroll) {
    return (
      <Grid container justifyContent="start" spacing={1}>
        {products.map((product, i) => {
          return (
            <Grid key={product.product_name} item lg={s} xs={s}>
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
  if (!isLandscape || props.infiScroll) {
    return (
      <Stack spacing={2}>
        {products.map((product, i) => {
          return (
            <ProductCard
              key={product._id}
              infiScroll
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
