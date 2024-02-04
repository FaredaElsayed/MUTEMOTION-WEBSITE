import styles from "./Courses.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import CustomSlider from "./CustomSlider";

export default function Courses() {
  return (
    <>
      <main className={styles.courses}>
        <PageNav />
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
            <img src="./asl-day 1.png" alt="asl-day" className={styles.img1}></img>
          </div>
        </header>
        <CustomSlider title="For Age +15" />
        <CustomSlider title="For Kids" />
      </main>
      <Footer />
    </>
  );
}
