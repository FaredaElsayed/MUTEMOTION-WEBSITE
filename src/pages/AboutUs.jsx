import styles from "./AboutUs.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

export default function Homepage() {
  return (
    <>
      <div className={styles.aboutus}>
        <PageNav />
        <section className={styles.image}>
          <h1>
            We are here to make sign
            <br />
            language learning more easy!
          </h1>
          <img src="./Group 50.png" alt="sign language is easy!"></img>
        </section>
        <main>
          <section className={styles.rectangle}>
            <div className={styles.rectContainer1}>
              <div className={styles.rectContainer2}>
                <div className={styles.content}>
                  <h1>MuteMotion</h1>
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
                  <h1>KEY FEATURES</h1>
                  <p className={styles.dotsContainer}>
                    <span className={styles.dots}></span>
                    <span className={styles.dots}></span>
                    <span className={styles.dots}></span>
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className={`${styles.description}`}>
            <h1>ASL for adults and for +15</h1>
            <p>
              MuteMotion is an innovative project that combines an Advanced
              Driver Assistance System (ADAS) with real-time sign language
              translation. It aims to empower the deaf and mute community,
              enhance road safety, and promote inclusivity.
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
                <h1>Getting Started</h1>
                <p>
                  To get started with MuteMotion, follow these steps:
                  <br />
                  <br />
                  1_Clone the repository.
                  <br />
                  2_Review the documentation in the respective directories
                  (smart taxi service, mobile app, web platform).
                  <br />
                  3_Install the necessary dependencies.
                  <br />
                  4_Run the project locally for testing and development.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.image}>
          <img src="./pana.png" alt="sign language is easy!"></img>
          <h1>LICENSE</h1>
          <p>
            This project is licensed under the MIT License.
            <br />
            Feel free to use, modify, and distribute it in your projects.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
