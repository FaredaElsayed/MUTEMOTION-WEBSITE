import { useState } from "react";
import styles from "./Login.module.css";
import Button from "../components/Button";
import { Link } from "react-router-dom";
function ConfirmMail() {
  const [code, setCode] = useState("");

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
              <span>
                Enter the code sent to your email to access your account.
              </span>
            </div>
            <div>
              <label htmlFor="code">Code:</label>
              <input
                type="password"
                id="code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="****"
                minLength={8}
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                required
              />
            </div>

            <div className={styles.buttons}>
              <Link to="/homepage">
                <Button type="continue" btnStyle={btnStyle}>
                  Confirm
                </Button>
              </Link>
            </div>
            <div className={styles.iconsCont}>
              <div className={styles.noAcc}>
                <span>
                  <Link to="#">Resend Code?</Link>.
                </span>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default ConfirmMail;
