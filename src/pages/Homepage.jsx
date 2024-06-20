import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import CustomSlider from "./CustomSlider";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CourseContext } from "../contexts/CoursesApis";

// export const courses = [
//   {
//     id: 1,
//     level: "ASL For Beginners",
//     courseTitle: "Learn Figma - ASL Essential Training",
//     instructor: "Mairina Michel, Level1",
//     imgSrc: "./img-4.png",
//     alt: "Mairina Michel, Level1",
//     myRating: 5,
//   },
//   {
//     id: 2,
//     level: "ASL For Beginners",
//     courseTitle: "Learn Figma - ASL Essential Training",

//     instructor: "Mairina Michel, Level1",
//     imgSrc: "./img-3.png",
//     alt: "Mairina Michel, Level1",
//     myRating: 5,
//   },
//   {
//     id: 3,
//     level: "ASL For Beginners",
//     courseTitle: "Learn Figma - ASL Essential Training",

//     instructor: "Mairina Michel, Level1",
//     imgSrc: "./img-9.png",
//     alt: "Mairina Michel, Level1",
//     courseBreif:
//       "Sign Language 101 is accredited by the International Accreditors for Continuing Education and Training",

//     myRating: 5,
//   },
//   {
//     id: 4,
//     level: "ASL For Beginners",
//     courseTitle: "Learn Figma - ASL Essential Training",

//     instructor: "Mairina Michel, Level1",
//     imgSrc: "./img-1.png",
//     alt: "Mairina Michel, Level1",
//     courseBreif:
//       "Sign Language 101 is accredited by the International Accreditors for Continuing Education and Training",
//     myRating: 5,
//   },
//   {
//     id: 5,
//     level: "ASL For Beginners",
//     courseTitle: "Learn Figma - ASL Essential Training",
//     instructor: "Mairina Michel, Level1",
//     imgSrc: "./img-5.png",
//     alt: "Mairina Michel, Level1",
//     courseBreif:
//       "Sign Language 101 is accredited by the International Accreditors for Continuing Education and Training",
//     myRating: 4,
//   },
//   {
//     id: 6,
//     level: "ASL For Beginners",
//     courseTitle: "Learn Figma - ASL Essential Training",
//     instructor: "Mairina Michel, Level1",
//     imgSrc: "./img-4.png",
//     alt: "Mairina Michel, Level1",
//     courseBreif:
//       "Sign Language 101 is accredited by the International Accreditors for Continuing Education and Training",
//     myRating: 5,
//   },
// ];

export default function Homepage() {
  const { state } = useContext(CourseContext);
  const {
    recommendedCourses,
    beginnerCourses,
    popularCourses,
    forKids,
    loading,
    error,
  } = state;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <main className={styles.homepage}>
        <PageNav />
        <section>
          <div className={styles.content}>
            <h1>MuteMotion</h1>
            <p>
              MuteMotion is an innovative project that combines an Advanced
              Driver Assistance System (ADAS) with real-time sign language
              translation. It aims to empower the deaf and mute community,
              enhance road safety, and promote inclusivity.
            </p>

            <Link to="/aboutus">
              <Button type="learnmore">Learn More</Button>
            </Link>
          </div>
          <div className={styles.rect}>
            <div className={styles.imgVector}>
              <img src="./img-8.png" alt="img" className={styles.img1}></img>
              <img src="./img-3.png" alt="img" className={styles.img2}></img>
              <img src="./img-5.png" alt="img" className={styles.img3}></img>
            </div>
          </div>
        </section>
        <CustomSlider
          title="Recommended For You"
          courses={recommendedCourses}
        />
        <CustomSlider title="ASL for Beginners" courses={beginnerCourses} />
        <CustomSlider title="Most Popular" courses={popularCourses} />
      </main>
      <Footer />
    </>
  );
}
