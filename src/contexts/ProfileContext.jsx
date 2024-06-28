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
  // Function to update profile data
  const updateProfileInfo = async (updatedData) => {
    const url = "https://mutemotion.onrender.com/api/profile";
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
        const data = await response.json();
        // Update state with new data if needed
        setFullName(data.fullname);
        setEmail(data.email);
        setPhone(data.phoneNumber);
        setProfilePicture(data.profileImg || "./person.png");
        console.log("Profile updated successfully:", data);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error; // Rethrow error to handle in components
    }
  };


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
          setPhone(data.phoneNumber || "");
          setProfilePicture(data.profileImg || "./person.png");
          console.log(data);
        } else {
          throw new Error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

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

    if (token) {
      fetchProfileData();
      fetchNotification();
    }
  }, [token]);

  return (
    <ProfileContext.Provider
      value={{
        fullName,
        email,
        phone,
        setPhone,
        profilePicture,
        setFullName,
        setEmail,
        setProfilePicture,
        notificationMessage,
        
        password,
        setPassword,
        updateProfileInfo,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
