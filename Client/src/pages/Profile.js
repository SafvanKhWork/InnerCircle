import { CardMedia, Fab, Card, Box, Avatar, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import Products from "../components/Product/Products";
import theme from "../components/UI/Theme";
import Image from "../img/img.jpg";
import data from "../data";

const StyledAvatar = styled(Avatar)({
  position: "absolute",
  zIndex: 1,
  top: window.innerWidth < 400 ? 84 : 92,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const Profile = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });

  return (
    <ThemeProvider theme={theme}>
      <CardContent>
        <Box>
          <StyledAvatar
            src={Image}
            style={{
              border: "5px solid #daf7f7",
            }}
            sx={{ width: 128, height: 128 }}
          />
        </Box>
        <Box mt={32}>
          <Products products={data} />
        </Box>
      </CardContent>
    </ThemeProvider>
  );
};
export default Profile;
