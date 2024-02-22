import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <ul className={styles.list}>
          <li>
            <Link to="cities">Blog</Link>
          </li>
          <li>
            <Link to="countries">Careers</Link>
          </li>
          <li>
            <Link to="countries">Help and support</Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <Link to="cities">TERMS</Link>
          </li>
          <li>
            <Link to="countries">HELP</Link>
          </li>
          <li>
            <Link to="countries">TERMS</Link>
          </li>
          <li>
            <Link to="countries">ASK NOW</Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <Link to="cities">PRIVECY</Link>
          </li>
          <li>
            <Link to="countries">POLICY</Link>
          </li>
          <li>
            <Link to="countries">TERMS</Link>
          </li>
          <li>
            <Link to="countries">ASK NOW</Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <button className={styles.contactUs}>Contact Us</button>
          </li>
          <li>
            <Link to="mailto:mutemotion2024@gmail.com">
              mutemotion2024@gmail.com
            </Link>
          </li>
        </ul>
      </div>
      <ul className={styles.developers}>
        <h4>&copy; Devolbed by:</h4>
        <li>
          <Link
            to="https://github.com/FaredaElsayed"
            target="_blank"
            rel="noopener noreferrer"
          >
            Farida Elsayed,
          </Link>
        </li>
        <li>
          <Link
            to="https://github.com/AhmedFawzy2001"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ahmed Fawzy.
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
