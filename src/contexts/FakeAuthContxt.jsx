import { createContext, useContext, useReducer } from "react";
const initial_state = {
  user: null,
  isAuthuntecated: false,
};
const AuthContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthuntecated: true };
    case "logout":
      return { ...initial_state };
    default:
      throw new Error("Unkonwn action");
  }
}
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function AuthProvider({ children }) {
  const [{ user, isAuthuntecated }, dispatch] = useReducer(
    reducer,
    initial_state
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthuntecated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider ");
  return context;
}

export { AuthProvider, useAuth };
