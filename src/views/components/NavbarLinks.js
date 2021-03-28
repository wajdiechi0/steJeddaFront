import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import Button from "./CustomButton.js";
import { useHistory } from "react-router-dom";

import styles from "./styles/headerLinksStyle";
const useStyles = makeStyles(styles);

export default function AdminNavbarLinks(props) {
  const history = useHistory();
  const classes = useStyles();
  const signOut = () => {
    localStorage.setItem("user", null);
    history.push("/");
    window.location.reload();
  };
  return (
    <div>
      <div
        className={classes.manager}
        style={{
          display: "flex",
          flexDirection: "arrow",
          alignItems: "center",
        }}
      >
        <span style={{ marginTop: 15 }}>
          {JSON.parse(localStorage.getItem("user")).name}
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: 20,
          }}
        >
          <Button
            color={"transparent"}
            justIcon={true}
            simple={false}
            aria-haspopup="true"
            onClick={signOut}
            className={classes.buttonLink}
          >
            <PowerSettingsNew
              className={classes.icons}
              style={{ color: "red" }}
            />
          </Button>
          <span style={{ fontSize: 10, marginTop: -15, color: "red" }}>
            sign out
          </span>
        </div>
      </div>
    </div>
  );
}
