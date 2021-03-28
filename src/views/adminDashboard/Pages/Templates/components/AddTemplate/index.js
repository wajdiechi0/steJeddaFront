import React, { useState, useEffect } from "react";
import "./addTemplate.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { TextField } from "@material-ui/core";
import Button from "./../../../../../components/CustomButton";
import Close from "@material-ui/icons/Close";
import { connect } from "react-redux";
import ResultAlert from "./../../../../../components/alert";
import {
  uploadTemplateDetails,
  uploadTemplateImage,
  uploadTemplateFile,
} from "./../../../../../../redux/actions";
function AddTemplateComponent(props) {
  const [name, changeName] = useState("");
  const [desc, changeDesc] = useState("");
  const [image, changeImage] = useState("");
  const [price, changePrice] = useState("");
  const [file, changeFile] = useState("");

  const [open, openAlert] = useState(false);
  const [alertText, changeAlertText] = useState("");
  const [success, changeAlertForm] = useState(true);
  const uploadTemplate = async (name, desc, image, price, file) => {
    await props.dispatch(uploadTemplateDetails(name, desc, price,image,file));
  };
  useEffect(() => {
    let result = props.crudTemplate.uploadTemplateDetailsResult;
    if (result) {
      changeAlertText(result.message);
      openAlert(true);
      if (result.code !== 200) {
        changeAlertForm(false);
      } else if (result.code === 200) {
        if (image) {
          props.dispatch(uploadTemplateImage(image,result.data.idTemplate));
        }
        if (file) {
          props.dispatch(uploadTemplateFile(file,result.data.idTemplate));
        }
        changeAlertForm(true);
      }
      props.crudTemplate.uploadTemplateDetailsResult = null;
    }
  }, [props.crudTemplate.uploadTemplateDetailsResult]);
  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <div className={"addTemplateContainer"}>
          <div className={"dialogTitle"}>
            <h3 style={{ marginLeft: "auto" }}>Add new template </h3>
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
          <div className={"textfieldCont"}>
            <span className={"formText"}>Name</span>
            <TextField
              margin="dense"
              label={"Name"}
              InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
              inputProps={{ style: { fontSize: ".9em" } }}
              style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
              required={true}
              onChange={(e) => {
                changeName(e.target.value);
              }}
            />
          </div>
          <div className={"textfieldCont"}>
            <span className={"formText"}>Image</span>
            <input
              margin="dense"
              label={"Image"}
              accept="image/*"
              type="file"
              style={{
                marginRight: 50,
                marginTop: 10,
                marginLeft: "30px",
                width: "60%",
              }}
              required={true}
              onChange={(e) => {
                changeImage(e.target.files[0]);
              }}
            />
          </div>
          <div className={"textfieldCont"}>
            <span className={"formText"}>Description</span>
            <TextField
              margin="dense"
              label={"Description"}

          multiline
          rows={4}
              InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
              inputProps={{ style: { fontSize: ".9em" } }}
              style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
              required={true}
              onChange={(e) => {
                changeDesc(e.target.value);
              }}
            />
          </div>
          <div className={"textfieldCont"}>
            <span className={"formText"}>Price</span>
            <TextField
              label={"Price"}
              margin="dense"
              InputLabelProps={{ style: { fontSize: ".9em" }, shrink: true }}
              inputProps={{ style: { fontSize: ".9em" } }}
              style={{ marginRight: 50, marginLeft: "30px", width: "60%" }}
              required={true}
              onChange={(e) => {
                changePrice(e.target.value);
              }}
            />
          </div>
          <div className={"textfieldCont"}>
            <span className={"formText"}>File</span>
            <input
              margin="dense"
              accept=".zip,.rar,.7zip"
              label={"Zip file"}
              style={{
                marginRight: 50,
                marginTop: 10,
                marginLeft: "30px",
                width: "60%",
              }}
              required={true}
              type={"file"}
              onChange={(e) => {
                changeFile(e.target.files[0]);
              }}
            />
          </div>

          <div className={"simpleSet"}>
            <Button
              onClick={() => {
                uploadTemplate(name, desc, image, price, file);
              }}
              color={"primary"}
              style={{
                marginLeft: "auto",
                marginRight: "50px",
                marginTop: "10px",
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Dialog>
      <ResultAlert
        open={open}
        close={() => {
          openAlert(false);
        }}
        text={alertText}
        success={success}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    crudTemplate: state.crudTemplate,
  };
}

export default connect(mapStateToProps)(AddTemplateComponent);
