import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { useCart } from "../contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";
import StarRating from "./StarRating";
import Button from "./Button";
import styles from "./CourseHeader.module.css";

export default function CourseHeader({
  courseTitle,
  courseImg,
  alt,
  courseId,
  myRating,
  courseBreif,
}) {
  const navigateTo = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { token, logout } = useAuth();
  const { items, setItems } = useCart();

  useEffect(() => {
    async function fetchMyLearningCourses() {
      try {
        const response = await fetch(
          "https://mutemotion.onrender.com/api/mylearning",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch my learning courses");
        }

        const data = await response.json();

        console.log("Fetched My Learning Courses:", data);

        // Check if the courseId is in the fetched courses
        const courseInLearning = data.find(
          (course) => course.courseId === courseId
        );

        if (courseInLearning) {
          setErrorMessage("You have already purchased this course");
        } else {
          setErrorMessage("");
        }
      } catch (error) {
        console.error("Error fetching my learning courses:", error);
        logout();
        setErrorMessage("Failed to fetch my learning courses");
      }
    }

    fetchMyLearningCourses();
  }, [token, courseId, logout]);

  useEffect(() => {
    // Check if course exists in cart or has been purchased already
    const courseInCart = items.find((item) => item._id === courseId);
    if (courseInCart) {
      setErrorMessage("Course already exists in cart");
    } else {
      setErrorMessage("");
    }
  }, [items, courseId]);

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
      const data = await response.json();

      console.log("Response Data:", data);

      if (response.ok) {
        console.log("Course added to cart successfully!");
        setErrorMessage("Course already exists in cart");
        toast.success("Successfully added to your cart!");
        setItems([...items, data]);
        return true;
      } else {
        if (data.message === "Course already exists in cart") {
          setErrorMessage("Course already exists in cart");
          toast.error("Course already exists in cart!");
        } else if (data.message === "You have already purchased this course") {
          setErrorMessage("You have already purchased this course");
          toast.error("You have already purchased this course!");
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
    if (success || errorMessage === "Course already exists in cart") {
      navigateTo("/cart");
    }
  }

  return (
    <>
      <header className={styles.coursesHeader}>
        <div>
          <Toaster
            toastOptions={{
              className: "toast",
              success: {
                iconTheme: {
                  primary: "#442c8f",
                  secondary: "white",
                },
              },
            }}
          />
        </div>
        <div className={styles.rect1}>
          <div className={styles.content}>
            <h1>{courseTitle}</h1>
            <p>{courseBreif}</p>
          </div>
          <StarRating
            maxRating={myRating}
            size={windowSize.width >= 4000 ? 90 : 45}
            hoverEnabled={false}
            defaultRating={5}
          />
          <div className={styles.btns}>
            <Button type="continue" btnStyle={btnStyle1} onClick={handlePaying}>
              {errorMessage === "You have already purchased this course"
                ? "Bought"
                : errorMessage === "Course already exists in cart"
                ? "Buy Now"
                : "Buy Now"}
            </Button>
            <Button
              type="overview"
              btnStyle={btnStyle1}
              onClick={handleAddToCart}
            >
              {errorMessage === "You have already purchased this course"
                ? "In My Learning"
                : errorMessage === "Course already exists in cart"
                ? "In Cart"
                : "Add To Cart"}
            </Button>
          </div>
        </div>
        <div className={styles.rect}>
          <img src={courseImg} alt={alt}></img>
        </div>
      </header>
    </>
  );
}
