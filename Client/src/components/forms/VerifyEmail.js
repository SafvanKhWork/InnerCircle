import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../UI/Theme";
import Grid from "@mui/material/Grid";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        InnerCircle
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const VerifyEmail = (props) => {
  const [isSent, setIsSent] = useState(false);
  // const [isValid, setIsValid] = useState(false);
  let isValid = false;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Verify Email
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {isSent ? (
              <Stack spacing={1}>
                <TextField required fullWidth name="otp" label="OTP" id="otp" />
                <Button
                  fullWidth
                  onClick={() => {
                    {
                      //Compare Sent OTP & entered OTP
                      isValid = true;
                    }
                    if (isValid) {
                      props.status.setIsValidOTP(true);
                    }
                    if (!isValid) {
                      setIsSent(false);
                    }
                  }}
                  variant="outlined"
                  fullWidth
                >
                  {"Verify OTP"}
                </Button>
              </Stack>
            ) : (
              <Stack spacing={1}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <Button
                  fullWidth
                  onClick={() => {
                    setIsSent(true);
                  }}
                  variant="outlined"
                  fullWidth
                >
                  {"Send OTP"}
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default VerifyEmail;
