import { Card } from "@mui/material";
import { Box, Paper } from "@mui/material";
import { Grid } from "@mui/material";
import { useState } from "react";
import { CardMedia } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import theme from "../UI/Theme";
import Image from "../../img.jpg";
import { CardHeader } from "@mui/material";
import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";

const ProductPage = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={4}>
        <Grid container px={1} justifyContent="center" spacing={8}>
          <Grid item lg={3} xs={3}>
            <Card>Comments</Card>
          </Grid>
          <Grid item lg={6} xs={6}>
            <Card>
              <CardHeader
                avatar={<Avatar src={Image} aria-label="recipe" />}
                action={
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                }
                title="Username"
                subheader="Created At"
              />
              <CardMedia component="img" height="164" image={Image} />
            </Card>
          </Grid>
          <Grid item lg={3} xs={3}>
            <Card>Bids</Card>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};
export default ProductPage;
