import styles from "./Homepage.module.css";
import CourseCard from "../components/CourseCard";
import Slider from "../components/Slider";
import { useState, useEffect } from "react";
import { courses } from "./Homepage";

function CustomSlider({ title }) {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 3000) {
        setCardsPerPage(5);
      } else {
        setCardsPerPage(3);
      }
    }

    // Call handleResize initially to set the initial value
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <div>
      <div className={styles.slide}>
        <h1>{title}</h1>
        <Slider handleNext={handleNext} handlePrev={handlePrev} />
      </div>

      <div className={styles.cards}>
        {courses
          .slice(startIndex, startIndex + cardsPerPage)
          .map((course, index) => (
            <div key={index} className={styles.card}>
              <CourseCard {...course} key={course.id} id={course.id}/>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CustomSlider;
