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
        const courseInLearning = data.find(
          (course) => course.courseId === courseId
        );

        if (courseInLearning) {
          setErrorMessage("You have already purchased this course");
        }
        // No need to set an empty string here to preserve the error message
      } catch (error) {
        console.error("Error fetching my learning courses:", error);
        logout();
        setErrorMessage("Failed to fetch my learning courses");
      }
    }

    fetchMyLearningCourses();
  }, [token, courseId, logout]);

  useEffect(() => {
    const courseInCart = items.find((item) => item._id === courseId);
    if (courseInCart) {
      setErrorMessage("Course already exists in cart");
    } else if (!errorMessage) {
      setErrorMessage(""); // Reset to empty string if no specific error is set
    }
  }, [items, courseId, errorMessage]);

  const [btnStyle1, setBtnStyle1] = useState({
    fontSize: "2.5rem",
    textTransform: "uppercase",
    borderColor: "#442C8F",
    borderStyle: "solid",
    borderWidth: "2px",
  });

  useEffect(() => {
    function updateBtnStyle() {
      const newSize = window.innerWidth >= 4000 ? "5.8rem" : "2.5rem";
      const newWidth = window.innerWidth >= 4000 ? "500px" : "250px";
      setBtnStyle1({
        fontSize: newSize,
        width: newWidth,
        ...btnStyle1,
      });
    }

    updateBtnStyle();
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

    handleResize();
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: courseId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Successfully added to your cart!");
        setItems([...items, data]);
        setErrorMessage("Course already exists in cart");
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
    const courseInCart = items.find((item) => item._id === courseId);
    const courseInLearning =
      errorMessage === "You have already purchased this course";

    if (courseInCart) {
      setErrorMessage("Course already exists in cart");
      navigateTo("/cart");
    } else if (courseInLearning) {
      setErrorMessage("You have already purchased this course");
    } else {
      const success = await handleAddToCart();
      if (success) {
        navigateTo("/cart");
      }
    }
  }

  const getButtonLabel = () => {
    if (errorMessage === "You have already purchased this course") {
      return "Bought";
    } else if (errorMessage === "Course already exists in cart") {
      return "Buy Now";
    } else {
      return "Buy Now";
    }
  };

  const getOverviewButtonLabel = () => {
    if (errorMessage === "You have already purchased this course") {
      return "In My Learning";
    } else if (errorMessage === "Course already exists in cart") {
      return "In Cart";
    } else {
      return "Add To Cart";
    }
  };

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
              {getButtonLabel()}
            </Button>
            <Button
              type="overview"
              btnStyle={btnStyle1}
              onClick={handleAddToCart}
            >
              {getOverviewButtonLabel()}
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
