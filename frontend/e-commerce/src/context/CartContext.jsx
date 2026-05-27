import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useAuth
} from "./AuthContext";

export const CartContext =
  createContext();

function CartProvider({
  children,
}) {

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { token } =
    useAuth();

  // Fetch cart
  const fetchCart =
    async () => {

      if (!token) {

        setCartItems([]);

        setLoading(false);

        return;

      }

      try {

        const response =
          await fetch(

"http://localhost:8000/api/cart",

            {

              headers: {

                Authorization:
`Bearer ${token}`,

              },

            }

          );

        const data =
          await response.json();

        setCartItems(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  // Load cart
  useEffect(() => {

    fetchCart();

  }, [token]);

  return (

    <CartContext.Provider

      value={{

        cartItems,

        setCartItems,

        fetchCart,

        loading,

      }}

    >

      {children}

    </CartContext.Provider>

  );

}

export default CartProvider;

export const useCart =
  () => useContext(CartContext);