import CourseHeader from "../components/CourseHeader";
import styles from "../components/CourseHeader.module.css";
import ParagraphToList from "../components/ParagraphToList";
import LessonsSlider from "./LessonsSlider";
import { courses } from "./Homepage";
const p =
  " Over 500 vocabulary words you'll start using right away. Nearly 3 hours of on-demand video instruction. More than 50 activities to help extend your learning. 40 practice interactions that let you follow Dr Byron one sentence at a time. Self-paced lessons that save your progress. Quizes to test your learning. Earn a Certificate of Completion. Fun & unintimidating - Suitable for ages 15 to 100!";
const desc = `Getting Started with ASL\nA perfect introduction to ASL, gain basic conversation skills and a foundational understanding of ASL vocabulary and grammar. With practice and expert guidance.`;
const courseDetails = `
   Original Price: E£199.99
   Discounted Price: E£649.99 (69% off)
   2 hours left at this price!
   Add to cart
   Buy now
   30-Day Money-Back Guarantee.

   3.5 hours on-demand video
   1 article
   3 downloadable resources
   Access on mobile and TV
   Full lifetime access
   Certificate of completion`;
function Course() {
  return (
    <div className={styles.courses}>
      <CourseHeader
        courseTitle="Learn Figma - ASL Essential Training"
        courseImg="./ASL-1 1.png"
        courseAlt={courses.alt}
        courseBreif={courses.courseBreif}
      />
      <ParagraphToList
        paragraph={p}
        level="LVEL 1A"
        desc={desc}
        text={courseDetails}
      />
      <LessonsSlider title="Lessons" />
    </div>
  );
}

export default Course;
