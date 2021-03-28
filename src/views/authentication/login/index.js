import React from "react";
import "./login.css";
import { TextField, Button } from "@material-ui/core";
import Alert from "../components/alert";
import logo from "./../../../assets/logo.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "./../../../redux/actions";

class LoginComponent extends React.Component {
  state = {
    email: "",
    password: "",
    open: false,
    alertText: "",
  };
  styles = {
    root: {
      background: "black",
    },
    input: {
      color: "#2EFF22",
    },
  };
  render() {
    return (
      <div className={"lContainer"}>
        <div className={"lFormContainer"}>
          <img
            src={logo}
            style={{ width: "258", height: 150, marginBottom: 30 }}
            alt={"jds"}
          />
          <TextField
            id="outlined-dense"
            label="Email address"
            variant="outlined"
            margin={"dense"}
            className={"input"}
            style={{ backgroundColor: "#fff" }}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            variant="outlined"
            margin={"dense"}
            style={{ backgroundColor: "#fff" }}
            className={"input"}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <Button
            href={"/resetpassword"}
            style={{ fontWeight: "bold", color: "#3897f0" }}
          >
            {" "}
            Forgot Password ?
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "80%",
              backgroundColor: "#3897f0",
              fontWeight: "bold",
            }}
            onClick={() => {
              this.props.dispatch(login(this.state.email, this.state.password));
            }}
          >
            Sign In
          </Button>
          <div className={"signUpCont"}>
            <p>Don't have an account ?</p>
            <Button
              href={"/signup"}
              style={{ fontWeight: "bold", color: "#3897f0" }}
            >
              Sign Up !
            </Button>
          </div>
        </div>
        <Alert
          open={this.state.open}
          close={() => {
            this.setState({
              open: false,
            });
          }}
          success={false}
          text={this.state.alertText}
        />
      </div>
    );
  }
  componentDidMount() {
    document.title = "Sign in";
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.auth.loginResult) {
      if (
        this.props.auth.loginResult.code !== 200 &&
        this.props !== prevProps
      ) {
        this.setState({
          open: true,
          alertText: "Please check your entries",
        });
      } else if (
        this.props.auth.loginResult.code === 200 &&
        this.props !== prevProps
      ) {
        console.log(this.props.auth.loginResult.data);
        if (this.props.auth.loginResult.data.role !== "user") {
          this.setState({
            open: true,
            alertText: "Please check your entries",
          });
        } else {
          localStorage.setItem(
            "user",
            JSON.stringify(this.props.auth.loginResult.data)
          );
          this.props.history.push("/");
          window.location.reload();
        }
      }
      this.props.auth.loginResult = null;
    }
  }
}
function mapStateToProps(state) {
  return {
    auth: state.authReducer,
  };
}
export default connect(mapStateToProps)(withRouter(LoginComponent));
