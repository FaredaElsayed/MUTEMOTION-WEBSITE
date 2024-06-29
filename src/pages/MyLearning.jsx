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
  const [activeTab, setActiveTab] = useState("inprogress");
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className={styles.mylearning}>
        <PageNav />
        <div className={styles.container}>
          <h1>My learning</h1>

          <ul className={styles.progress}>
            <li
              className={`${styles.navItem} ${
                activeTab === "inprogress" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("inprogress")}
            >
              <NavLink to="/inprogress">In progress</NavLink>
            </li>
            <li
              className={`${styles.navItem} ${
                activeTab === "completed" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("completed")}
            >
              <NavLink to="/inprogress">Completed</NavLink>
            </li>
          </ul>
          <div className={styles.courses}>
            {activeTab === "completed" ? (
              <p
                style={{
                 
                  textAlign: "center",
                  fontSize: "2.5rem",
                }}
              >
                You haven't completed any course yet.
              </p>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
