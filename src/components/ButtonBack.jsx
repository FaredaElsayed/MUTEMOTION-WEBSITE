import { useNavigate } from "react-router-dom";
import Button from "./Button";
import React from  "react";
function ButtonBack({setIsPaying,dest}) {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
       setIsPaying && setIsPaying(false);
        navigate(dest);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
