import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

function ProtectedRoute({ children }) {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    logout(); // Ensure the user is logged out and localStorage is cleared
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
