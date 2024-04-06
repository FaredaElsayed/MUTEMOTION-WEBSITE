import { useState } from "react";
import styles from "./Login.module.css";
import Button from "../components/Button";
import { Link } from "react-router-dom";
function SignUp() {
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [fName, setFName] = useState("");
  const [confPass, setconfPass] = useState("");
  const btnStyle = {
    fontWeight: "700",
    borderColor: "#442C8F",
    borderStyle: "solid",
    borderWidth: "2px",
    fontSize: "2.5rem",
    textTransform: "capitalize",
  };
  return (
    <>
      <div className={styles.login}>
        <Link to="/">
          <img src="./logo.png" alt="MuteMotion Logo" className={styles.logo} />
        </Link>
        <main className={styles.mainContainer}>
          <div className={styles.imgCont}>
            <p style={{ left: "15%" }}>Get started now!</p>
            <div
              className={styles.img}
              style={{ backgroundImage: "url(./sign.png)" }}
            ></div>
          </div>
          <form>
            <div>
              <p>Create account</p>
              <span>Enter your credentials to access your account</span>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                placeholder="Farida Elsayed"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="faredaelsayed0@gmail.com"
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                required
              />
            </div>
            <div>
              <label htmlFor="pass">Password:</label>
              <input
                type="password"
                id="pass"
                name="pass"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                placeholder="*******"
                minLength={8}
                required
              />
            </div>
            <div>
              <label htmlFor="confPass">Confirm Password:</label>
              <input
                type="password"
                id="confPass"
                name="confPass"
                value={confPass}
                onChange={(e) => setconfPass(e.target.value)}
                placeholder="*******"
                minLength={8}
                required
              />
            </div>
            <div className={styles.buttons}>
              <Link to="/confirm">
                <Button type="continue" btnStyle={btnStyle}>
                  Register
                </Button>
              </Link>
            </div>
            <div className={styles.iconsCont}>
              <div className={styles.noAcc}>
                <p>have an account?</p>
                <span>
                  <Link to="/login">Login</Link>.
                </span>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default SignUp;
