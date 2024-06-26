import { NavLink } from "react-router-dom";
import styles from "./MyLearning.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import CardInProgress from "../components/CardInProgress";
import { useAuth } from "../contexts/Auth";
import { useEffect, useState } from "react";


export default function MyLearning() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(false);
  const { logout } = useAuth();
  const { token } = useAuth();
  
  useEffect(() => {
    async function fetchMyLearningCourses() {
      try {
        const response = await fetch(
          "https://mutemotion.onrender.com/api/mylearning",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch my learning courses");
        }

        const data = await response.json();

        if (data.length === 0) {
          setError(true);
        } else {
          setError(false);
        }
        setCourses(data);
        console.log("My Learning Courses:", data);
      } catch (error) {
        console.error("Error fetching my learning courses:", error);
        logout();
        setError(true);
      }
    }

    fetchMyLearningCourses();
    
  }, [token]);

  return (
    <>
      <div className={styles.mylearning}>
        <PageNav />
        <div className={styles.container}>
          <h1>My Programs</h1>
         
          <ul className={styles.progress}>
            <li className={`${styles.navItem} ${styles.active}`}>
              <NavLink to="/inprogress">In progress</NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/inprogress">Completed</NavLink>
            </li>
          </ul>
          <div className={styles.courses}>
            {error && (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  fontSize: "2.5rem",
                }}
              >
                You haven't purchased any course yet.
              </p>
            )}
            {courses.map((course) => (
              <div key={course.courseId} className={styles.progressCont}>
                <CardInProgress {...course} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
