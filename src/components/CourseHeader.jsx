import StarRating from "./StarRating";
import styles from "./CourseHeader.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../contexts/Auth";

export default function CourseHeader({
  courseTitle,
  courseImg,
  alt,
  courseId,
  setIsPaying,
  courseBreif,
}) {
  const navigateTo = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useAuth();

  const [btnStyle1, setBtnStyle1] = useState({
    fontSize: "2.5rem",
    textTransform: "uppercase",
    borderColor: "#442C8F",
    borderStyle: "solid",
    borderWidth: "2px",
  });

  useEffect(() => {
    function updateBtnStyle() {
      if (window.innerWidth >= 4000) {
        setBtnStyle1((prevStyle) => ({
          ...prevStyle,
          fontSize: "5.8rem",
          width: "500px",
        }));
      } else {
        setBtnStyle1((prevStyle) => ({
          ...prevStyle,
          fontSize: "2.5rem",
          width: "250px",
        }));
      }
    }

    updateBtnStyle(); // Initial call
    window.addEventListener("resize", updateBtnStyle);

    return () => {
      window.removeEventListener("resize", updateBtnStyle);
    };
  }, []);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function handleAddToCart() {
    try {
      const response = await fetch("https://mutemotion.onrender.com/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is defined
        },
        body: JSON.stringify({ courseId: courseId }), // Correctly set the body
      });

      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);

      const data = await response.json();

      console.log("Response Data:", data);

      if (response.ok) {
        console.log("Course added to cart successfully!");
        setErrorMessage("");
        return true;
      } else {
        if (data.message === "Course already exists in cart") {
          setErrorMessage("Course already exists in cart");
        } else if (data.message === "You have already purchased this course") {
          setErrorMessage("You have already purchased this course");
        } else {
          console.error("Failed to add course to cart: ", data);
          // Optionally set a general error message
          setErrorMessage("Failed to add course to cart. Please try again.");
        }
        return false; 
      }
    } catch (error) {
      console.error("There was an error adding the course to the cart!", error);
      setErrorMessage("Failed to add course to cart. Please try again.");
       return false;
    }
  }
  
  async function handlePaying() {
    const success = await handleAddToCart();
    if (success) {
      navigateTo("/cart");
    }
  }

  return (
    <>
      <header className={styles.coursesHeader}>
        <div className={styles.rect1}>
          <div className={styles.content}>
            <h1>{courseTitle}</h1>
            <p>{courseBreif}</p>
          </div>
          <StarRating
            maxRating={5}
            size={windowSize.width >= 4000 ? 90 : 45}
            hoverEnabled={false}
            defaultRating={5}
          />
          <div className={styles.btns}>
            <Button type="continue" btnStyle={btnStyle1} onClick={handlePaying}>
              Buy Now
            </Button>
            <Button
              type="overview"
              btnStyle={btnStyle1}
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
          </div>
        </div>
        <div className={styles.rect}>
          <img src={courseImg} alt={alt}></img>
        </div>
      </header>
    </>
  );
}
