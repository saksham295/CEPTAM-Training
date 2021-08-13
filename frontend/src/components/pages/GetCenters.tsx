import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet-async";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
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
} from "@material-ui/core";

import { AppState } from "../../redux/store";
import {
  getCenters,
  addCenter,
  openDialog,
} from "../../redux/actions/centerActions";

import tableStyles from "../../assets/jss/components/tableStyles";
import cardStyles from "../../assets/jss/components/cardStyles";

const useStyles = makeStyles(tableStyles);
const useStyles1 = makeStyles(cardStyles);

// For Types And Subtypes options
const centertypes = [
  {
    title: "Work-Center",
    value: "Workcenter",
  },
  {
    title: "Institute",
    value: "Institute",
  },
  {
    title: "Both",
    value: "Both",
  },
  {
    title: "Other",
    value: "Other",
  },
];

const centerSubtypes = [
  {
    title: "None",
    value: null,
  },
  {
    title: "In-House",
    value: "Inhouse",
  },
  {
    title: "Out-Sourced",
    value: "Outsourced",
  },
];

function GetCenters() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const dispatch = useDispatch();

  // For centers list
  const centers = useSelector((state: AppState) => state.center.centers);
  useEffect(() => {
    dispatch(getCenters());
  }, [dispatch]);

  // For Adding Center
  const CenterState = useSelector((state: AppState) => state.center);
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [subtype, setSubtype] = useState("");

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  const handleSubtype = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSubtype(event.target.value as string);
  };

  const handleCenter = async () => {
    dispatch(addCenter({ name, city, type, subtype }));
  };

  // For Dialogue Box
  const handleCenterOpen = () => {
    dispatch(openDialog(true));
  };

  const handleCenterClose = () => {
    dispatch(openDialog(false));
  };

  return (
    <>
      <Helmet>
        <title>Get Centers</title>
      </Helmet>
      <div className={classes1.page}>
        {centers.map((row) => (
          <>
            <Card className={classes1.root}>
              <CardActionArea>
                <CardMedia
                  className={classes1.media}
                  image="https://source.unsplash.com/random"
                  title="Center"
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
                  <Typography align="center">City: {row.city}</Typography>
                  <Typography align="center">Type: {row.type}</Typography>
                  <Typography align="center">
                    Sub-Type: {row.subtype}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </>
        ))}
      </div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleCenterOpen}
      >
        Add A Center
      </Button>
      <Dialog
        open={CenterState.dialogOpen}
        onClose={handleCenterClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Center</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Center Name"
                autoFocus
                value={name}
                onChange={handleName}
                disabled={CenterState.addcenter}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                value={city}
                onChange={handleCity}
                disabled={CenterState.addcenter}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  name="type"
                  label="Type"
                  labelId="type"
                  id="type"
                  value={type}
                  onChange={handleType}
                  disabled={CenterState.addcenter}
                >
                  {centertypes.map((option: any) => (
                    <MenuItem key={option.title} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="subtype">Subtype (If Any)</InputLabel>
                <Select
                  variant="outlined"
                  fullWidth
                  name="subtype"
                  label="Subtype (If Any)"
                  labelId="subtype"
                  id="subtype"
                  value={subtype}
                  onChange={handleSubtype}
                  disabled={CenterState.addcenter}
                >
                  {centerSubtypes.map((option: any) => (
                    <MenuItem key={option.title} value={option.value}>
                      {option.title}
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
              onClick={handleCenter}
              disabled={CenterState.addcenter}
            >
              {CenterState.addcenter ? (
                <CircularProgress color="primary" size={20} />
              ) : (
                <Typography>Submit</Typography>
              )}
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default GetCenters;
