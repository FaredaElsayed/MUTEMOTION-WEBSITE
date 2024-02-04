import { useState } from "react";
import styles from "./CourseCard.module.css";
import StarRating from "./StarRating";

function CourseCard({ level, instructor, imgSrc, alt }) {
  const [userRating, setUserRating] = useState("");
  
  return (
    <div className={styles.card}>
      <img src={imgSrc} alt={alt}></img>
      <h1>{level}</h1>
      <h3>{instructor}</h3>
      <StarRating maxRating={5} size={45} onSetRating={setUserRating} />
    </div>
  );
}

export default CourseCard;
