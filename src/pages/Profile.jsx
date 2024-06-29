import styles from "./Profile.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { SetProfilePic } from "../components/SetProfilePic";
import { NamesForm } from "../components/NamesForm";
import { PersonalInfon, Notification } from "./PersonalInfon";
import { useProfile } from "../contexts/ProfileContext";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../contexts/Auth";

export default function Profile() {
  const { fullName, profilePicture, notificationMessage } = useProfile();
  const { token, logout } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
  // Function to show the delete confirmation toast
  const showDeleteConfirmation = () => {
    toast(
      (t) => (
        <div style={{ textAlign: "center" }}>
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
        <PageNav />
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
        <Button type="continue" onClick={showDeleteConfirmation}>
          Delete account
        </Button>
      </div>
      {/* {showDeleteConfirm && (
        <div
          className={styles.confirmDialog}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <p style={{ color: "red", textAlign: "center", fontSize: "2rem" }}>
            Are you sure you want to delete your account?
          </p>

          <Button type="continue" onClick={handleDeleteAccount}>
            OK
          </Button>
          <Button type="continue" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
        </div>
      )} */}
      <Footer />
    </>
  );
}
