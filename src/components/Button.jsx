import styles from "./Button.module.css";
function Button({ children, onClick, type, btnStyle }) {
  

  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
      style={btnStyle}
    >
      {children}
    </button>
  );
}

export default Button;
