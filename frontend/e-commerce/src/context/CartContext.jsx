import { createContext, useState } from "react";

// Context create pannrom
export const CartContext = createContext();

function CartProvider({ children }) {

  // Cart items store pannrom
  const [cartItems, setCartItems] = useState([]);

  // Add to cart function
const addToCart = (product, qty = 1) => {

  const existingProduct = cartItems.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {

    const updatedCart = cartItems.map((item) =>

      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + qty
          }
        : item

    );

    setCartItems(updatedCart);

  } else {

    setCartItems([
      ...cartItems,
      {
        ...product,
        quantity: qty
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

  const increaseQuantity = (id) => {

  const updatedCart = cartItems.map((item) =>

    item.id === id
      ? {
          ...item,
          quantity: item.quantity + 1
        }
      : item

  );

  setCartItems(updatedCart);

};

const decreaseQuantity = (id) => {

  const updatedCart = cartItems.map((item) =>

    item.id === id
      ? {
          ...item,
          quantity:
            item.quantity > 1
              ? item.quantity - 1
              : 1
        }
      : item

  );

  setCartItems(updatedCart);

};

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
      }}
    >

      {children}

    </CartContext.Provider>

  );
}

export default CartProvider;