import Grid from "@mui/material/Grid";
import { useState, Fragment, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// import

import ProductCard from "./ProductCard";
const Products = (props) => {
  return (
    <Stack spacing={1}>
      {props.products.map((product) => {
        return <ProductCard isPotrait={true} product={product} />;
      })}
    </Stack>
  );
};

export default Products;
