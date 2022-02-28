import { Box } from "@mui/material";
import { Fragment } from "react";
import Header from "./components/Header";
import CurrentPage from "./components/Product/Products";

function App() {
  return (
    <Fragment>
      <Header />
      <Box pt={3} m={1}>
        <CurrentPage />
      </Box>
    </Fragment>
  );
}

export default App;
