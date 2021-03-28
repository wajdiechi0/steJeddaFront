import React from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AdminDashboard, ClientDashboard } from "./views";
import NotConnected from "./notConnected";
import Invoice from './components/Invoice'
const hist = createBrowserHistory();
function App() {
  return (
      <Router history={hist}>
        <Switch>

        <Route
            path="/invoice/:id"
            render={() =>
              JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).role === "admin" &&(
                <Invoice />
              )
            }
          />
          <Route
            path="/"
            render={() =>
              JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).role === "admin" ?(
                <AdminDashboard />
              ) :(
                <ClientDashboard />
              ) : (
                <NotConnected />
              )
            }
          />
        </Switch>
      </Router>
  );
}

export default App;
