import {Link} from "react-router-dom";
import styles from "./Logo.module.css";


function Logo({path,style}) {
  return (
    <Link to={path}>
      <img
        src="/logo.png"
        alt="MuteMotion logo"
        className={styles.logo}
        style={style}
      />
    </Link>
  );
}

export default Logo;
