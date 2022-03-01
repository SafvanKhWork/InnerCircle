import { Box } from "@mui/material";
import { Fragment } from "react";
import Header from "./components/Header";
import CurrentPage from "./components/Product/Products";

import products from "./data";

function App() {
  return (
    <Fragment>
      <Header />
      <Box pt={3} m={1}>
        <CurrentPage products={products} />
      </Box>
    </Fragment>
  );
}

export default App;
