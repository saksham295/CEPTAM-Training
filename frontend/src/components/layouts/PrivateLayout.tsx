import React from "react";
import {
  makeStyles,
  createStyles,
} from "@material-ui/core/styles";
import MenuBar from "../segments/PrivateMenuBar";
import { Outlet } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    margin: {
      marginTop: 64,
      width: "100%",
    },
  })
);

function PrivateLayout() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MenuBar />
      <div className={classes.margin}>
        <Outlet />
      </div>
    </div>
  );
}

export default PrivateLayout;
