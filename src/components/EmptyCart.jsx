import Button from "../components/Button";
import styles from "../Pages/Cart.module.css";
export default function EmptyCart() {
  const btnStyle = {
    textTransform: "capitalize",
    borderColor: "#652d90",
    borderStyle: "solid",
    borderWidth: "2px",
  };
  return (
    <div className={styles.emptyRect}>
      <img src="./emp.png" alt="Empty Cart"></img>
      <span className={styles.span}>Your cart is empty. Keep scrolling to find a course!</span>
      <Button type="learnmore" btnStyle={btnStyle}>
        Go to shopping
      </Button>
    </div>
  );
}
