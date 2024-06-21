import styles from "./Instructor.module.css";
import ParagraphToList from "./ParagraphToList";
function Instructor({
  imgSrc,
  name,
  info,
  instInfo,
  coursesGiven,
  certificate,
  education,
}) {
  return (
    <div className={styles.instructor}>
      <p>Instructor</p>

      <div className={styles.mainInfo}>
        <img src={imgSrc} alt={name}></img>

        <ul>
          <li>{info}</li>
          <li>{certificate}</li>
          <li>{education}</li>
        </ul>
        <ul>
          <h6 style={{ textDecoration: "underline" }}>Courses Given: </h6>
          {coursesGiven.map((course, index) => (
            <li key={index}>.{course}</li>
          ))}
        </ul>
      </div>

      <div className={styles.instInfo}>
        <h2>{name}</h2>
        <p>{instInfo}</p>
      </div>
    </div>
  );
}

export default Instructor;
