import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "./../components/Navbar";
import Sidebar from "./../components/Sidebar.js";

import { dashboardHome, Orders, Templates ,Cart} from "./Pages";
import {NotFound} from './../authentication'
import bgImage from "./../../assets/sidebar-2.jpg";
import logo from "./../../assets/logo.png";
import routes from './routes'
import styles from "./../components/styles/adminStyle";

const useStyles = makeStyles(styles);
export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  const switchRoutes = (
    <Switch>
      <Route exact path={"/dashboard"} component={dashboardHome} />
      <Route exact path={"/orders"} component={Orders} />
      <Route exact path={"/templates"} component={Templates} />
      <Route exact path={"/cart"} component={Cart} />
      <Route exact path={"/notfound"} component={NotFound} />
      <Redirect exact from="/" to={"/dashboard"} />
      <Redirect from="/" to={"/notfound"} />
    </Switch>
  );
  return (
    <div>
      <Sidebar
        routes={routes}
        logoText={"JDS"}
        logo={logo}
        image={bgImage}
        color={"purple2"}
        {...rest}
      />
      <div className={classes.mainPanel}>
        <Navbar routes={routes} {...rest} />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
      </div>
    </div>
  );
}
