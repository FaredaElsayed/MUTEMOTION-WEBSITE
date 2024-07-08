import styles from "./Homepage.module.css";
import LessonCard from "../components/LessonCard";
import { useState, useEffect } from "react";
import Slider from "../components/Slider";

const lessons = [
  {
    id: 1,
    num: "1",
    name: "Introduction to ASL ",
  },
  {
    id: 2,
    num: "2",
    name: "Introduction to ASL ",
  },
  {
    id: 3,
    num: "3",
    name: "Introduction to ASL ",
  },
  {
    id: 4,
    num: "4",
    name: "Introduction to ASL ",
  },
  {
    id: 5,
    num: "5",
    name: "Introduction to ASL ",
  },
  {
    id: 6,
    num: "6",
    name: "Introduction to ASL ",
  },
];
const lessonBreif = "Facial expressions & body language. The ABCs";

function LessonsSlider({ title, lessons}) {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 3000) {
        setCardsPerPage(5);
      } else if (window.innerWidth > 1200) {
        setCardsPerPage(3);
      } else if (window.innerWidth > 600) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(1);
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
      prevIndex + cardsPerPage < lessons.length ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : lessons.length - cardsPerPage
    );
  };

  return (
    <div>
      <div className={styles.slide}>
        <h1>{title}</h1>
        <Slider handleNext={handleNext} handlePrev={handlePrev} />
      </div>

      <div className={styles.cards}>
        {lessons
          .slice(startIndex, startIndex + cardsPerPage)
          .map((lesson, index) => (
            <div key={index} className={styles.card}>
              <LessonCard
                num={lesson.lessonNum}
                name={lesson.name}
                lessonBreif={lesson.description}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default LessonsSlider;
