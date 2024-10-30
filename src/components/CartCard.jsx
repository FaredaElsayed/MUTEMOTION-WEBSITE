import { useState, useEffect } from "react";
import styles from "./CartCard.module.css";
import StarRating from "./StarRating";
import { useAuth } from "../contexts/Auth";
import React from  "react";
export default function CartCard({ item ,onTitleClick}) {
  const [iconSize, setIconSize] = useState(32);
  const { token } = useAuth();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      // Update icon size based on window width
      if (window.innerWidth >= 4000) {
        setIconSize(70);
      } else {
        setIconSize(40);
      }

      // Update window size state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set initial icon size and window size
    handleResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run the effect only once

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://mutemotion.onrender.com/api/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ courseId: item._id }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to delete item from cart: ${errorMessage}`);
      }

      // Handle success: You may want to update the UI to reflect the deletion
      console.log("Item deleted successfully");
      window.location.reload();
      // Example: You can trigger a callback to reload the cart items
      // reloadCartItems();
    } catch (error) {
      console.error("Error deleting item from cart:", error.message);
    }
  };

  const handleTitleClick = () => {
    // Pass item details to parent component
    onTitleClick(item);
  };


  return (
    <div className={styles.cardContainer}>
      <img
        src={item.poster}
        alt={`Image for ${item.title}`}
        onClick={handleTitleClick}
        style={{cursor:"pointer"}}
      />
      <div className={styles.contentDesc}>
        <div className={styles.nameIcon}>
          <p onClick={handleTitleClick}>{item.title}</p>
          <svg
            onClick={handleDelete}
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
        <span className={styles.span}> {item.instructor} </span>
        <span className={styles.span}>
          {item.hours} hours on-demand video Discount {item.discount}% off
        </span>
        <StarRating
          maxRating={5}
          size={windowSize.width >= 4000 ? 50 : 25}
          hoverEnabled={false}
          defaultRating={Number(item.review)}
        />
        <span className={styles.price}>${Math.round(item.price)}</span>
      </div>
    </div>
  );
}
