import styles from "./Instructor.module.css";
import ParagraphToList from "./ParagraphToList";
import React from  "react";
function Instructor({
  imgSrc,
  name,
  info,
  instInfo,
  coursesGiven,
  certificate,
  education,
}) {
  return (
    <div className={styles.instructor}>
      <p>Instructor</p>

      <div className={styles.mainInfo}>
        <img src={imgSrc} alt={name}></img>
        <ul>
          <h6 style={{ textDecoration: "underline" }}>Courses Given: </h6>
          {coursesGiven.map((course, index) => (
            <li key={index}>.{course}</li>
          ))}
        </ul>
      </div>

      <div className={styles.instInfo}>
        <h2>{name}</h2>
        <p>{instInfo}</p>
        <p>education background: {education}.</p>
        <p>Certificate: {certificate}.</p>
      </div>
    </div>
  );
}

export default Instructor;
