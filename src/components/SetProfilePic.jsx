import styles from "../pages/Profile.module.css";
import { useRef } from "react";

export const SetProfilePic = ({ selectedImage }) => {
  const fileInputRef = useRef(null);

  const handleSvgClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.sideComp}>
      <img src={selectedImage} alt="person" className={styles.img} />
    </div>
  );
};
