import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import MyProgressBar from "./ProgressBar";
import styles from "./CardInProgress.module.css";
import { useAuth } from "../contexts/Auth";
import React from  "react";
function CardInProgress({ courseId, instructor, poster, title, progress }) {
  const [iconSize, setIconSize] = useState(40);
  const navigateTo = useNavigate();
  const {token} = useAuth();
  const handleOverviewClick = async () => {
    console.log("Token:", token); // Log the token to ensure it is being retrieved

    try {
      const response = await fetch(
        `https://mutemotion.onrender.com/api/course-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseId: courseId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch course details");
      }

      const data = await response.json();
      console.log("Course details:", data); // Log the course details
      navigateTo(`/courses/${courseId}`, { state: { course: data } });
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };
  const icon = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.8499 32.8157L32.548 19.2838C33.2929 17.5895 33.7097 15.717 33.7097 13.747C33.7097 6.15451 27.5674 0 19.9915 0C12.4137 0 6.27216 6.15514 6.27216 13.747C6.27216 15.7645 6.70951 17.6789 7.48812 19.4045L0.153656 32.8095C-0.0828383 33.2402 -0.0435331 33.7717 0.252191 34.1649C0.54854 34.557 1.0489 34.7414 1.52676 34.6289L7.79001 33.189L9.9337 39.1722C10.1009 39.6374 10.5245 39.96 11.0155 39.9962C11.0474 39.9987 11.0779 40 11.1079 40C11.3335 39.9999 11.5549 39.9385 11.7484 39.8224C11.942 39.7062 12.1005 39.5397 12.2072 39.3404L18.5902 27.4234C19.0556 27.4707 19.5231 27.4942 19.9908 27.4941C20.4244 27.4941 20.8524 27.4716 21.2754 27.4316L27.7969 39.3498C27.9123 39.5611 28.0862 39.7344 28.2976 39.849C28.509 39.9636 28.749 40.0145 28.9886 39.9956C29.4783 39.9562 29.9001 39.6343 30.066 39.1716L32.2097 33.1884L38.4729 34.6282C38.9533 34.7445 39.4487 34.5576 39.745 34.1668C40.0426 33.7767 40.0826 33.2477 39.8499 32.8157ZM11.3349 35.6829L9.76509 31.3002C9.55048 30.7044 8.92787 30.3574 8.31143 30.5043L3.67903 31.569L8.9591 21.9184C10.6979 24.2723 13.1685 26.0479 16.034 26.9119L11.3349 35.6829ZM8.77876 13.747C8.77876 7.55181 13.8092 2.51141 19.992 2.51141C26.1741 2.51141 31.2039 7.55181 31.2039 13.747C31.2039 19.9421 26.1741 24.9838 19.992 24.9838C13.8086 24.9838 8.77876 19.9421 8.77876 13.747ZM31.6881 30.5043C31.0692 30.358 30.449 30.7043 30.2344 31.3001L28.654 35.7147L23.8519 26.9399C26.7936 26.0765 29.3241 24.2541 31.0854 21.8314L36.3435 31.574L31.6881 30.5043Z"
        fill="#442C8F"
      />
    </svg>
  );
  useEffect(() => {
    const handleResize = () => {
      // Update icon size based on window width
      if (window.innerWidth >= 4000) {
        setIconSize(70);
      } else {
        setIconSize(40);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set initial icon size
    handleResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={poster} alt={title}></img>
      </div>
      <div className={styles.content}>
        <div className={styles.withIcon}>
          <h1>{title}</h1>
          <span className={styles.icon}>{icon}</span>
        </div>
        <p>
          {instructor}, Progress: {progress}%
        </p>
        <MyProgressBar interval={progress} />
      </div>
      <div className={styles.buttons}>
        <Button type="overview" onClick={handleOverviewClick}>
          overview
        </Button>
        <Button type="continue">continue</Button>
      </div>
    </div>
  );
}

export default CardInProgress;
