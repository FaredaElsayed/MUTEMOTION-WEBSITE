import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import styles from "./Login.module.css";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import React from  "react";

// Component for user sign-up
function SignUp() {
  const navigateTo = useNavigate();
  const { signup, error, setError } = useAuth();
  const [password, setPass] = useState("");
  const [confPass, setconfPass] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setfullName] = useState("");
  const [loading, setLoading] = useState(false);
  // Initialize state for button style
  const [btnStyle, setBtnStyle] = useState({
    fontWeight: "700",
    borderColor: "#442C8F",
    borderStyle: "solid",
    borderWidth: "2px",
    fontSize: "2.5rem",
    textTransform: "capitalize",
  });
  // Effect to update button style based on window width
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
      navigateTo("/confirm", { replace: false });
    }
  }, [error, navigateTo]);
  // Function to handle sign-up form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (!email || !password || !confPass) {
      toast.error("Please enter all required fields");
      return;
    }
    // Check for whitespace-only strings
    if (
      email.trim() === "" ||
      fullName.trim() === "" ||
      password.trim() === ""
    ) {
      toast.error("Please enter a valid email address, full name, and password");
      return;
    }
    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      toast.error("Please enter a valid full name");
      return;
    }
    // Validate password length
    if (password.trim().length < 8 || confPass.trim().length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    // Validate password match
    if (password !== confPass) {
      toast.error("Passwords do not match");
      return;
    }
    // Call the 'signup' function with email, full name, and password
    if (email && password && fullName) {
      setLoading(true);
      await signup(email, fullName, password).finally(() => setLoading(false));
    }
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
                placeholder="username"
                autoFocus
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
                placeholder="example@gmail.com"
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
                minLength={8}
                required
              />
            </div>
            <div className={styles.buttons}>
              <Button type="submit" btnStyle={btnStyle}>
                {loading ? "Loading..." : "Register"}
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
