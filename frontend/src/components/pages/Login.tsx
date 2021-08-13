import React, { useState } from "react";
import validator from "validator";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  CircularProgress,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Helmet } from "react-helmet-async";

import { AppState } from "../../redux/store";
import { signin } from "../../redux/actions/authActions";

import formStyles from "../../assets/jss/components/formStyles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Trainee Login Portal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(formStyles);

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authState = useSelector((state: AppState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  if (useSelector((state: AppState) => state.auth.isAuthenticated)) {
    return <Navigate to="/" />;
  }

  const handleLogin = async () => {
    setEmailError(false);
    if (!validator.isEmail(email)) {
      setEmailError(true);
      return;
    }
    setPasswordError(false);
    if (password.length < 6) {
      setPasswordError(true);
      return;
    }
    dispatch(signin({ email, password }));
  };

  return (
    <div className={classes.background}>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            error={emailError}
            helperText={emailError ? "Enter a valid Email" : undefined}
            autoComplete="email"
            autoFocus
            disabled={authState.signing}
            value={email}
            onChange={handleEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={passwordError}
            helperText={passwordError ? "Enter a valid Password" : undefined}
            autoComplete="current-password"
            disabled={authState.signing}
            value={password}
            onChange={handlePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
            disabled={authState.signing}
          >
            {authState.signing ? (
              <CircularProgress color="primary" size={20} />
            ) : (
              <Typography>Sign In</Typography>
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {authState.signingError.length !== 0 ? (
            <Alert severity="error" className={classes.errorMessage}>
              {authState.signingError}
            </Alert>
          ) : (
            <></>
          )}
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
