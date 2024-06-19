import Button from "./Button";
import styles from "./Payment.module.css";
export default function Pay() {
  const btnStyle = {
    textTransform: "capitalize",
    borderColor: "#652d90",
    borderStyle: "solid",
    borderWidth: "2px",
    width: "90%",
    alignSelf: "center",
    margin: "2rem",
  };
  return (
    <div className={styles.payment}>
      <span>Payment</span>
      <hr />
      <form>
        <span>Pay with:</span>
        <div className={styles.method}>
          <label>
            <input type="radio" name="paymentMethod" value="creditCard" />
            Card
          </label>
          {/* <label>
            <input type="radio" name="paymentMethod" value="paypal" />
            PayPal
          </label> */}
        </div>
        <span className={styles.cardPin}>
          Enter your 4-digit card pin to confirm this payment
        </span>
        <div className={styles.pin}>
          <input type="text" id="pin" name="pin" maxLength="1" required />
          <input type="text" id="pin" name="pin" maxLength="1" required />
          <input type="text" id="pin" name="pin" maxLength="1" required />
          <input type="text" id="pin" name="pin" maxLength="1" required />
        </div>

        <Button type="learnmore" btnStyle={btnStyle}>
          Confirm Payment
        </Button>
        <p>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </p>
      </form>
    </div>
  );
}
