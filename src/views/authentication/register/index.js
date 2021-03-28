import React, { Component } from "react";
import "./register.css";
import { Button, TextField } from "@material-ui/core";
import Alert from "../components/alert";
import logo from "./../../../assets/logo.png";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as EmailValidator from "email-validator";
import { register } from "./../../../redux/actions";

class RegisterComponent extends Component {
  state = {
    email: "",
    password: "",
    c_password: "",
    name: "",
    openAlert: false,
    birthdate: "",
    phone: "",
    alertText: "",
    disabled:false,
  };

  handleClose = () => {
    this.setState({
      openAlert: false,
    });
  };

  register = (email, password, c_password, name, birthdate, phone) => {
    if (!EmailValidator.validate(email)) {
      this.setState({
        openAlert: true,
        alertText: "Email is not valid",
      });
      return;
    }
    if (password !== c_password) {
      this.setState({
        openAlert: true,
        alertText: "Password does not match",
      });
      return;
    }
    if (name === "" || birthdate === "" || phone === "" || password === "") {
      this.setState({
        openAlert: true,
        alertText: "Please check your entries",
      });
      return;
    }
    this.props.dispatch(register(email, password, name, birthdate, phone))
  };
  render() {
    return (
      <div className={"SignUpcontainer"}>
        <div className={"sFormContainer"}>
          <img
            src={logo}
            style={{ width: 258, height: 150, marginBottom: 30 }}
            alt={"JDS"}
          />
          <TextField
            label="Email address"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            type={"email"}
            style={{ backgroundColor: "#fff" }}
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            style={{ backgroundColor: "#fff" }}
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />
          <TextField
            label="Confirm your password"
            type="password"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            style={{ backgroundColor: "#fff" }}
            onChange={(e) => {
              this.setState({ c_password: e.target.value });
            }}
          />
          <TextField
            label="Full name"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            style={{ backgroundColor: "#fff" }}
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
          />
          <TextField
            label="Phone number"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            style={{ backgroundColor: "#fff" }}
            onChange={(e) => {
              this.setState({ phone: e.target.value });
            }}
          />
          <TextField
            label="Birthdate"
            type="date"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            style={{ backgroundColor: "#fff" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              this.setState({ birthdate: e.target.value });
            }}
          />

          <Button
            variant="contained"
            color="primary"
            type={"submit"}
            style={{
              width: "80%",
              backgroundColor: "#3897f0",
              fontWeight: "bold",
              margin: 10,
            }}
            disabled={this.state.disabled}
            onClick={() => {
              this.register(
                this.state.email,
                this.state.password,
                this.state.c_password,
                this.state.name,
                this.state.birthdate,
                this.state.phone
              );
            }}
          >
            Sign Up
          </Button>
        </div>
        <div className={"signInCont"}>
          <p>You have an account ?</p>
          <Button
            href={"/signin"}
            style={{ fontWeight: "bold", color: "#3897f0" }}
          >
            Sign In !
          </Button>
        </div>
        <Alert
          open={this.state.openAlert}
          close={this.handleClose}
          text={this.state.alertText}
        />
      </div>
    );
  }

  componentDidMount() {
    document.title = "Sign up";
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.auth.registerResult) {
      if (
        this.props.auth.registerResult.code !== 200 &&
        this.props !== prevProps
      ) {
        this.setState({
          openAlert: true,
          alertText: "Please check your entries",
        });
      } else if (
        this.props.auth.registerResult.code === 200 &&
        this.props !== prevProps
      ) {
        this.props.history.push("/signin");
        window.location.reload();
      }
      this.props.auth.registerResult = null
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer,
  };
}
export default connect(mapStateToProps)(withRouter(RegisterComponent));
