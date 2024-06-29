import toast from "react-hot-toast";
import { useProfile } from "../contexts/ProfileContext";
import { useEffect, useState } from "react";
import styles from "../pages/Profile.module.css";
import Button from "./Button";

export function NamesForm() {
  const {
    updateProfileInfo,
    fetchProfileData,
    fullName,
    email,
    password,
    profileImg,
  } = useProfile();
  const [newPassword, setNewPassword] = useState("");
  useEffect(() => {
    // Clear newPassword when the component mounts
    setNewPassword("");
  }, []);
  const handleCancelClick = (e) => {
    e.preventDefault();
    setNewPassword("");
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const passwordEntered = newPassword.trim() !== "";

    if (!passwordEntered) {
      toast.error("Please provide a new password");
      return;
    }

    const updatedData = {
      password: passwordEntered ? newPassword : password,
    };

    if (passwordEntered) {
      updatedData.password = newPassword;
    }

    try {
      const response = await updateProfileInfo(updatedData);
      if (response.success) {
        toast.success("Password updated successfully");

        setNewPassword("");
        const updatedProfile = await fetchProfileData();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
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
