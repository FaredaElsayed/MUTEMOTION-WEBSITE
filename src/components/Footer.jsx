import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
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
          <NavLink to="countries">mutemotion2024@gmail.com</NavLink>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
