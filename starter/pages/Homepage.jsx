import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <header className={styles.homepage}>
      <section>
        <h1>MuteMotion</h1>
        <p>
          MuteMotion is an innovative project that combines an Advanced Driver
          Assistance System (ADAS) with real-time sign language translation. It
          aims to empower the deaf and mute community, enhance road safety, and
          promote inclusivity.
        </p>
      </section>
    </header>
  );
}
