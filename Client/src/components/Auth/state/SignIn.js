import * as React from "react";
import { url } from "../../../config";
import validator from "validator";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Stack,
  Box,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import axios from "axios";

async function RequestLogin(creds, setErrorMessage) {
  try {
    const response = await axios.post(`${url}/user/login`, creds);
    console.log(response);
    const { data } = response;
    if (data) {
      window.localStorage.setItem("inner-circle-user", JSON.stringify(data));
    }
  } catch (e) {
    console.log(e.message);
    setErrorMessage(`Provided Email Address or Password is Invalid`);
  }
}

export default function SignIn(props) {
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hasToken, setHasToken] = React.useState(false);

  const [validEmail, setValidEmail] = React.useState(true);
  const [validPassword, setValidPassword] = React.useState(true);
  const [strongPassword, setStrongPassword] = React.useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      let component = email.trim() === "" ? "Email" : "";
      component = password.trim() === "" ? "Password" : component;
      component =
        password.trim() === "" && email === "" ? "Email & Password" : component;
      setErrorMessage(`Please Enter ${component}`);
    } else if (!validEmail || !validPassword) {
      let component = !validEmail ? "Email" : "";
      component = !validPassword ? "Password" : component;
      component =
        !validEmail && !validPassword ? "Email & Password" : component;
      setErrorMessage(`Please Enter Valid ${component}`);
    } else {
      const credentials = { email, password };
      // console.log(credentials);
      RequestLogin(credentials, setErrorMessage);
    }
    setPassword("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            SignIn
          </Typography>
          {errorMessage ? (
            <Box m={1} color="red">
              <Typography variant="caption">{errorMessage}</Typography>
            </Box>
          ) : (
            ""
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.split(" ").join(""));
                setValidEmail(validator.isEmail(email));
              }}
              color={!validEmail ? "error" : "primary"}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              value={password}
              color={
                !validPassword
                  ? "error"
                  : !strongPassword
                  ? "warning"
                  : "primary"
              }
              fullWidth
              onChange={(e) => {
                setPassword(e.target.value.split(" ").join(""));
                setValidPassword(validator.isLength(password, 6, 18));
                setStrongPassword(validator.isStrongPassword(password));
              }}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid container>
              <Grid item xs>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    props.status.setHasPasswd(false);
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Stack spacing={1}>
              <Button
                onClick={() => {
                  props.status.setIsUser(!props.status.isUser);
                }}
                variant="outlined"
                fullWidth
              >
                {"Don't have an account? Sign Up"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
