import Button from "./Button";
import styles from "./Payment.module.css";
export default function Payment() {
  const btnStyle = {
    textTransform: "capitalize",
    borderColor: "#652d90",
    borderStyle: "solid",
    borderWidth: "2px",
    // width: "100%",
    // alignSelf: "center",
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
            Credit Card
          </label>
          <label>
            <input type="radio" name="paymentMethod" value="paypal" />
            PayPal
          </label>
        </div>

        <div>
          <label htmlFor="card">Card Number:</label>
          <input
            type="text"
            id="card"
            name="card"
            placeholder="1234 5678 9101 1121"
            minLength="16"
            maxLength="16"
            required
          />
        </div>
        <div className={styles.exp}>
          <div>
            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              placeholder="MM/YY"
              minLength="5"
              maxLength="5"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              minLength="3"
              maxLength="3"
              required
            />
          </div>
        </div>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="saveMethod"
            className={styles.checkbox}
          />
          <span className={styles.checkboxText}>Save card details</span>
        </label>
        <Button type="learnmore" btnStyle={btnStyle}>
          Pay
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
