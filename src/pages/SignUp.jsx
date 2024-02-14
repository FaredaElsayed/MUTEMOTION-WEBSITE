import { useState } from "react";
import styles from "./Login.module.css";
import Button from "../components/Button";
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
        <img src="./logo.png" alt="MuteMotion Logo" className={styles.logo} />
        <main className={styles.mainContainer}>
          <div className={styles.imgCont}>
            <p style={{ left: "14%" }}>Get started now!</p>
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
              <Button type="continue" btnStyle={btnStyle}>
                Register
              </Button>
            </div>
            <div className={styles.iconsCont}>
              <hr />
              <p>OR</p>
              <hr />
              <div className={styles.content}>
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1601_210)">
                    <path
                      d="M30.4857 15.7873C30.4857 14.5294 30.3836 13.6114 30.1627 12.6595H15.7988V18.337H24.2301C24.0602 19.748 23.1423 21.8728 21.1024 23.3006L21.0738 23.4907L25.6154 27.009L25.93 27.0404C28.8198 24.3716 30.4857 20.4449 30.4857 15.7873Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M15.7988 30.7461C19.9295 30.7461 23.3971 29.3861 25.93 27.0404L21.1024 23.3006C19.8105 24.2015 18.0766 24.8304 15.7988 24.8304C11.7532 24.8304 8.31945 22.1617 7.09543 18.473L6.91602 18.4883L2.19359 22.143L2.13184 22.3147C4.64762 27.3122 9.81523 30.7461 15.7988 30.7461Z"
                      fill="#34A853"
                    />
                    <path
                      d="M7.09543 18.473C6.77246 17.5211 6.58555 16.5011 6.58555 15.4473C6.58555 14.3933 6.77246 13.3734 7.07844 12.4215L7.06988 12.2187L2.28828 8.50531L2.13184 8.57972C1.09496 10.6536 0.5 12.9825 0.5 15.4473C0.5 17.9121 1.09496 20.2408 2.13184 22.3147L7.09543 18.473Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M15.7988 6.06395C18.6716 6.06395 20.6094 7.30484 21.7143 8.34184L26.032 4.12613C23.3803 1.66133 19.9295 0.148438 15.7988 0.148438C9.81523 0.148438 4.64762 3.58215 2.13184 8.57973L7.07844 12.4215C8.31945 8.73277 11.7532 6.06395 15.7988 6.06395Z"
                      fill="#EB4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1601_210">
                      <rect
                        width="30"
                        height="30.7031"
                        fill="white"
                        transform="translate(0.5 0.148438)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <p>Sign Up with Google</p>
              </div>
              <div className={styles.content}>
                <svg
                  width="34"
                  height="33"
                  viewBox="0 0 34 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="17" cy="16.5" r="16.5" fill="#395185" />
                  <path
                    d="M18.9656 28.6875V17.6544H22.669L23.2234 13.3547H18.9656V10.6094C18.9656 9.36448 19.3113 8.51611 21.0966 8.51611L23.3734 8.5151V4.66945C22.9795 4.61703 21.628 4.49995 20.0556 4.49995C16.7728 4.49995 14.5254 6.50375 14.5254 10.1837V13.3547H10.8125V17.6544H14.5254V28.6875H18.9656Z"
                    fill="white"
                  />
                </svg>
                <p>Sign Up with Facebook</p>
              </div>
              <div className={styles.noAcc}>
                <p>have an account?</p> <span>LOGIN.</span>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default SignUp;
