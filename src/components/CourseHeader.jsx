import StarRating from "./StarRating";
import styles from "./CourseHeader.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CourseHeader({
  courseTitle,
  courseImg,
  alt,
  setIsPaying,
}) {
  const navigateTo = useNavigate();
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

  function handlePaying() {
    setIsPaying(true);
    navigateTo("/cart");
  }
  return (
    <>
      <header className={styles.coursesHeader}>
        <div className={styles.rect1}>
          <div className={styles.content}>
            <h1>{courseTitle}</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
              recusandae perferendis, perspiciatis harum repudiandae, dolor
              mollitia nobis ea velit soluta at possimus dicta non nam
              exercitationem maxime illo facere odit.
            </p>
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
            <Button type="overview" btnStyle={btnStyle1}>
              Add To Cart
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
