import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getCenters } from "../../redux/actions/centerActions";
import { AppState } from "../../redux/store";
import {
  getUserById,
  setUser,
  setName,
  setEmail,
  setPhone,
  setCenter,
  setRole,
  openDialog,
} from "../../redux/actions/userByIdActions";

import tableStyles from "../../assets/jss/components/tableStyles";

const useStyles = makeStyles(tableStyles);

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

function GetUserById() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  const UserState: any = useSelector((state: AppState) => state.userbyid);
  const user: any = useSelector((state: AppState) => state.userbyid.user);

  useEffect(() => {
    const id = location.pathname.substring(10);
    dispatch(getUserById(id));
  }, [dispatch, location]);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  };
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(event.target.value));
  };
  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhone(event.target.value));
  };
  const handleCenter = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setCenter(event.target.value as string));
  };
  const handleRole = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setRole(event.target.value as string));
  };

  const handleUser = async () => {
    dispatch(setUser({id: user._id, name: user.name, email: user.email, phone: user.phone, center: user.center, role: user.role}));
  }

  const centers = useSelector((state: AppState) => state.center.centers);

  useEffect(() => {
    dispatch(getCenters());
  }, [dispatch]);

  const handleOpen = () => {
    dispatch(openDialog(true));
  };

  const handleClose = () => {
    dispatch(openDialog(false));
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="User Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify your name"
                label="Name"
                name="name"
                onChange={handleName}
                required
                value={user.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleEmail}
                required
                value={user.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handlePhone}
                type="number"
                value={user.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="center">Center</InputLabel>
                <Select
                  fullWidth
                  label="Center"
                  labelId="center"
                  name="center"
                  onChange={handleCenter}
                  required
                  value={user.center}
                  variant="outlined"
                >
                  {centers.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name + ", " + option.city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="role">Role</InputLabel>
                <Select
                  fullWidth
                  label="Role"
                  labelId="role"
                  name="role"
                  onChange={handleRole}
                  required
                  value={user.role}
                  variant="outlined"
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={handleOpen}>
            Save details
          </Button>
          <Dialog
          open={UserState.openDialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Change Details?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Confirm Changing User Details?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button onClick={handleUser} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        </Box>
      </Card>
    </form>
  );
}

export default GetUserById;
