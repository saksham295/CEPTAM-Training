import React, { useEffect, useState } from "react";
import validator from "validator";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet-async";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
} from "@material-ui/core";

import { AppState } from "../../redux/store";
import {
  changeStatus,
  getUsers,
  openDialog,
} from "../../redux/actions/userActions";
import { getCenters } from "../../redux/actions/centerActions";
import { signup, openRegDialog} from "../../redux/actions/regActions";

import tableStyles from "../../assets/jss/components/tableStyles";
import cardStyles from "../../assets/jss/components/cardStyles";

const useStyles = makeStyles(tableStyles);
const useStyles1 = makeStyles(cardStyles);

const roles = [
  {
    label: "User",
    value: "User",
  },
  {
    label: "System Administrator",
    value: "SystemAdmin",
  },
  {
    label: "Institute Administrator",
    value: "InstAdmin",
  },
  {
    label: "Course Coordinator",
    value: "CourseCoordinator",
  },
  {
    label: "Faculty",
    value: "Faculty",
  },
];

function GetUsers() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const UserState = useSelector((state: AppState) => state.user);

  const users = useSelector((state: AppState) => state.user.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const RegState = useSelector((state: AppState) => state.reg);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [center, setCenter] = useState("");
  const [role, setRole] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [thisUser, setThisUser] = useState({
    userid: "",
    username: "",
    newstatus: "",
  });

  const centers = useSelector((state: AppState) => state.center.centers);

  useEffect(() => {
    dispatch(getCenters());
  }, [dispatch]);

  const handleStatus = async () => {
    dispatch(
      changeStatus({ userid: thisUser.userid, newstatus: thisUser.newstatus })
    );
  };

  const handleStatusOpen = (
    userid: string,
    username: string,
    status: string
  ) => {
    const newstatus = status === "Active" ? "Inactive" : "Active";
    setThisUser({
      userid,
      username,
      newstatus,
    });
    dispatch(openDialog(true));
  };

  const handleStatusClose = () => {
    dispatch(openDialog(false));
  };

  const handleRegOpen = () => {
    dispatch(openRegDialog(true));
  };

  const handleRegClose = () => {
    dispatch(openRegDialog(false));
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleCenter = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCenter(event.target.value as string);
  };

  const handleRole = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string);
  };

  const handleRegister = async () => {
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
    setPhoneError(false);
    if (!validator.isMobilePhone(phone)) {
      setPhoneError(true);
      return;
    }
    dispatch(signup({ name, email, password, phone, center, role }));
  };

  return (
    <>
      <Helmet>
        <title>Get Users</title>
      </Helmet>
      <div className={classes1.page}>
        {users.map((row) => (
          <Card className={classes1.root}>
            <Link to={`/app/user/${row._id}`} className={classes1.link}>
            <CardActionArea>
              <CardMedia
                className={classes1.media}
                image="https://source.unsplash.com/random"
                title="User"
              />
              <CardContent>
                <Typography
                  align="center"
                  gutterBottom
                  variant="h5"
                  component="h2"
                  color="primary"
                >
                    {row.name}
                </Typography>
                <Typography align="center">Email: {row.email}</Typography>
                <Typography align="center">
                  Phone Number: {row.phone}
                </Typography>
                <Typography align="center">Center: {row.centerName}</Typography>
                <Typography align="center">Role: {row.role}</Typography>
                <Typography align="center">Status: {row.status}</Typography>
              </CardContent>
            </CardActionArea>
              </Link>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  handleStatusOpen(row._id, row.name, row.status);
                }}
                >
                Change Status
              </Button>
            </CardActions>
          </Card>
        ))}
        <Dialog
          open={UserState.dialogOpen}
          onClose={handleStatusClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change User Status?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Do You Really Want To Change The Status Of ${thisUser.username} To ${thisUser.newstatus}?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleStatusClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleStatus} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleRegOpen}
      >
        Register New User
      </Button>
      <Dialog
        open={RegState.dialogOpen}
        onClose={handleRegClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Register User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                value={name}
                onChange={handleName}
                disabled={RegState.signuping}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={emailError}
                helperText={emailError ? "Enter a valid Email" : undefined}
                value={email}
                onChange={handleEmail}
                disabled={RegState.signuping}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={passwordError}
                helperText={
                  passwordError ? "Enter a valid Password" : undefined
                }
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
                disabled={RegState.signuping}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="Phone Number"
                id="phone"
                error={phoneError}
                helperText={
                  phoneError ? "Enter a valid Mobile Number" : undefined
                }
                autoComplete="phone"
                value={phone}
                onChange={handlePhone}
                disabled={RegState.signuping}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="center">Center</InputLabel>
                <Select
                  autoComplete="center"
                  name="center"
                  required
                  fullWidth
                  id="center"
                  labelId="center"
                  label="Center"
                  autoFocus
                  value={center}
                  onChange={handleCenter}
                  disabled={RegState.signuping}
                >
                  {centers.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name + ", " + option.city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="role">Role</InputLabel>
                <Select
                  autoComplete="role"
                  name="role"
                  required
                  fullWidth
                  id="role"
                  label="Role"
                  labelId="role"
                  autoFocus
                  value={role}
                  onChange={handleRole}
                  disabled={RegState.signuping}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleRegister}
              disabled={RegState.signuping}
            >
              {RegState.signuping ? (
                <CircularProgress color="primary" size={20} />
              ) : (
                <Typography>Sign Up</Typography>
              )}
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default GetUsers;
