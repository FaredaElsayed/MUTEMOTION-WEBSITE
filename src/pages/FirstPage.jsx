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
            <h1>Welcome to MuteMotion</h1>
            <p>
              Discover the joy of sign language with our specialized courses,
              suitable for kids and individuals aged 15 and older. Dive into a
              world of communication and inclusivity with our engaging lessons.
            </p>
            <Link to="/login">
              <Button type="primary">Start Your Learning journey!</Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
