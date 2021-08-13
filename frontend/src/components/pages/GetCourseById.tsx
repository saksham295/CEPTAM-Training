import "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { AppState } from "../../redux/store";
import { getCourseById } from "../../redux/actions/courseByIdActions";
import { addSchedule, openSDialog } from "../../redux/actions/scheduleActions";
import { enroll, openDialog } from "../../redux/actions/enrollActions";
import { getUsers } from "../../redux/actions/userActions";
import { getFaculty } from "../../redux/actions/facultyActions";

import tableStyles from "../../assets/jss/components/tableStyles";
import { Helmet } from "react-helmet-async";
import { DateTime } from "luxon";

const useStyles = makeStyles(tableStyles);

function GetCourseById() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  // SCHEDULE
  const ScheduleState = useSelector((state: AppState) => state.schedule);
  const [topic, setTopic] = useState("");
  const [faculty, setFaculty] = useState("");
  const [from, setFrom] = React.useState<Date | null>(new Date());
  const [to, setTo] = React.useState<Date | null>(new Date());

  const handleTopic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };

  const handleFaculty = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFaculty(event.target.value as string);
  };

  const handleFrom = (date: Date | null) => {
    setFrom(date);
  };

  const handleTo = (date: Date | null) => {
    setTo(date);
  };

  const handleSchedule = async () => {
    dispatch(addSchedule({ cid: courseid, topic, faculty, from, to }));
  };

  // For Faculty List
  const facultyList = useSelector((state: AppState) => state.faculty.users);

  useEffect(() => {
    dispatch(getFaculty());
  }, [dispatch]);

  // Schedule Dialog Box
  const handleScheduleOpen = () => {
    dispatch(openSDialog(true));
  };

  const handleScheduleClose = () => {
    dispatch(openSDialog(false));
  };

  // ENROLL
  const EnrollState = useSelector((state: AppState) => state.enroll);
  const [userid, setUserid] = useState("");
  const [courseid, setCourseid] = useState("");

  const handleUserid = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserid(event.target.value as string);
  };

  const handleEnroll = async () => {
    dispatch(enroll({ userid, courseid }));
  };

  // Enroll Dialog Box
  const handleEnrollOpen = () => {
    dispatch(openDialog(true));
  };

  const handleEnrollClose = () => {
    dispatch(openDialog(false));
  };

  // For Course Details
  const course: any = useSelector(
    (state: AppState) => state.coursebyid.courses
  );

  useEffect(() => {
    const id = location.pathname.substring(13);
    setCourseid(id);
    dispatch(getCourseById(id));
  }, [dispatch, location]);

  // For User List
  const users = useSelector((state: AppState) => state.user.users);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // To check if user is admin
  const user = useSelector((state: AppState) => state.auth.user);
  const isAdmin = user.role === "SystemAdmin" ? true : false;

  return (
    <>
      <Helmet>
        <title>Get Course By ID</title>
      </Helmet>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell align="center">Course Name</TableCell>
              <TableCell align="center">Center Name</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={course._id}>
              <TableCell align="center" component="th" scope="row">
                {course.title}
              </TableCell>
              <TableCell align="center">{course.centerName}</TableCell>
              <TableCell align="center">
                {DateTime.fromISO(course.from).toLocaleString()}
              </TableCell>
              <TableCell align="center">
                {DateTime.fromISO(course.to).toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Typography color="primary" className={classes.heading}>
          Schedule:
        </Typography>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell align="center">Topic</TableCell>
              <TableCell align="center">Faculty</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {course.schedule &&
              course.schedule.map((row: any) => (
                <TableRow key={row._id}>
                  <TableCell align="center" component="th" scope="row">
                    {row.topic}
                  </TableCell>
                  <TableCell align="center">{row.facultyName}</TableCell>
                  <TableCell align="center">
                    {DateTime.fromISO(row.from).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {DateTime.fromISO(row.to).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isAdmin ? (
          <>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleScheduleOpen}
            >
              Add Schedule
            </Button>
          </>
        ) : (
          <></>
        )}
      </TableContainer>
      {isAdmin ? (
        <>
          <Dialog
            open={ScheduleState.dialogOpen}
            onClose={handleScheduleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Schedule</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="topic"
                    variant="outlined"
                    required
                    fullWidth
                    id="topic"
                    label="Topic"
                    autoFocus
                    value={topic}
                    onChange={handleTopic}
                    disabled={ScheduleState.addschedule}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="faculty">Faculty Name</InputLabel>
                    <Select
                      variant="outlined"
                      required
                      fullWidth
                      id="faculty"
                      label="Faculty Name"
                      labelId="faculty"
                      name="faculty"
                      value={faculty}
                      onChange={handleFaculty}
                      disabled={ScheduleState.addschedule}
                    >
                      {facultyList.map((option: any) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={12}>
                    <DateTimePicker
                      id="from"
                      label="From"
                      value={from}
                      required
                      onChange={handleFrom}
                      disabled={ScheduleState.addschedule}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      id="to"
                      label="To"
                      required
                      value={to}
                      onChange={handleTo}
                      disabled={ScheduleState.addschedule}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleSchedule}
                  disabled={ScheduleState.addschedule}
                >
                  {ScheduleState.addschedule ? (
                    <CircularProgress color="primary" size={20} />
                  ) : (
                    <Typography>Submit</Typography>
                  )}
                </Button>
              </Grid>
            </DialogContent>
          </Dialog>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Typography color="primary" className={classes.heading}>
              Course Participants:
            </Typography>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow className={classes.tableRow}>
                  <TableCell align="center">Participant Name</TableCell>
                  <TableCell align="center">Participant Email</TableCell>
                  <TableCell align="center">Participant Phone Number</TableCell>
                  <TableCell align="center">Participant Center</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {course.participants &&
                  course.participants.map((row: any) => (
                    <TableRow key={row.user._id}>
                      <TableCell align="center" component="th" scope="row">
                        {row.user.name}
                      </TableCell>
                      <TableCell align="center">{row.user.email}</TableCell>
                      <TableCell align="center">{row.user.phone}</TableCell>
                      <TableCell align="center">
                        {row.user.centerName}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleEnrollOpen}
            >
              Enroll An User
            </Button>
            <Dialog
              open={EnrollState.dialogOpen}
              onClose={handleEnrollClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Enroll An User</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="courseid"
                      label="Course"
                      name="courseid"
                      value={course.title}
                      disabled={EnrollState.enrolling}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="userid">User</InputLabel>
                      <Select
                        name="userid"
                        variant="outlined"
                        required
                        fullWidth
                        id="userid"
                        label="User"
                        labelId="userid"
                        autoFocus
                        value={userid}
                        onChange={handleUserid}
                        disabled={EnrollState.enrolling}
                      >
                        {users.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
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
                    onClick={handleEnroll}
                    disabled={EnrollState.enrolling}
                  >
                    {EnrollState.enrolling ? (
                      <CircularProgress color="primary" size={20} />
                    ) : (
                      <Typography>Enroll</Typography>
                    )}
                  </Button>
                </Grid>
              </DialogContent>
            </Dialog>
          </TableContainer>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default GetCourseById;
