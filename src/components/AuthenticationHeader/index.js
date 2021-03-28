import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: "#2F3336" }}>
        <Toolbar>
          <div className={classes.grow} />
          <Typography style={{ color: "#fff",fontWeight:'bold', marginLeft: 150 }} variant="h4" noWrap>
            JDS
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button color={"inherit"} style={{ color: "#fff" }} href={"/signin"}>
              <Typography
                style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}
                noWrap
              >
                SIGN IN
              </Typography>
            </Button>
          </div>
          <div className={classes.sectionDesktop}>
            <Button color={"inherit"}  href={"/signup"}>
              <Typography
                style={{ color: "#3897f0", fontWeight: "bold", fontSize: 15 }}
                noWrap
              >
                SIGN UP
              </Typography>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
