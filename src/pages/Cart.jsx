import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Cart.module.css";
import Footer from "../components/Footer";
import EmptyCart from "../components/EmptyCart";
import OrderSummery from "../components/OrderSummery";
import Payment from "../components/Payment";
import CartCard from "../components/CartCard";
import { useAuth } from "../contexts/Auth";

function Cart() {
  const [items, setItems] = useState([]);
  const [isPaying, setIsPaying] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await fetch(
          "https://mutemotion.onrender.com/api/cart",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setItems(data);
        console.log("Cart Items:", data);
      } catch (error) {
        console.error("There was an error fetching the cart items!", error);
      }
    }

    fetchCartItems();
  }, [token]); // Added token to dependency array
  const handlePaymentSuccess = () => {
    // Remove the purchased item from cart items
    const updatedItems = items.filter((item) => item._id !== selectedItem._id);
    setItems(updatedItems);

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
        <PageNav />

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
          {items.length === 0 && <EmptyCart />}
          {items.length > 0 && (
            <>
              <h1>Checkout</h1>
              <div>
                <div className={styles.cartList}>
                  {!isPaying &&
                    items.map((item) => (
                      <CartCard
                        key={item._id}
                        item={item}
                        onTitleClick={handleTitleClick}
                      />
                    ))}
                  {isPaying && (
                    <Payment
                      item={selectedItem}
                      onPaymentSuccess={handlePaymentSuccess}
                    />
                  )}
                </div>
                {selectedItem && (
                  <OrderSummery item={selectedItem} onClick={handlePaying} />
                )}
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
