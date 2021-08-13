import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet-async";
import { DateTime } from "luxon";
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
  CardContent,
  Card,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";

import { AppState } from "../../redux/store";
import {
  getCourses,
  addCourse,
  openDialog,
} from "../../redux/actions/courseActions";
import { getCenters } from "../../redux/actions/centerActions";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import tableStyles from "../../assets/jss/components/tableStyles";
import cardStyles from "../../assets/jss/components/cardStyles";

const useStyles = makeStyles(tableStyles);
const useStyles1 = makeStyles(cardStyles);

function GetCourses() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const dispatch = useDispatch();

  const centers = useSelector((state: AppState) => state.center.centers);
  useEffect(() => {
    dispatch(getCenters());
  }, [dispatch]);

  const courses = useSelector((state: AppState) => state.course.courses);
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  // For Adding Course
  const CourseState = useSelector((state: AppState) => state.course);
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [from, setFrom] = React.useState<Date | null>(new Date());
  const [to, setTo] = React.useState<Date | null>(new Date());

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleVenue = (event: React.ChangeEvent<{ value: unknown }>) => {
    setVenue(event.target.value as string);
  };

  const handleFrom = (date: Date | null) => {
    setFrom(date);
  };

  const handleTo = (date: Date | null) => {
    setTo(date);
  };

  const handleCourse = async () => {
    dispatch(addCourse({ title, venue, from, to }));
  };

  // For Dialog Box
  const handleCourseOpen = () => {
    dispatch(openDialog(true));
  };

  const handleCourseClose = () => {
    dispatch(openDialog(false));
  };

  const user = useSelector((state: AppState) => state.auth.user);
  const isAdmin = user.role === "SystemAdmin" ? true : false;

  return (
    <>
      <Helmet>
        <title>Get Courses</title>
      </Helmet>
      <div className={classes1.page}>
        {courses.map((row) => (
          <>
            <Link to={`/app/courses/${row._id}`} className={classes1.link}>
              <Card className={classes1.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes1.media}
                    image="https://source.unsplash.com/random"
                    title="Course"
                  />
                  <CardContent>
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h5"
                      component="h2"
                      color="primary"
                    >
                      {row.title}
                    </Typography>
                    <Typography align="center">
                      Center Name: {row.centerName}
                    </Typography>
                    <Typography align="center">
                      From: {DateTime.fromISO(row.from).toLocaleString()}
                    </Typography>
                    <Typography align="center">
                      To: {DateTime.fromISO(row.to).toLocaleString()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </>
        ))}
      </div>
      {isAdmin ? (
        <>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleCourseOpen}
          >
            Add New Course
          </Button>
          <Dialog
            open={CourseState.dialogOpen}
            onClose={handleCourseClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Course</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="title"
                    variant="outlined"
                    required
                    fullWidth
                    id="title"
                    label="Course Name"
                    autoFocus
                    value={title}
                    onChange={handleTitle}
                    disabled={CourseState.addcourse}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="venue">Center Name</InputLabel>
                    <Select
                      required
                      fullWidth
                      id="venue"
                      label="Center Name"
                      labelId="venue"
                      name="venue"
                      value={venue}
                      onChange={handleVenue}
                      disabled={CourseState.addcourse}
                    >
                      {centers.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name + ", " + option.city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={12}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="from"
                      label="From"
                      value={from}
                      onChange={handleFrom}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      disabled={CourseState.addcourse}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={12}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="to"
                      label="To"
                      value={to}
                      onChange={handleTo}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      disabled={CourseState.addcourse}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleCourse}
                  disabled={CourseState.addcourse}
                >
                  {CourseState.addcourse ? (
                    <CircularProgress color="primary" size={20} />
                  ) : (
                    <Typography>Submit</Typography>
                  )}
                </Button>
              </Grid>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default GetCourses;
