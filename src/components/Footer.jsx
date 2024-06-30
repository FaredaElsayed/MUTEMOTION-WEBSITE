import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <ul className={styles.list}>
          <li>
            <Link to="/aboutus">Blog</Link>
          </li>
          <li>
            <Link to="/aboutus">Careers</Link>
          </li>
          <li>
            <Link to="/aboutus">Help and support</Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <Link to="/aboutus">TERMS</Link>
          </li>
          <li>
            <Link to="/aboutus">HELP</Link>
          </li>
        
          <li>
            <Link to="/aboutus">ASK NOW</Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <Link to="/aboutus">Privacy</Link>
          </li>
          <li>
            <Link to="/aboutus">POLICY</Link>
          </li>
  
        </ul>
        <ul className={styles.list}>
          
            <button className={styles.contactUs}>Contact Us</button>
          
          <li>
            <Link to="mailto:mutemotion2024@gmail.com">
              mutemotion2024@gmail.com
            </Link>
          </li>
        </ul>
      </div>
      <ul className={styles.developers}>
        <h4>&copy; Developed by:</h4>
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
