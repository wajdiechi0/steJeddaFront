import React from "react";
import "./templateDetails.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Close from "@material-ui/icons/Close";
import { connect } from "react-redux";

function AppointmentRequestComponent(props) {
  return (
    <div>
      <Dialog open={props.open} onClose={props.close} maxWidth={"md"}>
        <div className={"templateDetailsContainer"}>
          <div className={"templateDetailsTitle"}>
            <h3 style={{ marginLeft: "auto" }}>Template details</h3>
            <IconButton style={{ marginLeft: "auto" }} onClick={props.close}>
              <Close />
            </IconButton>
          </div>
          <div
            style={{
              backgroundColor: "#9d9d9d",
              width: "100%",
              height: 1,
              opacity: 0.5,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent:"center"
            }}
          >
            {props.template.img && (
              <img
                style={{
                  maxHeight: 150,
                  marginTop: 20,
                }}
                src={
                  "http://localhost:8080/api/template/loadtemplateimage?img=" +
                  props.template.img
                }
                alt=""
              />
            )}
            <h5 style={{ marginTop: 10 }}>{props.template.name}</h5>
            <p style={{ marginTop: 10 }}>{props.template.description}</p>
            <h6 style={{ position:"absolute",bottom:10,right:20,marginTop:50 }}>{props.template.price} $</h6>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    crudUser: state.crudReducer,
  };
}

export default connect(mapStateToProps)(AppointmentRequestComponent);
