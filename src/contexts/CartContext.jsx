import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./Auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, logout } = useAuth();

  const fetchCartItems = async () => {
    try {
      const response = await fetch("https://mutemotion.onrender.com/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is available
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("There was an error fetching the cart items!", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const itemsNumber = items.length;
  useEffect(() => {
    if (token) {
      fetchCartItems(); // Fetch cart items when component mounts and token is available
    }
  }, [token]);
  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        isLoading,
        setIsLoading,
        itemsNumber,
        fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
