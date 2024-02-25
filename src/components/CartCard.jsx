import { useState } from "react";
import styles from "./CartCard.module.css";
import StarRating from "./StarRating";

export default function CartCard() {
  const [myRating, setMyRating] = useState(4);
  return (
    <div className={styles.cardContainer}>
      <img src="/cartCard.png" alt="Michel sam"></img>
      <div className={styles.contentDesc}>
        <p>ASL For Kids</p>
        <span className={styles.span}> Michel sam </span>
        <span className={styles.span}>
          3.5 hours on-demand video Discount69% off
        </span>
        <StarRating
          maxRating={5}
          size={25}
          hoverEnabled={false}
          defaultRating={myRating}
        />
        <span className={styles.price}>E£399.99</span>
      </div>
    </div>
  );
}
