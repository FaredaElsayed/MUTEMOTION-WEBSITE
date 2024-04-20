import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigateTo = useNavigate();
  const { signup, error, setError } = useAuth();
  const [password, setPass] = useState("");
  const [confPass, setconfPass] = useState("");
  const [email, setEmail] = useState("faredaelsayed@gmail.com");
  const [fullName, setfullName] = useState("fareda elsayed");
  const btnStyle = {
    fontWeight: "700",
    borderColor: "#442C8F",
    borderStyle: "solid",
    borderWidth: "2px",
    fontSize: "2.5rem",
    textTransform: "capitalize",
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confPass) {
      setError("Passwords do not match");
      return;
    }
    if (email && password && fullName) {
      await signup(email, fullName, password);
      // No need to check isAuthenticated here
      if (error === "") {
        // Redirect to confirm page after successful signup
        navigateTo("/confirm", { replace: true });
      }
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
