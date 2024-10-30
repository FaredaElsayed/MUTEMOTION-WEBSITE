import styles from "./OrderSummery.module.css";
import Button from "./Button";
import React from  "react";
export default function OrderSummery({ item, onClick }) {
  const btnStyle = {
    textTransform: "capitalize",
    borderColor: "#652d90",
    borderStyle: "solid",
    borderWidth: "2px",
    width: "100%",
  };
  return (
    <div className={styles.mainRect}>
      <span>Order Summery</span>
      <hr />
      <div className={styles.card}>
        <img src={item.poster} alt={item.title}></img>
        <div className={styles.cardContent}>
          <header className={styles.header}>
            <span>{item.title} </span>
            <span className={styles.price}> ${Math.round(item.price)}</span>
          </header>
          <div className={styles.name}>
            <span>{item.instructor}</span>
            <span>Qty: 1</span>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.code}>
        <input type="text" placeholder="Gift or discount code" />
        <Button type="apply">Apply</Button>
      </div>
      

      <hr />
      <span>Total: {Math.round(item.price)}</span>

      <Button type="learnmore" onClick={onClick} btnStyle={btnStyle}>
        Checkout
      </Button>
    </div>
  );
}
