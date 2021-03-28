import React from "react";

import CartItem from "./CartItem";
import styles from "./CartProducts.module.scss";
const CartProducts = (props) => {
  return (
    <div className={styles.p__container}>
      <div className="card card-body border-0">
        {props.cartItems.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CartProducts;
