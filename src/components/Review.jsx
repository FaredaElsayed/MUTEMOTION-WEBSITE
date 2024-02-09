import { useState } from "react";
import styles from "./Review.module.css";
import StarRating from "./StarRating";

function Review({ imgSrc, name, opinionHeadline, opinion, myRating }) {
  const [userRating, setUserRating] = useState("");
  return (
    <div className={styles.reviews}>
      <div className={styles.rev}>
        <img src={imgSrc} alt={name}></img>
        <div className={styles.info}>
          <StarRating
            maxRating={5}
            size={25}
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
