import React, { useState, useEffect } from "react";
import { formatNumber } from "./../Cart/helpers/utils";
import TemplateDetails from "./TemplateDetails";
import { addToCart } from "./../../../../redux/actions";
import { connect } from "react-redux";
import Alert from "./../../../authentication/components/alert";
const TemplateItem = (props) => {
  const template = props.template;
  const cartItems = [];
  const [openAlert, changeOpenAlert] = useState(false);
  const [alertText, changeAlertText] = useState("");
  const [alertSuccess, changeAlertSuccess] = useState(false);
  const [templateDetailsOpen, setTemplateDetailsOpen] = useState(false);
  const isInCart = (template) => {
    return !!cartItems.find((item) => item.id === template.id);
  };

  const handleCart = () => {
    props.dispatch(
      addToCart(JSON.parse(localStorage.getItem("user")).id, template.id)
    );
  };

  useEffect(() => {
    const fetchList = async () => {
      let result = props.crudTemplate.addToCart;
      if (result) {
        if (result.code === 200) {
          changeOpenAlert(true);
          changeAlertSuccess(true);
          changeAlertText("Template successfully added in cart ");
        } else {
          changeOpenAlert(true);
          changeAlertSuccess(false);
          changeAlertText(result.message);
        }
        props.crudTemplate.addToCart = null;
      }
    };
    fetchList();
  }, [props.crudTemplate.addToCart]);
  return (
    <div className="card card-body" style={{ marginBottom: "10px" }}>
      <img
        style={{ display: "block", margin: "0 auto 10px", maxHeight: "200px" }}
        className="img-fluid"
        src={
          "http://localhost:8080/api/template/loadtemplateimage?img=" +
          template.img
        }
        alt=""
      />
      <p>{template.name}</p>
      <h3 className="text-left">{formatNumber(template.price)}</h3>
      <div className="text-right">
        <button
          onClick={() => {
            setTemplateDetailsOpen(true);
          }}
          className="btn btn-link btn-sm mr-2"
        >
          Details
        </button>

        {isInCart(template) && (
          <button className="btn btn-outline-primary btn-sm">Add more</button>
        )}

        {!isInCart(template) && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              handleCart();
            }}
          >
            Add to cart
          </button>
        )}
      </div>

      <TemplateDetails
        open={templateDetailsOpen}
        close={() => {
          setTemplateDetailsOpen(false);
        }}
        template={template}
      />

      <Alert
        open={openAlert}
        close={() => {
          changeOpenAlert(false);

        }}
        text={alertText}
        success={alertSuccess}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    crudTemplate: state.crudTemplate,
  };
}

export default connect(mapStateToProps)(TemplateItem);
