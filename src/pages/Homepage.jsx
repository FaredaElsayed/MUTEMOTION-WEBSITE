import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import  CustomSlider  from "./CustomSlider";

export const courses = [
  {
    id: 1,
    level: "ASL For Beginners",
    instructor: "Mairina Michel, Level1",
    imgSrc: "./img-4.png",
    alt: "Mairina Michel, Level1",
  },
  {
    id: 2,
    level: "ASL For Beginners",
    instructor: "Mairina Michel, Level1",
    imgSrc: "./img-3.png",
    alt: "Mairina Michel, Level1",
  },
  {
    id: 3,
    level: "ASL For Beginners",
    instructor: "Mairina Michel, Level1",
    imgSrc: "./img-9.png",
    alt: "Mairina Michel, Level1",
  },
  {
    id: 4,
    level: "ASL For Beginners",
    instructor: "Mairina Michel, Level1",
    imgSrc: "./img-1.png",
    alt: "Mairina Michel, Level1",
  },
  {
    id: 5,
    level: "ASL For Beginners",
    instructor: "Mairina Michel, Level1",
    imgSrc: "./img-5.png",
    alt: "Mairina Michel, Level1",
  },
  {
    id: 6,
    level: "ASL For Beginners",
    instructor: "Mairina Michel, Level1",
    imgSrc: "./img-4.png",
    alt: "Mairina Michel, Level1",
  },
];

export default function Homepage() {
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
            <Button type="learnmore">Learn More</Button>
          </div>
          <div className={styles.rect}>
            <div className={styles.imgVector}>
              <img src="./img-8.png" alt="img" className={styles.img1}></img>
              <img src="./img-3.png" alt="img" className={styles.img2}></img>
              <img src="./img-5.png" alt="img" className={styles.img3}></img>
            </div>
          </div>
        </section>
        <CustomSlider title="Recommended For You" />
        <CustomSlider title="ASL for begginers" />
        <CustomSlider title="Most Popular" />
      </main>
      <Footer />
    </>
  );
}
