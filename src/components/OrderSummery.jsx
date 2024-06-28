import styles from "./OrderSummery.module.css";
import Button from "./Button";
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
            <span className={styles.price}> ${item.price}</span>
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
      <span>Subtotal: ${item.price}</span>
      <span>Shipping: $2</span>
      <hr />
      <span>Total:{item.price + 2.24 + 2}</span>
      <p>Including $2.24 in taxes</p>
      <Button type="learnmore" onClick={onClick} btnStyle={btnStyle}>
        Checkout
      </Button>
    </div>
  );
}
