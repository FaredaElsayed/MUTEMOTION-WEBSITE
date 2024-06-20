import styles from "./Profile.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { SetProfilePic } from "../components/SetProfilePic";
import { Pass } from "../components/Pass";
import { NamesForm } from "../components/NamesForm";
import {
  PersonalInfon,
  Password,
  Notification,
  Language,
} from "./PersonalInfon";
import { useAuth } from "../contexts/Auth";

export default function Profile() {
  const [FullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState("./person.png");
  const [mainImage, setMainImage] = useState("./person.png");
  const { token } = useAuth();

  useEffect(() => {
    async function fetchProfileData() {
      const url = "https://mutemotion.onrender.com/api/profile";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setFullName(data.fullname);
          setEmail(data.email);

          setSelectedImage(data.profilePicture || "./person.png");
          setMainImage(data.profilePicture || "./person.png");
        } else {
          throw new Error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    fetchProfileData();
  }, [token]);
  return (
    <>
      <div className={styles.profile}>
        <PageNav />
        <main>
          <section className={styles.rectangle}>
            <div className={styles.mainInfo}>
              <img src={mainImage} alt="Your name" className={styles.img}></img>
              <h2>{FullName}</h2>
              <Button type="continue">Share Profile</Button>
              <div className={styles.rectangle2}>
                <PersonalInfon />
                <Password />
                <Notification />
                <Language />
              </div>
            </div>
          </section>
        </main>
        <section className={styles.container}>
          <PersonalInfon />
          <div className={styles.rectangleComponent}>
            <SetProfilePic
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <NamesForm
              selectedImage={selectedImage}
              mainImage={mainImage}
              setSelectedImage={setSelectedImage}
              setMainImage={setMainImage}
              setFullName={setFullName}
              FullName={FullName}
            />
          </div>
        </section>
        <section className={styles.container}>
          <Password />
          <Pass
            email={email}
            setEmail={setEmail}
            oldPass={password}
            setOldPass={setPassword}
          />
        </section>
        <section className={styles.container}>
          <Notification />
          <div className={styles.rectangleComponent}>
            <div className={styles.notification}>
              <p>There are no notifications to show</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
