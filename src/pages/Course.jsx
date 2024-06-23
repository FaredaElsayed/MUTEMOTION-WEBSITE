import { useLocation } from "react-router-dom";
import CourseHeader from "../components/CourseHeader";
import styles from "../components/CourseHeader.module.css";
import ParagraphToList from "../components/ParagraphToList";
import LessonsSlider from "./LessonsSlider";
// import { courses } from "./Homepage";
import Instructor from "../components/Instructor";
import Review from "../components/Review";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

function Course({ setIsPaying, isPaying }) {
  const location = useLocation();
  const { course } = location.state || {};
  const { reviews } = course;

  if (!course) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className={styles.courses}>
        <PageNav />
        <CourseHeader
          courseTitle={course.title}
          boughtFlag={course.boughtFlag}
          courseId={course._id}
          courseImg={course.poster}
          courseAlt={course.title}
          courseBreif={course.brief}
          setIsPaying={setIsPaying}
          isPaying={isPaying}
        />
        <ParagraphToList
          desc={course.brief}
          level={course.level}
          hours={course.hours}
          lessonsnum={course.numLessons}
          studentsBought={course.studentsBought}
          category={course.category}
          price={course.price}
          instructor={course.instructorDetails.name}
          text={`Instructor: ${course.instructor.name}\nEducation: ${course.instructor.education}\nCertificate: ${course.instructor.certificate}`}
        />
        <LessonsSlider title="Lessons" lessons={course.lessons} />
        <Instructor
          imgSrc={course.instructorDetails.img}
          name={course.instructorDetails.name}
          // info={course.instructorDetails.info}
          instInfo={course.instructorDetails.info}
          coursesGiven={course.instructorDetails.coursesGiven}
          certificate={course.instructorDetails.certificate}
          education={course.instructorDetails.education}
        />
        <div className={styles.h2}>
          <span>Reviews</span>
        </div>

        {reviews.map((review, index) => (
          <Review
            key={index}
            imgSrc={review.personImg}
            opinionHeadline={review.heading}
            opinion={review.reviewDescription}
            myRating={Number(review.rate)}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Course;
