import BuyedCourseHeader from "../components/BuyedCourseHeader";
import styles from "../components/CourseHeader.module.css";
import LessonsSlider from "./LessonsSlider";
import { courses } from "./Homepage";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";


function CourseAfterBuying() {
  return (
    <>
      <div className={styles.courses}>
        <PageNav />
        <BuyedCourseHeader
          courseTitle="Learn Figma - ASL Essential Training"
          courseImg="./ASL-1 1.png"
          courseAlt={courses.alt}
          courseBreif={courses.courseBreif}
        />
        <LessonsSlider title="Weak 1" />
        <LessonsSlider title="Weak 2" />
        <LessonsSlider title="Weak 3" />
      </div>
      <Footer />
    </>
  );
}

export default CourseAfterBuying;
