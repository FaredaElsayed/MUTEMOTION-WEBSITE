import styles from "../components/ParagraphToList.module.css";
export default function ParagraphToList({
  paragraph,
  lessonsnum,
  instructor,
  studentsBought,
  category,
  level,
  hours,
  desc,
  text,
  styleP,
  price,
}) {
  const costumeStyle = styleP;
  const sentences = paragraph
    ? paragraph
        .split(".")
        .map((sentence) => sentence.trim())
        .filter(Boolean)
    : [];
  const lines = text && text.split("\n").filter((line) => line.trim() !== "");
  return (
    <div className={styles.paragraphToList}>
      <div className={styles.content} style={costumeStyle}>
        {level && <h1>{level}</h1>}
        {desc && <p>{desc}</p>}

        <ul className={styles.ul}>
          {sentences.map((sentence, index) => (
            <li key={index}>{sentence}</li>
          ))}
        </ul>
      </div>

      {text && (
        <div className={styles.rect}>
          <h2>Course Details:</h2>
          <ul>
            <li>Original Price: {price}</li>
            <li>Cours category: {category} </li>
            <li>Cours instructor: {instructor} </li>
            <li>Cours hours: {hours} </li>
            <li>number of lessons: {lessonsnum} </li>
            <li>number of lessons: {studentsBought} </li>
          </ul>
          {/* <ul>
            {lines && lines.map((line, index) => <li key={index}>{line}</li>)}
          </ul> */}
        </div>
      )}
    </div>
  );
}
