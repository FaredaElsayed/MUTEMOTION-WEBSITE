import styles from "./Likes.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import CustomSlider from "./CustomSlider";
import { useEffect, useContext, useState } from "react";
import { CourseContext } from "../contexts/CoursesApis";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../components/Logo";
import React from  "react";
export default function Likes() {
  const { state } = useContext(CourseContext);
  const { wishlist, loading, error } = state;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Logging wishlist state
  useEffect(() => {
    console.log("Fetching wishlist...");
    console.log("Token:", localStorage.getItem("token"));
    console.log("Wishlist state:", wishlist);
  }, [wishlist]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <main className={styles.likes}>
        <div className="menuIcon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Logo /> {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
        <PageNav isMenuOpen={isMenuOpen} />
        {wishlist.length > 0 ? (
          <CustomSlider title="Your Wishlist" courses={wishlist} />
        ) : (
          <p style={{ alignSelf: "center", marginTop: "5%", fontSize: "3rem" }}>
            No courses in your wishlist yet.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
