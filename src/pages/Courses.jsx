import styles from "./Courses.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import CustomSlider from "./CustomSlider";
import { useState } from "react";
import { useContext } from "react";
import { CourseContext } from "../contexts/CoursesApis";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Courses() {
  const [isPaying, setIsPaying] = useState(false);
  const { state } = useContext(CourseContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { aslAdults, forKids, loading, error } = state;
  return (
    <>
      <main className={styles.courses}>
        <div
          className={styles.menuIcon}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <PageNav isMenuOpen={isMenuOpen} />

        <header className={styles.coursesHeader}>
          <div className={styles.rect1}>
            <div className={styles.content}>
              <p>
                Learn
                <br />
                sign language
                <br />
                from home
                <br />
                with
                <br />
                mutemution!
              </p>
            </div>
          </div>
          <div className={styles.rect}>
            <img
              src="./asl-day 1.png"
              alt="asl-day 1"
              className={styles.img1}
            ></img>
          </div>
        </header>
        <CustomSlider title="For Age +15" courses={aslAdults} />
        <CustomSlider title="For Kids" courses={forKids} />
      </main>
      <Footer />
    </>
  );
}
