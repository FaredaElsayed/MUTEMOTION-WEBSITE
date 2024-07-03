import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import ButtonBack from "../components/ButtonBack";

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
  const [loading, setLoading] = useState(false);
  const [btnStyle, setBtnStyle] = useState({
    fontWeight: "700",
    borderColor: "#442C8F",
    borderStyle: "solid",
    borderWidth: "2px",
    fontSize: "2.5rem",
    textTransform: "capitalize",
  });

  // State for the timer
  const [timer, setTimer] = useState(10); // 180 seconds = 3 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(true);

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

  // Timer effect to start the countdown
  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [isTimerRunning, timer]);

  async function handleResendCode(e) {
    e.preventDefault();
    try {
      await askForAnotherCode(registeredEmail);
      toast.success("New verification code sent successfully"); // Clear any previous error
      setIsTimerRunning(true); // Start the timer
      setTimer(180); // Reset timer to 180 seconds (3 minutes)
    } catch (error) {
      setError(error.message); // Set the error message if the request fails
    }
  }

  function handleVerification(e) {
    e.preventDefault();
    if (code && registeredEmail) {
      setError(null);
      setLoading(true);
      verifyCode(registeredEmail, code).finally(() => setLoading(false));
    } else if (!code) {
      toast.error("please enter the code!");
    }
  }

  useEffect(() => {
    if (isAuthenticated && registeredEmail !== null) {
      navigateTo("/homepage", { replace: true });
    }
  }, [isAuthenticated, registeredEmail, navigateTo]);

  // Format the timer display
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <>
      <div className={styles.login}>
        <div>
          <Toaster
            toastOptions={{
              className: "toast",
              success: {
                iconTheme: {
                  primary: "#442c8f",
                  secondary: "white",
                },
              },
            }}
          />
        </div>
        <Link to="/">
          <img src="./logo.png" alt="MuteMotion Logo" className={styles.logo} />
        </Link>
        <main className={styles.mainContainer}>
          <div className={styles.imgCont}>
            <p style={{ left: "11%" }}>You're almost there!</p>
            <div
              className={styles.img}
              style={{ backgroundImage: "url(./sign.png)" }}
            ></div>
          </div>
          <form onSubmit={handleVerification}>
            <div>
              <p>Email Verification</p>
              <span>
                Enter the code sent to your email to access your account.
              </span>
            </div>
            <div>
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="****"
                minLength={8}
                autoFocus
                required
              />
            </div>
            <div className={styles.buttons}>
              <Button
                type="continue"
                btnStyle={btnStyle}
                onClick={handleVerification}
              >
                {loading ? "Loading..." : "Confirm"}
              </Button>
              {/* <ButtonBack dest="/signup" /> */}
            </div>
            <div className={styles.iconsCont}>
              <div className={styles.noAcc}>
                <span>
                  {isTimerRunning ? (
                    <span style={{ cursor: "not-allowed", color: "#999" }}>
                      Resend Code? (Next code in {formatTime(timer)})
                    </span>
                  ) : (
                    <Link to="#" onClick={handleResendCode}>
                      Resend Code?
                    </Link>
                  )}
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
