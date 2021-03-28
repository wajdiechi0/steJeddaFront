import React from "react";
import "./App.css";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import {
  Login,
  Register,
  Reset,
  ResetLink,
  Home,
  NotFound,
  AdminLogin,
} from "./views/authentication";
import Header from "./components/AuthenticationHeader";
const hist = createBrowserHistory();
function App() {
  return (
    <div>
      <Header />
      <Router history={hist}>
        <Switch>
          <Route path="/notfound" component={NotFound} />
          <Route
            path="/"
            exact
            render={() =>
              !JSON.parse(localStorage.getItem("user")) ? (
                <Home />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/admin"
            render={() =>
              !JSON.parse(localStorage.getItem("user")) ? (
                <AdminLogin />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/signin"
            render={() =>
              !JSON.parse(localStorage.getItem("user")) ? (
                <Login />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/signup"
            render={() =>
              !JSON.parse(localStorage.getItem("user")) ? (
                <Register />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/resetpassword"
            render={() =>
              !JSON.parse(localStorage.getItem("user")) ? (
                <Reset />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/password/reset/:token" component={ResetLink} />
          <Redirect from="/" to={"/notfound"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
