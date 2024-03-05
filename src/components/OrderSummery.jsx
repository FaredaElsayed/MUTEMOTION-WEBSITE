import styles from "./OrderSummery.module.css";
import Button from "./Button";
export default function OrderSummery({ onClick }) {
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
        <img src="./imgCart.png" alt="img cart"></img>
        <div className={styles.cardContent}>
          <header className={styles.header}>
            <span>ASL For Kids </span>
            <span className={styles.price}>E£399</span>
          </header>
          <div className={styles.name}>
            <span>Michel sam</span>
            <span>Qty: 2</span>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.code}>
        <input type="text" placeholder="Gift or discount code" />
        <Button type="apply">Apply</Button>
      </div>
      <hr />
      <span>Subtotal:</span>
      <span>Shipping:</span>
      <hr />
      <span>Total:</span>
      <p>Including $2.24 in taxes</p>
      <Button type="learnmore" onClick={onClick} btnStyle={btnStyle}>
        Checkout
      </Button>
    </div>
  );
}
