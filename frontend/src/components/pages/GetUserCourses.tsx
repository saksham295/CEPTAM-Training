import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet-async";
import { DateTime } from "luxon";

import { AppState } from "../../redux/store";
import { getCourses } from "../../redux/actions/profileActions";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

import cardStyles from "../../assets/jss/components/cardStyles";

const useStyles = makeStyles(cardStyles);

function GetCourses() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const courses: any = useSelector((state: AppState) => state.profile.courses);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  return (
    <div className={classes.page}>
      <Helmet>
        <title>My Courses</title>
      </Helmet>
      {courses.map((row: any) => (
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="https://source.unsplash.com/random"
                title="User Course"
              />
              <CardContent>
                <Typography
                  align="center"
                  gutterBottom
                  variant="h5"
                  component="h2"
                  color="primary"
                >
                  {row.courseTitle}
                </Typography>
                <Typography align="center">
                  Center Name: {row.courseCenter}
                </Typography>
                <Typography align="center">
                  From: {DateTime.fromISO(row.From).toLocaleString()}
                </Typography>
                <Typography align="center">
                  To: {DateTime.fromISO(row.To).toLocaleString()}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </div>
  );
}

export default GetCourses;
