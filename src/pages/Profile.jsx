import styles from "./Profile.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { SetProfilePic } from "../components/SetProfilePic";
import { NamesForm } from "../components/NamesForm";
import { PersonalInfon, Notification } from "./PersonalInfon";
import { useProfile } from "../contexts/ProfileContext";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Logo from "../components/Logo";
import React from  "react";
export default function Profile() {
  const { fullName, profilePicture, notificationMessage } = useProfile();
  const { token, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = useNavigate();

  // Function to handle sharing profile link
  const handleShareProfile = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.success("Profile link copied to clipboard"))
      .catch((error) => console.error("Failed to copy profile link: ", error));
  };
  // Function to handle account deletion
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        "https://mutemotion.onrender.com/api/profile",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }
      toast.success("Account deleted successfully");
      logout(); // Log the user out after deleting the account
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
    }
  };

  function handleLogout() {
    navigateTo("/");
    logout();
  }
  // Function to show the delete confirmation toast
  const showDeleteConfirmation = () => {
    toast(
      (t) => (
        <div style={{ textAlign: "center", background: "white" }}>
          <p>Are you sure you want to delete your account?</p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
          >
            <Button
              type="continue"
              onClick={() => {
                toast.dismiss(t.id);
                handleDeleteAccount();
              }}
            >
              OK
            </Button>
            <Button type="continue" onClick={() => toast.dismiss(t.id)}>
              Cancel
            </Button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };
  return (
    <>
      <div className={styles.profile}>
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
        <main>
          <div>
            <Toaster
              toastOptions={{
                className: "toast",
                success: {
                  iconTheme: {
                    primary: "#442c8f",
                    secondary: "white",
                  },
                },
              }}
            />
          </div>
          <section className={styles.rectangle}>
            <div className={styles.mainInfo}>
              <img
                src={profilePicture}
                alt="Your name"
                className={styles.img}
              ></img>
              <h2>{fullName}</h2>
              <Button type="continue" onClick={handleShareProfile}>
                Share Profile
              </Button>
              <div className={styles.rectangle2}>
                <PersonalInfon />
                <Notification />
              </div>
            </div>
          </section>
        </main>
        <section className={styles.container}>
          <PersonalInfon />
          <div className={styles.rectangleComponent}>
            <SetProfilePic selectedImage={profilePicture} />
            <NamesForm />
          </div>
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
        <div
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
          }}
          className={styles.buttons}
        >
          <Button type="continue" onClick={showDeleteConfirmation}>
            Delete account
          </Button>
          <Button type="continue" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
}
