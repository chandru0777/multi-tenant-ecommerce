import { createContext, useState } from "react";

// Context create pannrom
export const CartContext = createContext();

function CartProvider({ children }) {

  // Cart items store pannrom
  const [cartItems, setCartItems] = useState([]);

  // Add to cart function
  const addToCart = (product) => {

    // Product already iruka check pannrom
    const existingProduct = cartItems.find(
      (item) => item.id === product.id
    );

    // Already irundha quantity increase
    if (existingProduct) {

      const updatedCart = cartItems.map((item) =>

        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item

      );

      setCartItems(updatedCart);

    } else {

      // New product add pannrom
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1
        }
      ]);

    }

  };

  // Remove product
  const removeFromCart = (id) => {

    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    setCartItems(updatedCart);

  };

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart
      }}
    >

      {children}

    </CartContext.Provider>

  );
}

export default CartProvider;