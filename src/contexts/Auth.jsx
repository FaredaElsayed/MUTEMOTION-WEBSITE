import { createContext, useContext, useReducer } from "react";

const initial_state = {
  user: null,
  isAuthenticated: false,
};

const RealAuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "verify_code":
      return { ...state, isAuthenticated: true };
    case "logout":
      return { ...initial_state };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initial_state
  );

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
        dispatch({ type: "login", payload: data.user });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <RealAuthContext.Provider
      value={{ user, isAuthenticated, signup, login, logout }}
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
