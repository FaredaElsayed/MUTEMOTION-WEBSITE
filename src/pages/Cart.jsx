import { useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Cart.module.css";

import EmptyCart from "../components/EmptyCart";
function Cart() {
  const [items, setItems] = useState(0);

  return (
    <>
      <div className={styles.cart}>
        <PageNav />
        <span>Your Cart</span>
        <main>
          <span>{items} items in your cart</span>
          {!items && <EmptyCart />}
        </main>
      </div>
    </>
  );
}

export default Cart;
