import styles from "./AboutUs.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <div className={styles.aboutus}>
        <PageNav />
        <section className={styles.image}>
          <span>
            We are here to make sign
            <br />
            language learning more easy!
          </span>
          <img src="./Group 50.png" alt="sign language is easy!"></img>
        </section>
        <main>
          <section className={styles.rectangle}>
            <div className={styles.rectContainer1}>
              <div className={styles.rectContainer2}>
                <div className={styles.content}>
                  <span>MuteMotion</span>
                  <p>
                    MuteMotion is designed to address two significant
                    challenges: improving the safety and convenience of drivers
                    and passengers and bridging the communication gap for the
                    deaf and mute community. This project combines
                    state-of-the-art technology to create a smart taxi service
                    and a sign language translation system.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.keyFeatures}>
            <div className={styles.rectContainer1}>
              <div className={styles.rectContainer2}>
                <div className={styles.content}>
                  <img
                    src="./hands.png"
                    alt="Sign Language examples"
                    className={styles.hands}
                  ></img>
                  <p>
                    ■ Advanced Driver Assistance System (ADAS): Enhance road
                    safety with features like emergency braking, rear collision
                    warning, blind spot detection, and cruise control.
                  </p>
                  <p>
                    ■ Real-time Sign Language Translation: Translate sign
                    language gestures into text, promoting communication between
                    the deaf and hearing communities.
                  </p>
                  <p>
                    ■ AI-Powered Features: License plate recognition, siren
                    recognition, traffic sign recognition, and gesture detection
                    to improve overall safety.
                  </p>
                  <span>KEY FEATURES</span>
                  <p className={styles.dotsContainer}>
                    <span className={styles.dots}></span>
                    <span className={styles.dots}></span>
                    <span className={styles.dots}></span>
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.description}>
            <span>MuteMotion!</span>
            <p>
              MuteMotion envisions a world where transportation is truly
              inclusive, empowering every individual to navigate the roads
              safely and seamlessly
              <br />
              <br />
              At MuteMotion, we are committed to developing innovative solutions
              that not only enhance road safety but also promote awareness of
              sign language and deaf culture.
              <br />
              <br />
              Join us as we embark on this transformative journey to create a
              more inclusive and accessible transportation ecosystem for all.
              Together, we can drive change and make a lasting
              impact on society.
            </p>
          </section>
        </main>
        <section className={styles.photos}>
          <div className={styles.rectPhoto}>
            <div className={styles.rectPhoto2}>
              <img
                src="./sign.png"
                alt="sign lang"
                className={styles.sign}
              ></img>
            </div>
          </div>
          <div className={styles.rectKid}>
            <img
              src="./kid.png"
              alt="sign lang for kids"
              className={styles.kid}
            ></img>
          </div>
          <div className={styles.rectPhotoAdult}>
            <div className={styles.rectPhotoAdult2}>
              <img
                src="./adults.png"
                alt="sign lang for adults"
                className={styles.adult}
              ></img>
            </div>
          </div>
        </section>
        <section className={`${styles.gettingStarted}`}>
          <div className={styles.rectContainer1}>
            <div className={styles.rectContainer2}>
              <div className={styles.content}>
                <span>Getting Started</span>
                <p>
                  To get started with MuteMotion, follow these steps:
                  <br />
                  <br />
                  1_visit our website{" "}
                  <Link to="https://mutemotion.com" target="blank">
                    MuteMotion
                  </Link>
                  .
                  <br />
                  2_make a new account or login if you already have an account .
                  <br />
                  3_ join our sign language courses.
                  <br />
                  4_visit about us page to learn more about our vision and our
                  services.
                  <br />
                  5_download now our taxi application from playstore{" "}
                  <Link to="https://mutemotion.com" target="blank">
                    MuteMotion
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.image}>
          <img src="./pana.png" alt="sign language is easy!"></img>
          <span>LICENSE</span>
          <p>
            This project is licensed by
            <Link to="https://www.zu.edu.eg/" target="_blank">
              {" "}
              Zagazig university
            </Link>
            .
            <br />
            sponsored by
            <Link to="https://www.valeo.com/" target="_blank">
              {" "}
              Valeo
            </Link>
            .
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
