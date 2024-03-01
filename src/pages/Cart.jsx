import { useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Cart.module.css";
import Footer from "../components/Footer";
import EmptyCart from "../components/EmptyCart";
import OrderSummery from "../components/OrderSummery";
import Payment from "../components/Payment";
import Pay from "../components/Pay";
import CartCard from "../components/CartCard";
function Cart() {
  const [items, setItems] = useState(1);
  const [isPaying, setIsPaying] = useState(false);
  function handlePaying() {
    setIsPaying(true);
  }
  return (
    <>
      <div className={styles.cart}>
        <PageNav />

        {!isPaying && (
          <>
            <span>Your Cart</span>
            <span className={styles.span}>{items} items in your cart</span>
          </>
        )}
        <main>
          {!items && <EmptyCart />}
          {items && (
            <>
              <h1>Checkout</h1>
              <div>
                {!isPaying && <CartCard />}
                {isPaying && <Payment />}
                <OrderSummery onClick={handlePaying} />
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
