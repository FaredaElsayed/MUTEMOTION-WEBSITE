import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import CustomSlider from "./CustomSlider";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CourseContext } from "../contexts/CoursesApis";
import Spinner from "../components/Spinner";
import { useAuth } from "../contexts/Auth";
import { useCart } from "../contexts/CartContext";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Homepage() {
  const { state } = useContext(CourseContext);
  const { token } = useAuth();
  const { fetchCartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    recommendedCourses,
    beginnerCourses,
    popularCourses,
    loading,
    error,
  } = state;

  useEffect(() => {
    fetchCartItems();
  }, []);

  const navigateTo = useNavigate();
  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <main className={styles.homepage}>
        <div
          className={styles.menuIcon}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <PageNav isMenuOpen={isMenuOpen} />
        <section>
          <div className={styles.content}>
            <h1>MuteMotion</h1>
            <p>
              MuteMotion is an innovative project that combines an Advanced
              Driver Assistance System (ADAS) with real-time sign language
              translation. It aims to empower the deaf and mute community,
              enhance road safety, and promote inclusivity.
            </p>

            <Button type="learnmore" onClick={() => navigateTo("/aboutus")}>
              Learn More
            </Button>
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
