import Button from "./Button";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { NavLink } from "react-router-dom";
function AppNav() {
  const btnStyle = {
    width: "fit-content",
    padding: "0.5rem 1.7rem",
    textAlign: "center",
    textTransform: "capitalize",
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <Logo path="/" />
      </div>
      <ul>
        <li>
          <NavLink to="login" style={{ color: "#ffff" }}>
            <Button type="learnmore" btnStyle={btnStyle}>
              Login
            </Button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
