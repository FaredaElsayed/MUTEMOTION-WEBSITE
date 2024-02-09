import styles from "../components/ParagraphToList.module.css";
export default function ParagraphToList({ paragraph, level, desc, text,styleP }) {
  const costumeStyle = styleP;
  const sentences = paragraph
    ? paragraph
        .split(".")
        .map((sentence) => sentence.trim())
        .filter(Boolean)
    : [];
  const lines = text && text.split("\n").filter((line) => line.trim() !== "");
  return (
    <div className={styles.container}>
      <div className={styles.content} style={costumeStyle }>
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
          <ul>
            <h2>Course Details:</h2>
            {lines && lines.map((line, index) => <li key={index}>{line}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
