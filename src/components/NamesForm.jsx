import toast from "react-hot-toast";
import { useProfile } from "../contexts/ProfileContext";
import styles from "../pages/Profile.module.css";
import Button from "./Button";
import { useState, useEffect } from "react";

export function NamesForm({ fullName, profileImg, email, password }) {
  const { updateProfileInfo } = useProfile();
  const [newFullName, setNewFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    console.log("Updated FullName in props:", fullName);
  }, [fullName]);
  const handleCancelClick = (e) => {
    e.preventDefault();
    setNewFullName("");
    setNewPassword("");
    toast.error("update Profile data canceled!");
  };
  const handleSaveClick = async (e) => {
    e.preventDefault();
    e.preventDefault();
    console.log("Current newFullName:", newFullName); // Check newFullName before updateProfileInfo
    console.log("Current fullName prop:", fullName); // Check fullName prop passed to NamesForm
    const passwordEntered = newPassword.trim() !== "";

    if (!passwordEntered) {
      toast.error("Please provide a new password");
      return;
    }

    const updatedData = {
      fullName,
      email,
      password: passwordEntered ? newPassword : password,
      profileImg,
    };

    try {
      const response = await updateProfileInfo(updatedData);
      if (response.success) {
        toast.success("Profile updated successfully");
        // Reset form fields
        setNewFullName("");
        setNewPassword("");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };
  return (
    <div className={styles.form}>
      <form>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <span id="fullName" className={styles.fullNameDisplay}>
            {fullName}
          </span>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <span id="email">{email}</span>
        </div>

        {/* <div>
          <label htmlFor="nameNew">Update Your Name:</label>
          <input
            type="text"
            id="nameNew"
            name="nameNew"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
            required
          />
        </div> */}

        <div>
          <label htmlFor="curPass">Update Your Password:</label>
          <input
            type="password"
            id="curPass"
            name="curPass"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <Button type="continue" onClick={handleSaveClick}>
          Save
        </Button>
        <Button type="overview" onClick={handleCancelClick}>
          Cancel
        </Button>
      </form>
    </div>
  );
}
