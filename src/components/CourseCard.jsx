import { useState, useEffect, useContext } from "react";
import styles from "./CourseCard.module.css";
import StarRating from "./StarRating";
import { useAuth } from "../contexts/Auth";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function CourseCard({
  _id,
  title,
  instructor,
  poster,
  alt,
  review,
  wishlisted,
}) {
  const [error, setError] = useState(null);
  const [isFav, setIsFav] = useState(wishlisted);
  const [starSize, setStarSize] = useState(45);
  const { token , logout} = useAuth();
  const navigateTo = useNavigate();
  const notify = () => toast("Here is your toast.");
  useEffect(() => {
    const updateStarSize = () => {
      setStarSize(window.innerWidth >= 4000 ? 70 : 45);
    };

    // Set initial star size
    updateStarSize();

    // Update star size on window resize
    window.addEventListener("resize", updateStarSize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", updateStarSize);
    };
  }, []);
  // Load favorite status from localStorage when the component mounts
  // useEffect(() => {
  //   const storedIsFav = localStorage.getItem(`fav-status-${_id}`);
  //   if (storedIsFav !== null) {
  //     setIsFav(JSON.parse(storedIsFav));
  //   }
  // }, [_id, setIsFav]);

  //clicking on a course
  const handleCourseClick = async () => {
    try {
      const response = await fetch(
        `https://mutemotion.onrender.com/api/course-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseId: _id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch course details");
      }

      const data = await response.json();
      navigateTo(`/courses/${_id}`, { state: { course: data } });
    } catch (error) {
      console.error("Error fetching course details:", error);
       logout();
    }
  };

  async function addToWishlist() {
    const url = "https://mutemotion.onrender.com/api/wishlist";
    const body = JSON.stringify({ courseId: _id });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        console.log("Added to wishlist:", data);
        setIsFav(wishlisted);
        toast.success("Course successfully added to your wishlist");
        setError("null");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        const errorMessage = data.error || "Failed to add to wishlist";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error.message);
      setError(error.message || "Failed to add to wishlist");
       logout();
    }
  }

  async function removeFromWishlist() {
    const url = `https://mutemotion.onrender.com/api/wishlist`;

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId: _id }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        console.log("Removed from wishlist:", data);
        setIsFav(false);
        toast.error("Course successfully removed from your wishlist");
        setError(null);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        const errorMessage = data.error || "Failed to remove from wishlist";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error.message);
      setError(error.message || "Failed to remove from wishlist");
      logout();
    }
  }

  async function handleToggleFav() {
    try {
      if (isFav) {
        await removeFromWishlist();
      } else {
        await addToWishlist();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error.message);
      setError(error.message || "Failed to toggle favorite");
    }
  }

  return (
    <div className={styles.card} style={{ position: "relative" }}>
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
      <img src={poster} alt={alt} onClick={handleCourseClick}></img>
      {!isFav ? (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.fav}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            cursor: "pointer",
          }}
          onClick={handleToggleFav}
        >
          <path
            d="M22.45 6C23.1781 5.99939 23.899 6.14413 24.5704 6.42575C25.2418 6.70736 25.8502 7.12018 26.36 7.64C27.4104 8.70638 27.9992 10.1432 27.9992 11.64C27.9992 13.1368 27.4104 14.5736 26.36 15.64L16 26.13L5.64002 15.64C4.5896 14.5736 4.00081 13.1368 4.00081 11.64C4.00081 10.1432 4.5896 8.70638 5.64002 7.64C6.15011 7.12055 6.7586 6.70795 7.42993 6.42629C8.10127 6.14464 8.82199 5.99957 9.55002 5.99957C10.278 5.99957 10.9988 6.14464 11.6701 6.42629C12.3414 6.70795 12.9499 7.12055 13.46 7.64L16 10.24L18.53 7.66C19.0383 7.13399 19.6474 6.71586 20.3209 6.43064C20.9944 6.14542 21.7186 5.99895 22.45 6ZM22.45 4C21.4556 3.99916 20.4711 4.19686 19.5541 4.5815C18.6372 4.96615 17.8062 5.53 17.11 6.24L16 7.36L14.89 6.24C14.193 5.53129 13.3618 4.96841 12.445 4.58419C11.5282 4.19997 10.5441 4.0021 9.55002 4.0021C8.55596 4.0021 7.57184 4.19997 6.65503 4.58419C5.73822 4.96841 4.90707 5.53129 4.21002 6.24C2.7919 7.68363 1.99731 9.62636 1.99731 11.65C1.99731 13.6736 2.7919 15.6164 4.21002 17.06L16 29L27.79 17.06C29.2081 15.6164 30.0027 13.6736 30.0027 11.65C30.0027 9.62636 29.2081 7.68363 27.79 6.24C27.0931 5.53091 26.2621 4.96765 25.3453 4.58306C24.4284 4.19848 23.4442 4.00028 22.45 4Z"
            fill="#442C8F"
          />
        </svg>
      ) : (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.fav}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            cursor: "pointer",
          }}
          onClick={handleToggleFav}
        >
          <path
            d="M14.0003 24.4667L12.067 22.7067C5.20033 16.48 0.666992 12.3733 0.666992 7.33333C0.666992 3.22667 3.89366 0 8.00033 0C10.3203 0 12.547 1.08 14.0003 2.78667C15.4537 1.08 17.6803 0 20.0003 0C24.107 0 27.3337 3.22667 27.3337 7.33333C27.3337 12.3733 22.8003 16.48 15.9337 22.72L14.0003 24.4667Z"
            fill="#442C8F"
          />
        </svg>
      )}
      <h1 onClick={handleCourseClick}> {title}</h1>
      <h3>{instructor}</h3>
      <StarRating
        maxRating={5}
        size={starSize}
        hoverEnabled={false}
        defaultRating={Number(review)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CourseCard;
