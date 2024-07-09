import styles from "./AboutUs.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../components/Logo";

export default function AboutUs() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className={styles.aboutus}>
        <div className="menuIcon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Logo /> {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
        <PageNav isMenuOpen={isMenuOpen} />

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
              Mute Motion is a smart taxi system for hearing-impaired drivers
              with innovative technology tailored to their needs. This
              groundbreaking project encompasses various facets to enhance
              accessibility, safety, and communication.
              <br />
              <br />
              At its core, Mute Motion integrates a smart steering wheel
              designed to aid hearing-impaired drivers, ensuring seamless
              control and navigation through intuitive interfaces and visual
              cues. Additionally, the system incorporates advanced siren
              detection and recognition capabilities, alerting drivers to
              emergency vehicles for safer driving.
              <br />
              <br />
              Communication is facilitated through real-time sign language
              translation, enabling effortless interaction between drivers and
              passengers. Utilizing cutting-edge software, the system accurately
              interprets gestures, bridging communication gaps effectively.
              <br />
              <br />
              Enhancing the safety of our drivers we also implemented ADAS
              features for the driver like Collision Warnings, Adaptive Cruise
              control, and Blind spot detection using Lidars
              <br />
              <br />
              Moreover, Mute Motion extends its impact beyond the vehicle with
              supplementary digital platforms. A comprehensive website offers
              resources for learning sign language, empowering users with
              valuable linguistic skills also it doubles as the interface for
              our project and how to download our mobile apps. Simultaneously, a
              user-friendly mobile application For passengers and drivers
              simplifies the booking process, providing convenience and
              accessibility for our features like sign language translation,
              Gesture detection, Real-time chatting, and Car Information.
              <br />
              <br />
              By amalgamating technology and empathy, Mutemotion sets a new
              standard in inclusive transportation solutions, fostering
              independence, safety, and communication for the hearing impaired.
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
                  <Link
                    to="https://sites.google.com/view/mutemotion"
                    target="blank"
                  >
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
        <section className={styles.image2}>
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
