import Button from "./Button";
import styles from "./Slider.module.css";
function Slider({ handleNext, handlePrev }) {
  return (
    <div className={styles.cont}>
      <div className={styles.slider}>
        <Button onClick={handlePrev} type="overview">
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 32L2 17.2163L14 2.43255"
              stroke="#442C8F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <Button onClick={handleNext} type="overview">
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.82825 32L13.8282 17.2163L1.82825 2.43255"
              stroke="#442C8F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
      <div className={styles.slide}>
       <div className={styles.inside}></div>
      </div>
    </div>
  );
}

export default Slider;
