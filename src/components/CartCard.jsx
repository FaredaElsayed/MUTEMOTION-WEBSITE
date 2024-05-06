import { useState, useEffect } from "react";
import styles from "./CartCard.module.css";
import StarRating from "./StarRating";

export default function CartCard() {
  const [iconSize, setIconSize] = useState(32);
  const [myRating, setMyRating] = useState(4);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      // Update icon size based on window width
      if (window.innerWidth >= 4000) {
        setIconSize(70);
      } else {
        setIconSize(40);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set initial icon size
    handleResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className={styles.cardContainer}>
      <img src="/cartCard.png" alt="Michel sam"></img>
      <div className={styles.contentDesc}>
        <div className={styles.nameIcon}>
          <p>ASL For Kids</p>
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 31 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
          >
            <path
              d="M8.98438 27.1464C8.29688 27.1464 7.70854 26.8937 7.21937 26.3882C6.73021 25.8828 6.48521 25.2744 6.48438 24.5631V7.77144H5.23438V5.18811H11.4844V3.89644H18.9844V5.18811H25.2344V7.77144H23.9844V24.5631C23.9844 25.2735 23.7398 25.8819 23.2506 26.3882C22.7615 26.8946 22.1727 27.1473 21.4844 27.1464H8.98438ZM21.4844 7.77144H8.98438V24.5631H21.4844V7.77144ZM11.4844 21.9798H13.9844V10.3548H11.4844V21.9798ZM16.4844 21.9798H18.9844V10.3548H16.4844V21.9798Z"
              fill="#442C8F"
            />
          </svg>
        </div>
        <span className={styles.span}> Michel sam </span>
        <span className={styles.span}>
          3.5 hours on-demand video Discount69% off
        </span>
        <StarRating
          maxRating={5}
          size={windowSize.width >= 4000 ? 50 : 25}
          hoverEnabled={false}
          defaultRating={myRating}
        />
        <span className={styles.price}>E£399.99</span>
      </div>
    </div>
  );
}
