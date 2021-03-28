import React, { useEffect, useState } from "react";
import Layout from "./Layout";

import CartProducts from "./CartProducts";
import Checkout from "./Checkout";

import { connect } from "react-redux";
import { fetchCart, clearCart } from "./../../../../redux/actions";
const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, changeTotal] = useState(0);
  const [open, openCheckout] = useState(false);
  useEffect(() => {
    props.dispatch(fetchCart(JSON.parse(localStorage.getItem("user")).id));
    document.title = "Cart";
  }, []);
  useEffect(() => {
    const fetchList = async () => {
      let result = props.crudTemplate.fetchCart;
      if (result) {
        if (result.code === 200) {
          setCartItems(result.data);
          let totalPrice = 0;
          for (let i = 0; i < result.data.length; i++) {
            totalPrice += result.data[i].price;
            changeTotal(totalPrice);
          }
        }
        props.crudTemplate.fetchCart = null;
      }
    };
    fetchList();
  }, [props.crudTemplate.fetchCart]);

  return (
    <Layout title="Cart">
      <div>
        <div className="text-center mt-5">
          <h1>Cart</h1>
        </div>

        <div className="row no-gutters justify-content-center">
          <div className="col-sm-9 p-3">
            {cartItems.length > 0 ? (
              <CartProducts cartItems={cartItems} />
            ) : (
              <div className="p-3 text-center text-muted">
                Your cart is empty
              </div>
            )}
          </div>
          {1 > 0 && (
            <div className="col-sm-3 p-3">
              <div className="card card-body">
                <p className="mb-1">Total Items</p>
                <h4 className=" mb-3 txt-right">{cartItems.length}</h4>
                <p className="mb-1">Total Payment</p>
                <h3 className="m-0 txt-right">
                  {cartItems.length === 0 ? 0 : total}
                </h3>
                <hr className="my-4" />
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary mb-2"
                    onClick={() => {
                      openCheckout(true);
                    }}
                    disabled={cartItems.length === 0 ? true : false}
                  >
                    CHECKOUT
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      props.dispatch(
                        clearCart(JSON.parse(localStorage.getItem("user")).id)
                      );
                      setCartItems([]);
                    }}
                    className="btn btn-outlineprimary btn-sm"
                  >
                    CLEAR
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Checkout
        open={open}
        close={() => {
          openCheckout(false);
        }}
        cartItems={cartItems}
        total={total}
        emptyCart={() => {
          setCartItems([]);
        }}
      />
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    crudTemplate: state.crudTemplate,
  };
}

export default connect(mapStateToProps)(Cart);
