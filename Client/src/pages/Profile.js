import { CardMedia, Fab, Card, Box, Avatar, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import Products from "../components/Product/Products";
import theme from "../components/UI/Theme";
import Image from "../img.jpg";
import data from "../data";

const StyledAvatar = styled(Avatar)({
  position: "absolute",
  zIndex: 1,
  top: window.innerWidth < 400 ? 216 : 232,
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
      <Box
        mx={width < 800 ? (width < 400 ? 0 : 6) : 16}
        my={width < 400 ? 0 : 2}
        mt={16}
        p={width < 400 ? 0 : 2}
      >
        <Card variant="outlined" style={{ backgroundColor: "#daf7f7" }}>
          <CardMedia component="img" height="164" image={Image} />
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
              <Products
                s={width < 900 ? 12 : width < 1150 ? 5 : 4}
                products={data}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};
export default Profile;
