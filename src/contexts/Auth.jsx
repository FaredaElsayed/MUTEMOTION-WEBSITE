import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import React from  "react";


// Initial state of the authentication context
const initialState = {
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
};
// const initialState = {
//   user: null,
//   isAuthenticated: !!sessionStorage.getItem("token"),
//   token: sessionStorage.getItem("token") || null,
// };

const RealAuthContext = createContext();

// Reducer function to handle state changes based on actions
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case "verify_code":
      return { ...state, isAuthenticated: true, token: action.payload.token };
    case "logout":
      return { ...initialState, token: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

// AuthProvider component
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated, token } = state;
  const [registeredEmail, setRegisteredEmail] = useState(
    localStorage.getItem("registeredEmail") || null
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token && isAuthenticated) {
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", true);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      dispatch({ type: "logout" });
    }
  }, [token, isAuthenticated]);

  // Use the useEffect hook to check if the user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn && isAuthenticated) {
      dispatch({ type: "logout" });
    }
  }, [isAuthenticated]);
  
  // Define the signup function
  async function signup(email, fullname, password) {
    try {
      const response = await fetch(
        "https://mutemotion.onrender.com/api/v1/learner/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, fullname, password }),
        }
      );
      const data = await response.json();
      //case 1 email not registered, success
      if (response.ok) {
        //update registered email
        setRegisteredEmail(data.user.email);
        localStorage.setItem("registeredEmail", data.user.email);
        setError("");
      } else {
        //case 2 email is already registered
        if (
          response.status === 400 &&
          data.error === "Email already registered"
        ) {
          // Display message "Email is already registered"
          toast.error(
            "This Email is already registered."
          );
        }
        //email not registered , redirect to confirm mail page
        else if (
          response.status === 201 &&
          data.message === "User registered successfully"
        ) {
          dispatch({ type: "login", payload: data.user, token: null });
          setRegisteredEmail(data.user.email);
          localStorage.setItem("registeredEmail", data.user.email);
          setError("");
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      console.error("Signup failed:", error.message);
      setError("Signup failed:", error.message);
    }
  }

  // Define the verifyCode function
  async function verifyCode(email, verificationCode) {
    try {
      const response = await fetch(
        "https://mutemotion.onrender.com/api/v1/learner/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, verificationCode }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        dispatch({
          type: "verify_code",
          payload: { user: data.user, token: data.token },
        });
        setError("");
      } else {
        if (
          response.status === 401 &&
          data.error === "Invalid verification code"
        ) {
          // Display message "User is not activated" for three seconds
          toast.error("Verification code is not correct");
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      console.error("Verification failed:", error.message);
      setError(error.message);
    }
  }

  // Define the askForAnotherCode function
  async function askForAnotherCode(email) {
    try {
      const response = await fetch(
        "https://mutemotion.onrender.com/api/v1/learner/sendagain",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      // Success: return data if needed
      return data;
    } catch (error) {
      console.error("Ask for another code failed:", error.message);
      throw error;
    }
  }
  // Define the login function
  async function login(email, password) {
    try {
      const response = await fetch(
        "https://mutemotion.onrender.com/api/v1/learner/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({
          type: "login",
          payload: { user: data.user, token: data.token },
        });
        setError("");
        // localStorage.setItem("isLoggedIn",true)
      } else {
        if (response.status === 401 && data.error === "User is not activated") {
          // Display message "User is not activated"
          toast.error("User is not activated");
        } else if (
          response.status === 401 &&
          data.error === "Invalid credentials"
        ) {
          // Display message "Invalid credentials"
          toast.error("Invalid credentials");
        } else if (response.status === 401 && data.error === "Wrong password") {
          // Display message "Wrong password"
          toast.error("Email oR password is not correct.");
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(error.message);
    }
  }
  // Define the logout function
  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("registeredEmail");
    window.location.reload();
  }
  // Return the AuthProvider component with the necessary context and functions
  return (
    <RealAuthContext.Provider
      value={{
        user,
        isAuthenticated,
        registeredEmail,
        signup,
        verifyCode,
        askForAnotherCode,
        login,
        logout,
        error,
        token,
        setError,
      }}
    >
      {children}
    </RealAuthContext.Provider>
  );
}

// Define the useAuth hook
function useAuth() {
  // Define the AuthContext component
  const context = useContext(RealAuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
// Export the AuthProvider and useAuth functions
export { AuthProvider, useAuth };
