import {Link} from "react-router-dom";
import styles from "./Logo.module.css";


function Logo({path}) {
  return <Link to={path} ><img src="/logo.png" alt="MuteMotion logo" className={styles.logo} /></Link>;
}

export default Logo;
