import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import styles from "./Login.module.css";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import React from  "react";

function Login() {
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, error, setError } = useAuth();
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

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter all required fields");
      return;
    }
    if (email && password) {
      setLoading(true); // Set loading to true when login starts
      login(email, password).finally(() => setLoading(false)); // Set loading to false when login ends
    }
  }

  useEffect(
    function () {
      if (isAuthenticated) navigateTo("/homepage", { replace: true });
    },
    [isAuthenticated, navigateTo]
  );

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
            <p>
              Welcome
              <br />
              Back!
            </p>
            <div
              className={styles.img}
              style={{ backgroundImage: "url(./login.png)" }}
            ></div>
          </div>
          <form>
            <div>
              <p>Login Now</p>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                autoFocus
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
                minLength={8}
                required
              />
            </div>
            {/* {error && <div className={styles.error}>{error}</div>} */}
            <div className={styles.buttons}>
              <Button type="continue" btnStyle={btnStyle} onClick={handleLogin}>
                {loading ? "Loading..." : "Login"}
              </Button>
            </div>
            <div className={styles.iconsCont}>
              <hr />

              <div className={styles.noAcc}>
                <p>don’t have an account?</p>
                <span>
                  <Link to="/signup">register</Link>.
                </span>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default Login;
