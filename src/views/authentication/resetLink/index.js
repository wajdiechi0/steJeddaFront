import React, { Component } from "react";
import "./resetLink.css";
import { Button, TextField } from "@material-ui/core";
import Lock from "@material-ui/icons/Lock";
import Alert from "../components/alert";

class ResetLinkComponent extends Component {
  state = {
    email: "",
    password: "",
    c_password: "",
    openAlert: false,
    success: false,
    alertText: "",
    disabled:false,
  };

  handleClose = () => {
    this.setState({
      openAlert: false,
    });
  };

  render() {
    return (
      <div className={"rlContainer"}>
        <div className={"rlFormContainer"}>
          <Lock style={{ width: 65, height: 65 }} />
          <p style={{ color: "#9d9d9d", fontWeight: "light", margin: "10%" }}>
            Please confirm your new password
          </p>
          <TextField
            label="Email"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            type={"email"}
            style={{backgroundColor:"#fff"}}

            onChange={(e) => {
              this.setState({
                email: e.target.value,
              });
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            type={"password"}
            style={{backgroundColor:"#fff"}}
            onChange={(e) => {
              this.setState({
                password: e.target.value,
              });
            }}
          />
          <TextField
            label="Confirm your password"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            type={"password"}
            style={{backgroundColor:"#fff"}}
            onChange={(e) => {
              this.setState({
                c_password: e.target.value,
              });
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "80%",
              backgroundColor: "#3897f0",
              fontWeight: "bold",
              margin: 10,
            }}
            disabled={this.state.disabled}
          >
            Reset Password
          </Button>
          <Button
            href={"/login"}
            style={{ fontWeight: "bold", color: "#282828" }}
          >
            Back To Login
          </Button>
        </div>
        <Alert
          open={this.state.openAlert}
          close={this.handleClose}
          success={this.state.success}
          text={this.state.alertText}
        />
      </div>
    );
  }


  componentDidMount() {
    document.title = "Reset password";
  }
}

export default ResetLinkComponent;
