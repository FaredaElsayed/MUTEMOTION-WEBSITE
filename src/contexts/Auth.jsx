import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

const initial_state = {
  user: null,
  isAuthenticated: false,
  token: localStorage.getItem("token") || null,
};

const RealAuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case "verify_code":
      return { ...state, isAuthenticated: true };
    case "logout":
      return { ...initial_state,token:null };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  // const storedToken = localStorage.getItem("token");
  const [state, dispatch] = useReducer(reducer, initial_state);
  const { user, isAuthenticated, token } = state;
  const [error, setError] = useState(null);

  //Store token in local storage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

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
      if (response.ok) {
        console.log("Signup successful:", data);
        dispatch({ type: "login", payload: data.user });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  }

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
        
      } else {
        if (response.status === 401 && data.error === "User is not activated") {
          setError("User is not activated");
          // Display message "User is not activated"
        } else if (
          response.status === 401 &&
          data.error === "Invalid credentials"
        ) {
          // Display message "Invalid credentials"
          setError("Invalid credentials");
        } else if (response.status === 401 && data.error === "Wrong password") {
          console.log("Wrong password");
          // Display message "Wrong password"
          setError("Wrong password");
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(error.message);
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <RealAuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signup,
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

function useAuth() {
  const context = useContext(RealAuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
