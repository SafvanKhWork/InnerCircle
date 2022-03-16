import {
  Card,
  Box,
  CardActions,
  Collapse,
  Paper,
  Grid,
  Container,
  CardMedia,
  CardContent,
  Typography,
  Tab,
  Tabs,
  ThemeProvider,
  CardHeader,
  Avatar,
  Stack,
  IconButton,
  PagesOutlined,
} from "@mui/material";
import { Fragment } from "react";
import { Scrollbars } from "react-custom-scrollbars";

import products from "../../../../data";
import Products from "../../Products";

const Alternatives = (props) => {
  return (
    <Fragment>
      <Paper elevation={4}>
        <Box mb={1}>
          <Card variant="text">
            <Box display={"flex"} justifyContent={"center"}>
              <Typography fontFamily={"sans-serif"} fontSize={24}>
                Alternatives
              </Typography>
            </Box>
          </Card>
        </Box>
      </Paper>

      <Scrollbars
        style={{ height: "100%" }}
        autoHide
        autoHideTimeout={0}
        autoHideDuration={1000}
      >
        <Box p={1}>
          <Products infiScroll products={products} />
        </Box>
      </Scrollbars>
    </Fragment>
  );
};

export default Alternatives;
