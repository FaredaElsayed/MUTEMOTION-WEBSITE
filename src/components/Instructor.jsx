import styles from "./Instructor.module.css";
import ParagraphToList from "./ParagraphToList";
function Instructor({ imgSrc, name, info, instInfo }) {
  return (
    <div className={styles.instructor}>
      <p>Instructor</p>
      <div className={styles.mainInfo}>
        <img src={imgSrc} alt={name}></img>
        <ParagraphToList paragraph={info} />
      </div>
      <div className={styles.instInfo}>
        <h2>{name}</h2>
        <p>{instInfo}</p>
      </div>
    </div>
  );
}

export default Instructor;
