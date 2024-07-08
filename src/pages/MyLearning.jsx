import { NavLink } from "react-router-dom";
import styles from "./MyLearning.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import CardInProgress from "../components/CardInProgress";
import { useAuth } from "../contexts/Auth";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner"; // Assuming Spinner is a component
import { FaBars, FaTimes } from "react-icons/fa";

export default function MyLearning() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("inprogress");
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();
  const { token } = useAuth();
      const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    async function fetchMyLearningCourses() {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
        <div
          className="menuIcon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <PageNav isMenuOpen={isMenuOpen} />
       
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
            {isLoading ? (
              <Spinner /> // Display the spinner while loading
            ) : (
              <>
                {activeTab === "completed" ? (
                  <p
                    style={{
                      textAlign: "center",
                    }}
                  >
                    You haven't completed any course yet.
                  </p>
                ) : (
                  <>
                    {error && (
                      <p
                        style={{
                          textAlign: "center",
                        }}
                      >
                        You haven't purchased any course yet.
                      </p>
                    )}
                    {courses.map((course) => (
                      <div
                        key={course.courseId}
                        className={styles.progressCont}
                      >
                        <CardInProgress {...course} />
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
