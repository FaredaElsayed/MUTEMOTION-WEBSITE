import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../components/Button";

function Login() {
  const [password, setPass] = useState("12345");
  const [email, setEmail] = useState("faredaelsayed@gmail.com");
  const navigateTo = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const btnStyle = {
    fontWeight: "700",
    borderColor: "#442C8F",
    borderStyle: "solid",
    borderWidth: "2px",
    fontSize: "2.5rem",
    textTransform: "capitalize",
  };
  function handleLogin(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigateTo("/homepage", { replace: true });
    },
    [isAuthenticated, navigateTo]
  );
  // function handleLogin(e) {
  //   e.preventDefault();
  //   navigateTo("/homepage");
  // }
  return (
    <>
      <div className={styles.login}>
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
            <div className={styles.img}></div>
          </div>
          <form>
            <div>
              <p>Login Now</p>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ali20@gmail.com"
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
            <div className={styles.buttons}>
              <p>forget passward ?</p>
              {/* <Link to="/homepage"> */}
              <Button type="continue" btnStyle={btnStyle} onClick={handleLogin}>
                Login
              </Button>
              {/* </Link> */}
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
