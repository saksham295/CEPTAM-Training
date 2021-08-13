import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button, Typography } from "@material-ui/core";

import styles from "../../assets/jss/components/errorStyles";

const useStyles = makeStyles((theme: Theme) => createStyles(styles));

const Login: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Not Found | TIS</title>
      </Helmet>
      <div>
        <div className={classes.errorWrapper}>
          <div className={classes.error}>
            <Typography variant="h1" className={classes.errorCode}>
              4O4
            </Typography>
            <Typography variant="h4" className={classes.errorText}>
              PAGE NOT FOUND
            </Typography>
            <Button variant="text" color="primary" component={Link} to="/">
              <Typography variant="button" className={classes.buttonText}>
                BACK TO HOME
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
