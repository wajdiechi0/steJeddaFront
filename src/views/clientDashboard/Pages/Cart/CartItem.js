import React, { useEffect } from "react";
import { TrashIcon } from "./icons";
import { connect } from "react-redux";
import { formatNumber } from "./helpers/utils";
import { deleteFromCart } from "./../../../../redux/actions";
const CartItem = (props) => {
  let product = props.product;
  useEffect(() => {
    const fetchList = async () => {
      let result = props.crudTemplate.deleteFromCart;
      if (result) {
        if (result.code === 200) {
          window.location.reload();
        }
      }
      props.crudTemplate.fetchCart = null;
    };
    fetchList();
  }, [props.crudTemplate.deleteFromCart]);
  return (
    <div className="row no-gutters py-2">
      <div className="col-sm-2 p-2">
        {product.img && (
          <img
            alt={product.name}
            style={{ margin: "0 auto", maxHeight: "50px" }}
            src={
              "http://localhost:8080/api/template/loadtemplateimage?img=" +
              product.img
            }
            className="img-fluid d-block"
          />
        )}
      </div>
      <div className="col-sm-4 p-2">
        <h5 className="mb-1">{product.name}</h5>
        <p className="mb-1">Price: {formatNumber(product.price)} </p>
      </div>
      <div className="col-sm-4 p-2 text-right">
        <button
          onClick={() => {
            props.dispatch(
              deleteFromCart(
                JSON.parse(localStorage.getItem("user")).id,
                product.id
              )
            );
          }}
          className="btn btn-danger btn-sm mb-1"
        >
          <TrashIcon width={"20px"} />
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    crudTemplate: state.crudTemplate,
  };
}

export default connect(mapStateToProps)(CartItem);
