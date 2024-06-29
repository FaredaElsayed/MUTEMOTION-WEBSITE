import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./Auth";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [notificationMessage, setNotificationMessage] = useState([]);
  const [profilePicture, setProfilePicture] = useState("./person.png");
  const { token } = useAuth();
  // Function to fetch profile data
  const fetchProfileData = async () => {
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
        setProfilePicture(data.profileImg || "./person.png");
        return data;
      } else {
        throw new Error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  // Function to update profile data
  const updateProfileInfo = async (updatedData) => {
    const url = "https://mutemotion.onrender.com/api/profile/password";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        // Fetch updated profile data immediately after successful update
        await fetchProfileData();
        return { success: true };
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error; // Rethrow error to handle in components
    }
  };

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
        setNotificationMessage(data);
      } else {
        throw new Error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotificationMessage([]);
    }
  }

  useEffect(() => {
    if (token) {
      fetchProfileData();
      fetchNotification();
    }
  }, [token]);

  return (
    <ProfileContext.Provider
      value={{
        fullName,
        setFullName,
        email,
        setEmail,
        phone,
        setPhone,
        password,
        setPassword,
        profilePicture,
        setProfilePicture,
        notificationMessage,
        updateProfileInfo,
        fetchProfileData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
