import styles from "./Firstpage.module.css";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import AppNav from "../components/AppNav";

export default function FirstPage() {
  return (
    <>
      <main className={styles.homepage}>
        <AppNav />
        <section>
          <div className={styles.content}>
            <h1>MuteMotion</h1>
            <p>
              MuteMotion is an innovative project that combines an Advanced
              Driver Assistance System (ADAS) with real-time sign language
              translation. It aims to empower the deaf and mute community,
              enhance road safety, and promote inclusivity.
            </p>
            <Link to="/login">
              <Button type="primary">Start Your Learning journey Now!</Button>
            </Link>
          </div>
          {/* <div className={styles.rect}>
            <div className={styles.imgVector}>
              <img src="./img-8.png" alt="img" className={styles.img1}></img>
              <img src="./img-3.png" alt="img" className={styles.img2}></img>
              <img src="./img-5.png" alt="img" className={styles.img3}></img>
            </div>
          </div> */}
        </section>
      </main>
    </>
  );
}
