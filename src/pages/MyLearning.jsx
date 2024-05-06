import { NavLink } from "react-router-dom";
import styles from "./MyLearning.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import CardInProgress from "../components/CardInProgress";
const courses = [
  {
    id: 1,
    level: 1,
    category: "ASL For Beginners",
    instructor: "Mairina Michel",
    imgSrc: "./img-5.png",
    alt: "Mairina Michel",
    interval: 46,
  },
  {
    id: 2,
    level: 2,
    category: "ASL For Beginners",
    instructor: "Mairina Michel",
    imgSrc: "./img-3.png",
    alt: "Mairina Michel",
    interval: 180,
  },
  {
    id: 3,
    level: 3,
    category: "ASL For Beginners",
    instructor: "Mairina Michel",
    imgSrc: "./img-6.png",
    alt: "Mairina Michel",
    interval: 96,
  },
  {
    id: 4,
    level: 3,
    category: "ASL For Beginners",
    instructor: "Mairina Michel",
    imgSrc: "./img-7.png",
    alt: "Mairina Michel",
    interval: 96,
  },
];


export default function MyLearning() {
  return (
    <>
      <div className={styles.mylearning}>
        <PageNav />
        <div className={styles.container}>
          <h1>My Programs</h1>
          <ul className={styles.progress}>
            <li className={`${styles.navItem} ${styles.active}`}>
              <NavLink to="/inprogress">In progress</NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/">Completed</NavLink>
            </li>
          </ul>
          <div className={styles.courses}>
            {courses.map((course, index) => (
              <div key={index} className={styles.progressCont}>
                <CardInProgress {...course} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
