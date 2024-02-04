import styles from "./Homepage.module.css";
import CourseCard from "../components/CourseCard";
import { useState } from "react";
import Slider from "../components/Slider";
import { courses } from "./Homepage";

function CustomSlider({ title }) {
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 3;

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + cardsPerPage < courses.length ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : courses.length - cardsPerPage
    );
  };

  return (
    <div className={styles.courses}>
      <div className={styles.slide}>
        <h1>{title}</h1>
        <Slider handleNext={handleNext} handlePrev={handlePrev} />
      </div>

      <div className={styles.cards}>
        {courses
          .slice(startIndex, startIndex + cardsPerPage)
          .map((course, index) => (
            <div key={index} className={styles.card}>
              <CourseCard {...course} key={course.id} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CustomSlider;
