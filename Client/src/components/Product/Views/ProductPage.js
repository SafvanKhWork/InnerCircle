import { useState } from "react";
import { Grid, ThemeProvider } from "@mui/material";

//
import theme from "../../../theme";
import SideBox from "./PageElements/Sidebox";
import ActiveBox from "./PageElements/ActiveBox";
import Alternatives from "./PageElements/Alternatives";

const ProductPage = (props) => {
  const [recc, setRecc] = useState(false);
  const [comm, setComm] = useState(false);
  const [value, setValue] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [expandedBids, setExpandedBids] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
    <ThemeProvider theme={theme}>
      <Grid container px={1} justifyContent="center" spacing={2}>
        <Grid item lg={3} xs={3}>
          <SideBox status={status} />
        </Grid>
        <Grid item lg={6} xs={6}>
          <ActiveBox status={status} />
        </Grid>
        <Grid item lg={3} xs={3}>
          <Alternatives />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default ProductPage;
