import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../components/Button";
function ConfirmMail() {
  const {
    error,
    verifyCode,
    isAuthenticated,
    registeredEmail,
    setError,
    askForAnotherCode,
  } = useAuth();
  const [code, setCode] = useState("");
  const navigateTo = useNavigate();
  const [btnStyle, setBtnStyle] = useState({
    fontWeight: "700",
    borderColor: "#442C8F",
    borderStyle: "solid",
    borderWidth: "2px",
    fontSize: "2.5rem",
    textTransform: "capitalize",
  });

  useEffect(() => {
    function updateBtnStyle() {
      if (window.innerWidth >= 4000) {
        setBtnStyle((prevStyle) => ({
          ...prevStyle,
          fontSize: "5.8rem",
        }));
      } else {
        setBtnStyle((prevStyle) => ({
          ...prevStyle,
          fontSize: "2.5rem",
        }));
      }
    }

    updateBtnStyle(); // Initial call
    window.addEventListener("resize", updateBtnStyle);

    return () => {
      window.removeEventListener("resize", updateBtnStyle);
    };
  }, []);

  async function handleResendCode(e) {
    e.preventDefault();
    try {
      await askForAnotherCode(registeredEmail);
      setError("New verification code sent successfully"); // Clear any previous error
    } catch (error) {
      setError(error.message); // Set the error message if the request fails
    }
  }

  function handleVerification(e) {
    e.preventDefault();
    console.log(registeredEmail);
    if (code && registeredEmail) {
      setError(null);
      verifyCode(registeredEmail, code);
      
    }
  }

  useEffect(() => {
    if (isAuthenticated && registeredEmail !== null) {
      navigateTo("/homepage", { replace: true });
    }
  }, [isAuthenticated, registeredEmail, navigateTo]);

  return (
    <>
      <div className={styles.login}>
        <Link to="/">
          <img src="./logo.png" alt="MuteMotion Logo" className={styles.logo} />
        </Link>
        <main className={styles.mainContainer}>
          <div className={styles.imgCont}>
            <p style={{ left: "11%" }}>You almost there!</p>
            <div
              className={styles.img}
              style={{ backgroundImage: "url(./sign.png)" }}
            ></div>
          </div>
          <form onSubmit={handleVerification}>
            <div>
              <p>Email verification</p>
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
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.buttons}>
              <Link>
                <Button
                  type="continue"
                  btnStyle={btnStyle}
                  onClick={handleVerification}
                >
                  Confirm
                </Button>
              </Link>
            </div>
            <div className={styles.iconsCont}>
              <div className={styles.noAcc}>
                <span>
                  <Link to="#" onClick={handleResendCode}>
                    Resend Code?
                  </Link>
                  .
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
