import styles from "./CourseHeader.module.css";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import React from  "react";
export default function BuyedCourseHeader({ courseTitle, courseImg, alt }) {
  const customProgressBarStyle = {
    width: "130%",
    marginTop: "3rem",
  };

  const btnStyle1 = {
    fontSize: "2.5rem",
    textTransform: "uppercase",
    borderColor: "#442C8F",
    borderStyle: "solid",
    borderWidth: "2px",
  };

  return (
    <>
      <header className={styles.coursesHeader}>
        <div className={styles.rect1}>
          <div className={styles.content}>
            <h1>{courseTitle}</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
              recusandae perferendis, perspiciatis harum repudiandae, dolor
              mollitia nobis ea velit soluta at possimus dicta non nam
              exercitationem maxime illo facere odit.
            </p>
          </div>

          <div className={styles.btns}>
            <Button type="learnmore" btnStyle={btnStyle1}>
              resume
            </Button>
            <ProgressBar customProgressBarStyle={customProgressBarStyle} />
          </div>
        </div>
        <div className={styles.rect}>
          <img src={courseImg} alt={alt} className={styles.img1}></img>
        </div>
      </header>
    </>
  );
}
