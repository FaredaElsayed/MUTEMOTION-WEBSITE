import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <ul className={styles.list}>
          <li>
            <NavLink to="cities">Blog</NavLink>
          </li>
          <li>
            <NavLink to="countries">Careers</NavLink>
          </li>
          <li>
            <NavLink to="countries">Help and support</NavLink>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <NavLink to="cities">TERMS</NavLink>
          </li>
          <li>
            <NavLink to="countries">HELP</NavLink>
          </li>
          <li>
            <NavLink to="countries">TERMS</NavLink>
          </li>
          <li>
            <NavLink to="countries">ASK NOW</NavLink>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <NavLink to="cities">PRIVECY</NavLink>
          </li>
          <li>
            <NavLink to="countries">POLICY</NavLink>
          </li>
          <li>
            <NavLink to="countries">TERMS</NavLink>
          </li>
          <li>
            <NavLink to="countries">ASK NOW</NavLink>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <button className={styles.contactUs}>Contact Us</button>
          </li>
          <li>
            <NavLink to="mailto:mutemotion2024@gmail.com">
              mutemotion2024@gmail.com
            </NavLink>
          </li>
        </ul>{" "}
      </div>
      <ul className={styles.developers}>
        <h4>&copy; Devolbed by:</h4>
        <li>
          <NavLink
            to="https://github.com/FaredaElsayed"
            target="_blank"
            rel="noopener noreferrer"
          >
            Farida Elsayed,
          </NavLink>
        </li>
        <li>
          <NavLink
            to="https://github.com/AhmedFawzy2001"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ahmed Fawzy.
          </NavLink>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
