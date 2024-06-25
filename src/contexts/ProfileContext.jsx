import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./Auth";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [notificationMessage, setNotificationMessage] = useState([]);
  const [profilePicture, setProfilePicture] = useState("./person.png");
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
         setProfilePicture(data.profilePicture || "./person.png");
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
        profilePicture,
        setFullName,
        setEmail,
        setProfilePicture,
        notificationMessage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
