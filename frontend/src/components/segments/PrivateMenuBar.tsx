import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import { signOut } from "../../redux/actions/authActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import { AppState } from "../../redux/store";
import { Button } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    titleWrapper: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
    },
    title: {
      // color: 'green',
      // fontSize: 20,
      // fontWeight: 'bold'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    button: {
      color: 'white',
    }
  })
);

const profileLinks = [
  {
    title: "Home",
    link: "/app/dashboard",
  },
  {
    title: "My Profile",
    link: "/app/profile",
  },
];

const adminLinks = [
  {
    title: "My Courses",
    link: "/app/mycourses",
  },
  {
    title: "All Courses",
    link: "/app/courses",
  },
  {
    title: "User List",
    link: "/app/users",
  },
  {
    title: "Center List",
    link: "/app/centers",
  },
];

const userLinks = [
  {
    title: "My Courses",
    link: "/app/mycourses",
  },
  {
    title: "All Courses",
    link: "/app/courses",
  },
];

export default function MenuAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state: AppState) => state.auth.user);

  const isAdmin = user.role === "SystemAdmin" ? true : false;

  const handleSignout = () => {
    dispatch(signOut());
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.titleWrapper}>
            <Typography variant="h6" noWrap className={classes.title}>
              Trainee Portal
            </Typography>
          </div>
              <Button onClick={handleSignout} variant="outlined" className={classes.button}>Sign Out</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Divider />
          <List>
            {profileLinks.map((link, index) => (
              <ListItem
                button
                key={link.title}
                component={NavLink}
                to={link.link}
              >
                <ListItemText primary={link.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {isAdmin
              ? adminLinks.map((link, index) => (
                  <ListItem
                    button
                    key={link.title}
                    component={NavLink}
                    to={link.link}
                  >
                    <ListItemText primary={link.title} />
                  </ListItem>
                ))
              : userLinks.map((link, index) => (
                  <ListItem
                    button
                    key={link.title}
                    component={NavLink}
                    to={link.link}
                  >
                    <ListItemText primary={link.title} />
                  </ListItem>
                ))}
          </List>
          <Divider />
        </div>
      </Drawer>
    </div>
  );
}
