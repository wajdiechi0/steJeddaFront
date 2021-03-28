import React from "react";
import "./editTemplate.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Close from "@material-ui/icons/Close";
import { connect } from "react-redux";

import { updateTemplate } from "./../../../../../../redux/actions";
import ResultAlert from "./../../../../../components/alert";
import { TextField } from "@material-ui/core";
import Button from "./../../../../../components/CustomButton";
class EditTemplateComponent extends React.Component {
  state = {
    open: false,
    alertText: "",
    disabled: false,
    success: true,
    tName: "",
    tFile: undefined,
    tPrice: "",
    tImage: undefined,
    tDesc: "",
  };
  editTemp = async () => {
    if (this.state.tName === "") {
      this.setState({
        open: true,
        alertText: "Please check template name",
        success: false,
      });
    }
    if (this.state.tPrice === "") {
      this.setState({
        open: true,
        alertText: "Please check template price",
        success: false,
      });
    }
    this.props.dispatch(
      updateTemplate(
        this.props.template.id,
        this.state.tName,
        this.state.tDesc,
        this.state.tPrice,
        this.state.tFile,
        this.state.tImage
      )
    );
  };
  render() {
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.close}>
          <div className={"editAppContainer"}>
            <div className={"affectRequestTitle"}>
              <h3 style={{ marginLeft: "auto" }}>Edit template</h3>
              <IconButton
                style={{ marginLeft: "auto" }}
                onClick={this.props.close}
              >
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
            <div className={"textfieldCont"}>
              <span className={"formText"}>Name</span>
              <TextField
                margin="dense"
                label={"name"}
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                defaultValue={this.props.template.name}
                onChange={(e) => {
                  this.setState({ tName: e.target.value });
                }}
              />
            </div>
            <div className={"textfieldCont"}>
              <span className={"formText"}>Image</span>
              <input
                margin="dense"
                label={"Image"}
                type={"file"}
                accept="image/*"
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                onChange={(e) => {
                  this.setState({ tImage: e.target.files[0] });
                }}
              />
            </div>
            <div className={"textfieldCont"}>
              <span className={"formText"}>Description</span>
              <TextField
                margin="dense"
                label={"Description"}
                multiline
                rows="4"
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                defaultValue={this.props.template.description}
                onChange={(e) => {
                  this.setState({ tDesc: e.target.value });
                }}
              />
            </div>

            <div className={"textfieldCont"}>
              <span className={"formText"}>Price</span>
              <TextField
                margin="dense"
                label={"Price"}
                InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
                inputProps={{ style: { fontSize: ".9em" } }}
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                defaultValue={
                  this.props.template.price ? this.props.template.price : ""
                }
                onChange={(e) => {
                  this.setState({ tPrice: e.target.value });
                }}
              />
            </div>

            <div className={"textfieldCont"}>
              <span className={"formText"}>File</span>
              <input
                margin="dense"
                label={"File"}
                type={"File"}
                accept=".zip,.rar,.7zip"
                style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
                onChange={(e) => {
                  this.setState({ tFile: e.target.files[0] });
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 10,
              }}
            >
              <Button
                onClick={this.editTemp}
                color={"primary"}
                style={{
                  marginLeft: "auto",
                  marginRight: "50px",
                  marginTop: "10px",
                }}
              >
                Update Template
              </Button>
            </div>
          </div>
        </Dialog>
        <ResultAlert
          open={this.state.open}
          close={() => {
            this.setState({
              open: false,
            });
          }}
          text={this.state.alertText}
          success={this.state.success}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.template !== this.props.template) {
      this.setState({
        tName: this.props.template.name,
        tDesc: this.props.template.description,
        tPrice: this.props.template.price,
      });
    }
    if (
      prevProps.crudTemplate.updateTemplate !==
      this.props.crudTemplate.updateTemplate
    ) {
      let result = this.props.crudTemplate.updateTemplate;
      if (result.code === 200) {
        this.setState({
          open: true,
          alertText: "You have successfully updated the template",
          success: true,
        });
      } else {
        this.setState({
          open: true,
          alertText: "Please check your entries",
          success: false,
        });
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    crudTemplate: state.crudTemplate,
  };
}

export default connect(mapStateToProps)(EditTemplateComponent);
