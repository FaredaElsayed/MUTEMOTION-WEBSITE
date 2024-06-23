import styles from "./Profile.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { SetProfilePic } from "../components/SetProfilePic";
import { Pass } from "../components/Pass";
import { NamesForm } from "../components/NamesForm";
import {
  PersonalInfon,
  Password,
  Notification,
  Language,
} from "./PersonalInfon";
import { useProfile } from "../contexts/ProfileContext";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";

export default function Profile() {
  const {
    fullName,
    email,
    profilePicture,
    setFullName,
    setEmail,
    setProfilePicture,
  } = useProfile();
  const [notificationMessage, setNotificationMessage] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    async function fetchNotification() {
      const url = "https://mutemotion.onrender.com/api/notifications";
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
          console.log("Notification Data:", data); // Debug log
          setNotificationMessage(data); // Assuming the response has a 'message' field
        } else {
          throw new Error("Failed to fetch notification");
        }
      } catch (error) {
        console.error("Error fetching notification:", error);
        setNotificationMessage("Error fetching notifications");
      }
    }

    fetchNotification();
  }, [token]);
  return (
    <>
      <div className={styles.profile}>
        <PageNav />
        <main>
          <section className={styles.rectangle}>
            <div className={styles.mainInfo}>
              <img
                src={profilePicture}
                alt="Your name"
                className={styles.img}
              ></img>
              <h2>{fullName}</h2>
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
              selectedImage={profilePicture}
              setSelectedImage={setProfilePicture}
            />
            <NamesForm
              selectedImage={profilePicture}
              mainImage={profilePicture}
              setSelectedImage={setProfilePicture}
              setMainImage={setProfilePicture}
              setFullName={setFullName}
              FullName={fullName}
            />
          </div>
        </section>
        <section className={styles.container}>
          <Password />
          <Pass
            email={email}
            setEmail={setEmail}
            oldPass={""}
            setOldPass={() => {}}
          />
        </section>
        <section className={styles.container}>
          <Notification />
          <div className={styles.rectangleComponent}>
            <div className={styles.notification}>
              {notificationMessage.length > 0 ? (
                notificationMessage.map((notification, index) => (
                  <div key={index}>
                    <p>
                      {index + 1}. {notification.message}
                    </p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>No notifications to show</p>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
