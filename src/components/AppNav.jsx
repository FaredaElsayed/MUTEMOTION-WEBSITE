import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";
function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Home</NavLink>
        </li>
        <li>
          <NavLink to="countries">Courses</NavLink>
        </li>
        <li>
          <NavLink to="countries">My learning</NavLink>
        </li>
        <li>
          <NavLink to="countries">About us</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
