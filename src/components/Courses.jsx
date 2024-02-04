import CourseCard from "../components/CourseCard";
import styles from "./CourseCard.module.css";

function Courses({children}){
    const courseData = {
        level: "ASL For Beginners",
        instructor: "Mairina Michel, Level1",
        imgSrc: "./img-4.png",
        alt: "Mairina Michel, Level1",
      };
    return <><h1>{children}</h1>
    <div className={styles.cards}>
      <CourseCard {...courseData} />
      <CourseCard {...courseData} />
      <CourseCard {...courseData} />
    </div></>
}

export default Courses;