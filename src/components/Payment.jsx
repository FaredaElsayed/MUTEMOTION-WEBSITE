import { useEffect, useState } from "react";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import styles from "./Payment.module.css";
import { useAuth } from "../contexts/Auth";
import toast, { Toaster } from "react-hot-toast";
export default function Payment({ item, onPaymentSuccess }) {
  const btnStyle = {
    textTransform: "capitalize",
    borderColor: "#652d90",
    borderStyle: "solid",
    borderWidth: "2px",
  };
  const [paymentInfo, setPaymentInfo] = useState({
    cartNumber: "",
    expirationDate: "",
  });
  const { token,logout } = useAuth();
  const [isPurchased, setIsPurchased] = useState(false);
  const handlePayment = async (event) => {
    event.preventDefault();

    try {
      // Call API to add course to myLearning
      const response = await fetch("https://mutemotion.onrender.com/api/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: item._id }),
      });
      const data = await response.json();
      if (
        response.status === 400 &&
        data.message === "You have already purchased this course"
      ) {
        setIsPurchased((isPurchased) => true);
        toast.success("You have already purchased this course");
        console.log(isPurchased);
      }

      if (!response.ok) {
        throw new Error("Failed to add course to myLearning");
      }

      // Call onPaymentSuccess callback to update UI
      onPaymentSuccess();
      
      // Optional: You can clear form fields or perform other actions after payment
      setPaymentInfo({ cartNumber: "", expirationDate: "" });
      setTimeout(() => {
        window.location.reload();
      }, 500);
      console.log("Course added to myLearning successfully");
    } catch (error) {
      console.error("Error adding course to myLearning:", error.message);
       logout();
    }
  };
  useEffect(() => {
    setIsPurchased(false); // Reset isPurchased when item._id changes
  }, [item._id]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };
  console.log("Current isPurchased state:", isPurchased);
  return (
    <div className={styles.payment}>
      <div>
        
      </div>
      <span>Payment</span>
      <hr />
      <form onSubmit={handlePayment}>
        <span>Pay with:</span>

        <div>
          <label htmlFor="cart">Cart Number:</label>

          <input
            type="text"
            id="cartNumber"
            name="cartNumber"
            placeholder="1234 5678 9101 1121"
            value={paymentInfo.cartNumber}
            onChange={handleInputChange}
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
              value={paymentInfo.expirationDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              minLength="5"
              maxLength="5"
              required
            />
          </div>
        </div>
        <div className={styles.btns}>
          <ButtonBack />
          <Button type="learnmore" btnStyle={btnStyle} disabled={isPurchased}>
            Pay
          </Button>
        </div>
        {isPurchased && (
          <p style={{ color: "red" }}>You have already purchased this course</p>
        )}
        <p>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </p>
      </form>
    </div>
  );
}
