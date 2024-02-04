import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContxt";
import { useNavigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const { isAuthuntecated } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthuntecated) navigate("/");
    },
    [isAuthuntecated, navigate]
  );
  return isAuthuntecated ? children : null;
}

export default ProtectedRoute;
