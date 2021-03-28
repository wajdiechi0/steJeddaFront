import React, { Component } from "react";
import "./reset.css";
import { Button, TextField } from "@material-ui/core";
import Lock from "@material-ui/icons/Lock";
import Alert from "../components/alert";
class ResetPasswordComponent extends Component {
  state = {
    email: "",
    openAlert: false,
    success: false,
    disabled: false,
  };

  handleClose = () => {
    this.setState({
      openAlert: false
    });
  };


  render() {
    return (
      <div className={"rContainer"}>
        <div className={"rFormContainer"}>
          <Lock style={{ width: 65, height: 65}} />
          <h3>Trouble While Logging In?</h3>
          <p style={{ color: "#9d9d9d", fontWeight: "light", margin: "10%" }}>
            Enter your email and you'll receive a link to reset your password
          </p>
          <TextField
            id="outlined-dense"
            label="Email address"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            type={"email"}
            style={{backgroundColor:"#fff"}}

            onChange={e => {
              this.setState({
                email: e.target.value
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
              margin: 10
            }}
            disabled={this.state.disabled}
          >
            Send Reset Link
          </Button>
          <div className={"orContR"}>
            <div className={"line"} />
            <p style={{ color: "#b3b3b3", fontWeight: "bold", margin: "5%" }}>
              OR
            </p>
            <div className={"line"} />
          </div>
          <Button
            href={"/signup"}
            style={{ fontWeight: "bold", color: "black" }}
          >
            {" "}
            Create New Account
          </Button>
          <div className={"backLogin"}>
            <Button
              href={"/signin"}
              style={{ fontWeight: "bold", color: "#282828" 
            }}
            >
              Back To Login
            </Button>
          </div>
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

  componentDidMount(){
    document.title = 'Reset password';
  }
}
export default ResetPasswordComponent;
