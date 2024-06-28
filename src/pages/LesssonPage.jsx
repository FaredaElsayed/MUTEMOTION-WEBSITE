import Slider from "../components/Slider";
import styles from "./LessonPage.module.css";

function LessonPage({videoSrc,lessonTitle}) {
    return (
        <div className={styles.lesson}>
            <h1 style={{cursor:"none"}}>{lessonTitle}</h1>
            <div >
                <video controls className={styles.videoPlayer}>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <p>Lesson description...</p>
            <Slider/>
        </div>
    );
}

export default LessonPage;
