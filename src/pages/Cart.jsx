import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Cart.module.css";
import Footer from "../components/Footer";
import EmptyCart from "../components/EmptyCart";
import OrderSummery from "../components/OrderSummery";
import Payment from "../components/Payment";
import CartCard from "../components/CartCard";
import { useAuth } from "../contexts/Auth";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../components/Spinner";
import { FaBars, FaTimes } from "react-icons/fa";

import { useCart } from "../contexts/CartContext";

function Cart() {
  const { items, isLoading, setItems, fetchCartItems } = useCart();
  const [isPaying, setIsPaying] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { token } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, [token]);
  // useEffect(() => {
  //   async function fetchCartItems() {
  //     try {
  //       const response = await fetch(
  //         "https://mutemotion.onrender.com/api/cart",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();
  //       setItems(data);
  //       console.log("Cart Items:", data);
  //     } catch (error) {
  //       console.error("There was an error fetching the cart items!", error);
  //       logout();
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchCartItems();
  // }, [token]); // Added token to dependency array

  const handlePaymentSuccess = () => {
    // Remove the purchased item from cart items
    const updatedItems = items.filter((item) => item._id !== selectedItem._id);
    setItems(updatedItems);
    toast.success("course added to mylearning ");
    // Reset selected item
    setSelectedItem(null);
    setIsPaying(false);
  };

  function handlePaying() {
    setIsPaying(true);
  }

  const handleTitleClick = (item) => {
    setSelectedItem(item); // Set selected item when title is clicked
  };

  return (
    <>
      <div className={styles.cart}>
        <div className="menuIcon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <PageNav isMenuOpen={isMenuOpen} />
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
        {!isPaying && (
          <>
            <span>Your Cart</span>
            <span className={styles.span}>
              {items.length} items in your cart
            </span>{" "}
            {/* Changed items to items.length */}
          </>
        )}

        <main>
          {isLoading ? (
            <Spinner /> // Display the spinner while loading
          ) : (
            <>
              {items.length === 0 && <EmptyCart />}
              {items.length > 0 && (
                <>
                  <h1>Checkout</h1>
                  <div>
                    <div className={styles.cartList}>
                      {!isPaying &&
                        items.map((item, index) => (
                          <CartCard
                            key={item?._id || index}
                            item={item}
                            onTitleClick={handleTitleClick}
                          />
                        ))}
                      {isPaying && (
                        <Payment
                          item={selectedItem}
                          setIsPaying={setIsPaying}
                          onPaymentSuccess={handlePaymentSuccess}
                        />
                      )}
                    </div>
                    {selectedItem && (
                      <OrderSummery
                        item={selectedItem}
                        onClick={handlePaying}
                      />
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
