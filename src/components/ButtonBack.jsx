import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack({setIsPaying}) {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        setIsPaying(false);
        navigate("/cart");
      }}
    >
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
