import { useRef, useState } from "react";
import styles from "./CarSystem.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import AppNav from "../components/AppNav";
import { useAuth } from "../contexts/Auth";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../components/Logo";

export default function CarSystem() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const videoRef = useRef(null);
  const { isAuthenticated } = useAuth();

  const playVideo = () => {
    videoRef.current.play();
  };
  const restartVideo = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  const pauseVideo = () => {
    videoRef.current.pause();
  };

  const rewindVideo = () => {
    videoRef.current.currentTime -= 10;
  };

  const fastForwardVideo = () => {
    videoRef.current.currentTime += 10;
  };

  return (
    <>
      <div className={styles.carInfo}>
        <div className="menuIcon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {isAuthenticated ? <Logo path="/homepage" /> : ""}
          </div>
        </div>
        {isAuthenticated ? (
          <PageNav isMenuOpen={isMenuOpen} />
        ) : (
          <Logo
            path="/"
            style={{ position: "absolute", top: "2rem", left: "2rem" }}
          />
        )}
        <div className={styles.content}>
          <br />
          <br />
          <div className={styles.videoContainer}>
            <video ref={videoRef} className={styles.videoPlayer}>
              <source src="./Steering wheel demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={styles.controls}>
            <Button type="" onClick={playVideo}>
              Play
            </Button>
            <Button type="" onClick={restartVideo}>
              Restart
            </Button>
            <Button type="" onClick={pauseVideo}>
              Pause
            </Button>
            <Button type="" onClick={rewindVideo}>
              Rewind 10s
            </Button>
            <Button type="" onClick={fastForwardVideo}>
              Forward 10s
            </Button>
          </div>
          <br />
          <br />
          <div className={styles.description}>
            <hr style={{ color: "#442c8f" }} />
            <hr style={{ color: "#442c8f" }} />
            <br />
            <h2>About MuteMotion Car System</h2>
            <p>
              The MuteMotion Car System is an innovative approach to enhancing
              the driving experience for people with hearing impairments. Our
              system includes advanced features such as real-time sign language
              interpretation, voice-to-text functionality, and customized visual
              alerts.
            </p>
            <p>
              Watch the video to see how the MuteMotion Car System works and how
              it can make driving safer and more enjoyable.
            </p>
          </div>
        </div>
      </div>

      {isAuthenticated ? <Footer /> : ""}
    </>
  );
}
