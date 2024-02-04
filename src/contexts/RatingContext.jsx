import { createContext, useContext, useState } from "react";

const RatingsContext = createContext();

export const useRatings = () => {
  const context = useContext(RatingsContext);
  if (!context) {
    throw new Error("useRatings must be used within a RatingsProvider");
  }
  return context;
};

export const RatingsProvider = ({ children }) => {
  const [ratings, setRatings] = useState({});
  
  const updateRating = (courseId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [courseId]: rating,
    }));
  };

  return (
    <RatingsContext.Provider value={{ ratings, updateRating }}>
      {children}
    </RatingsContext.Provider>
  );
};
