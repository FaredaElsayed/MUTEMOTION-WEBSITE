import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import styles from "./Login.module.css";
import Button from "../components/Button";

function SignUp() {
  const navigateTo = useNavigate();
  const { signup, error, setError } = useAuth();
  const [password, setPass] = useState("");
  const [confPass, setconfPass] = useState("");
  const [email, setEmail] = useState("faredaelsayed@gmail.com");
  const [fullName, setfullName] = useState("fareda elsayed");
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
  useEffect(() => {
    if (error === "") {
      navigateTo("/confirm", { replace: true });
    }
  }, [error, navigateTo]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !confPass) {
      setError("Please enter all required fields");
      return;
    }

    if (password.length < 8 || confPass.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (password !== confPass) {
      setError("Passwords do not match");
      return;
    }
    if (email && password && fullName) {
      await signup(email, fullName, password);
    }
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
          <form onSubmit={handleSignup}>
            <div>
              <p>Create account</p>
              <span>Enter your credentials to access your account</span>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
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
                autoComplete="email"
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
              <Button type="submit" btnStyle={btnStyle}>
                Register
              </Button>
            </div>
            {error && <div className={styles.error}>{error}</div>}
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
