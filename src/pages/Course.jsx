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
// const p =
//   " Over 500 vocabulary words you'll start using right away. Nearly 3 hours of on-demand video instruction. More than 50 activities to help extend your learning. 40 practice interactions that let you follow Dr Byron one sentence at a time. Self-paced lessons that save your progress. Quizes to test your learning. Earn a Certificate of Completion. Fun & unintimidating - Suitable for ages 15 to 100!";
// const desc = `Getting Started with ASL\nA perfect introduction to ASL, gain basic conversation skills and a foundational understanding of ASL vocabulary and grammar. With practice and expert guidance.`;
// const courseDetails = `
//    Original Price: E£199.99
//    Discounted Price: E£649.99 (69% off)
//    2 hours left at this price!
//    Add to cart
//    Buy now
//    30-Day Money-Back Guarantee.

//    3.5 hours on-demand video
//    1 article
//    3 downloadable resources
//    Access on mobile and TV
//    Full lifetime access
//    Certificate of completion`;
// const info = `4,5 Instructor Rating 18.482 Reviews 76.649 Students.4 Courses`;
// const instInfo = `Co-authored the book, Deaf Tend Yours.she has written video scripts and produced numerous sign language related videotapes/DVDs.she is a nationally-known teacher and lecturer in ASL and sign language interpretation.has been in the field of ASL linguistics, interpreting and post secondary teaching of ASL as a second language for over 30 years. she is a certified Deaf interpreter (CDI), earning the certification through the Registry of Interpreters for the Deaf.`;
// const reviews = [
//   {
//     id: 1,
//     imgSrc: "./rev2.png",
//     name: "Maurice Cain",
//     isStudet: "Student",
//     opinion:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45",
//     opinionHeadline: "Best learning platform",
//     myRating: 4.5,
//   },
//   {
//     id: 2,
//     imgSrc: "./rev1.png",
//     name: "Maurice Henderson",
//     isStudet: "Student",
//     opinion:
//       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45",
//     opinionHeadline: "Amazing Course",
//     myRating: 5,
//   },
// ];
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
