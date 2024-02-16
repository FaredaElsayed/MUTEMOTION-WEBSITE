import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { NavLink } from "react-router-dom";
function AppNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <ul>
        <li className={styles.navItem}>
          <NavLink to="/homepage" style={{ color: "#ffff" }}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="aboutus" style={{ color: "#ffff" }}>
            About us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
