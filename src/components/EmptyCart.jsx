import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import styles from "../pages/Cart.module.css";
import React from  "react";
export default function EmptyCart() {
  const navigateTo = useNavigate();
  const btnStyle = {
    textTransform: "capitalize",
    borderColor: "#652d90",
    borderStyle: "solid",
    borderWidth: "2px",
  };

  function handleGoToCourses() {
    navigateTo("/courses")
  }
  return (
    <div className={styles.emptyRect}>
      <img src="./emp.png" alt="Empty Cart"></img>
      <span className={styles.span}>
        Your cart is empty. Keep scrolling to find a course!
      </span>
      <Button type="learnmore" btnStyle={btnStyle} onClick={handleGoToCourses}>
        Go to shopping
      </Button>
    </div>
  );
}
