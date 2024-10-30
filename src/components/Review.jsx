import { useState, useEffect } from "react";
import styles from "./Review.module.css";
import StarRating from "./StarRating";
import React from  "react";
function Review({ imgSrc, name, opinionHeadline, opinion, myRating }) {
  const [userRating, setUserRating] = useState("");
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
  return (
    <div className={styles.reviews}>
      <div className={styles.rev}>
        <img src={imgSrc} alt={name}></img>
        <div className={styles.info}>
          <StarRating
            maxRating={5}
            size={windowSize.width >= 4000 ? 50 : 25}
            hoverEnabled={false}
            defaultRating={myRating}
          />
          <h2>{opinionHeadline}</h2>
          <p>{opinion}</p>
        </div>
      </div>
    </div>
  );
}

export default Review;
