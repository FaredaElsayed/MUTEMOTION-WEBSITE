import { useProfile } from "../contexts/ProfileContext";
import styles from "../pages/Profile.module.css";
import Button from "./Button";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import React from  "react";
export function Pass({
  email,
  setEmail,
  oldPass,
  setOldPass,
  fullName,
  phone,
  profilePicture,
  
}) {
  const [newPass, setNewPass] = useState("");
  const [confNewPass, setConfNewPass] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const {updateProfileInfo}=useProfile()

  const handlePasswordSave = (e) => {
    if (oldPass.length < 8) {
      return;
    }

    if (newPass.length < 8) {
      return;
    }

    if (newPass !== confNewPass) {
      return;
    }
    console.log("Password saved successfully!");
  };

  const handleEmailSave = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return;
    }
    console.log("Email saved successfully!");
  };

  const handleEmailPasswordSave = async (e) => {
    e.preventDefault();
    // Validate inputs
    if (!email || !phone || !fullName) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Prepare updated data
    const updatedData = {
      email: email,
      phoneNumber: phone,
      fullname: fullName,
      profileImgBase64: profilePicture, // Assuming profilePicture is base64 encoded
    };

    try {
      const success = await updateProfileInfo(updatedData);
      if (success) {
        toast.success("Profile updated successfully.");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className={styles.rectangleComponent}>
      <div className={styles.sideComp}></div>
      <div className={styles.form}>
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ali20@gmail.com"
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              required
            />
          </div>
          <div>
            <label htmlFor="curPass">Current Password:</label>
            <input
              type="password"
              id="curPass"
              name="curPass"
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
              placeholder="*******"
              minLength={8}
              required
            />
          </div>
          <div>
            <label htmlFor="newPass">New Password:</label>
            <input
              type="password"
              id="newPass"
              name="newPass"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="********"
              minLength={8}
              required
            />
          </div>
          <div>
            <label htmlFor="confNewPass">Confirm New Password:</label>
            <input
              type="password"
              id="confNewPass"
              name="confNewPass"
              value={confNewPass}
              onChange={(e) => setConfNewPass(e.target.value)}
              placeholder="*******"
              minLength={8}
              required
            />
          </div>

          <div className={styles.buttons}>
            <Button type="overview">Cancel</Button>
            <Button type="continue" onClick={handleEmailPasswordSave}>
              Save
            </Button>
          </div>
        </form>
        {emailSaved && (
          <div
            style={{
              color: "red",
              marginTop: "10px",
              fontSize: "1.5rem",
            }}
          >
            Please complete your Password info.
          </div>
        )}
        {!emailSaved && email && oldPass && newPass && confNewPass && (
          <div
            style={{
              color: "green",
              marginTop: "10px",
              fontSize: "2rem",
            }}
          >
            ✔.
          </div>
        )}
      </div>
    </div>
  );
}
