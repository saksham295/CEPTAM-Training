import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/store";
import { getProfile, setProfile, setName, setEmail, setPhone, openDialog } from "../../redux/actions/profileActions";

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

function AccountProfileDetails()  {
  const dispatch = useDispatch();
  const classes = useStyles();

  const ProfileState = useSelector((state: AppState) => state.profile);
  const userprofile = useSelector((state: AppState) => state.profile.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(event.target.value));
  }

  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhone(event.target.value));
  }

  const handleProfile = async () => {
    dispatch(setProfile({id: userprofile._id, name: userprofile.name, email: userprofile.email, phone: userprofile.phone}));
  }

  const handleOpen = () => {
    dispatch(openDialog(true));
  };

  const handleClose = () => {
    dispatch(openDialog(false));
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                key="Confirmation Code"
                fullWidth
                helperText="Please specify your name"
                label="Name"
                name="name"
                onChange={handleName}
                required
                value={userprofile.name}
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
                value={userprofile.email}
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
                value={userprofile.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Center"
                name="center"
                value={userprofile.centerName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="role">Role</InputLabel>
            <Select
                fullWidth
                label="Role"
                labelId="role"
                name="role"
                value={userprofile.role}
                disabled
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
          open={ProfileState.openDialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Change Details?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Confirm Changing Details?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button onClick={handleProfile} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
