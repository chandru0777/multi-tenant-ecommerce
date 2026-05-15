import { useContext } from "react";

import MainLayout from "../layouts/MainLayout";

import { CartContext } from "../context/CartContext";

import { Link } from "react-router-dom";
function Cart() {

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext);

  // Total Price
  const totalPrice = cartItems.reduce(

    (total, item) =>

      total + item.price * item.quantity,

    0

  );

  return (

    <MainLayout>

      <div className="mt-8">

        <h1
          className="
            text-4xl
            font-extrabold
            text-gray-900
            mb-10
          "
        >
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (

          <div
            className="
              text-center
              py-28
            "
          >

            <h2 className="text-3xl font-bold text-gray-700">
              Your Cart is Empty
            </h2>

          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-3
              gap-10
            "
          >

            {/* Cart Products */}
            <div className="lg:col-span-2 space-y-6">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="
                    bg-white
                    rounded-3xl
                    shadow-sm
                    border
                    border-gray-100
                    p-5
                    flex
                    gap-5
                  "
                >

                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-36
                      h-36
                      object-cover
                      rounded-2xl
                    "
                  />

                  {/* Details */}
                  <div className="flex-1">

                    <h2
                      className="
                        text-2xl
                        font-bold
                        text-gray-800
                      "
                    >
                      {item.name}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {item.description}
                    </p>

                    <p
                      className="
                        text-2xl
                        font-extrabold
                        text-indigo-600
                        mt-4
                      "
                    >
                      ₹ {item.price}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-5">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-gray-100
                          text-xl
                          font-bold
                        "
                      >
                        -
                      </button>

                      <span
                        className="
                          text-lg
                          font-bold
                        "
                      >
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-gray-100
                          text-xl
                          font-bold
                        "
                      >
                        +
                      </button>

                    </div>

                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="
                      text-red-500
                      font-semibold
                      cursor-pointer
                    "
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            {/* Summary */}
            <div
              className="
                bg-white
                rounded-3xl
                shadow-sm
                border
                border-gray-100
                p-8
                h-fit
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                  text-gray-800
                  mb-8
                "
              >
                Price Summary
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Total Items
                  </span>

                  <span className="font-bold">
                    {
                      cartItems.reduce(
                        (total, item) =>
                          total + item.quantity,
                        0
                      )
                    }
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Delivery
                  </span>

                  <span className="text-green-600 font-bold">
                    Free
                  </span>

                </div>

                <hr />

                <div className="flex justify-between">

                  <span
                    className="
                      text-xl
                      font-bold
                    "
                  >
                    Total
                  </span>

                  <span
                    className="
                      text-2xl
                      font-extrabold
                      text-indigo-600
                    "
                  >
                    ₹ {totalPrice}
                  </span>

                </div>

    <Link
         to="/checkout"
         className="
         block
         w-full
         mt-6
         bg-indigo-600
         hover:bg-indigo-700
         text-white
           py-4
           rounded-2xl
          font-bold
           transition
          text-center
              "
                >
                Proceed to Checkout
          </Link>

              </div>

            </div>

          </div>

        )}

      </div>

    </MainLayout>

  );
}

export default Cart;