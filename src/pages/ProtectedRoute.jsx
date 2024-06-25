// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

const ProtectedRoute = () => {
  const isLoggedIn  = localStorage.getItem("isLoggedIn");
 const { isAuthenticated } = useAuth();
  console.log(isLoggedIn);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
