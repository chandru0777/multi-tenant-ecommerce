import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { CartContext } from "../context/CartContext";

function Checkout() {

  const { cartItems } = useContext(CartContext);

  const location = useLocation();

  // Buy Now Product
  const buyNowProduct =
    location.state?.buyNowProduct;

  // Final Checkout Items
  const checkoutItems = buyNowProduct
    ? [buyNowProduct]
    : cartItems;

  const [paymentMethod, setPaymentMethod] =
    useState("upi");

  // Total Price
  const totalPrice = checkoutItems.reduce(

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
          Checkout
        </h1>

        {checkoutItems.length === 0 ? (

          <div className="text-center py-28">

            <h2 className="text-3xl font-bold text-gray-700">
              No Products in Checkout
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

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-8">

              {/* Address */}
              <div
                className="
                  bg-white
                  rounded-3xl
                  shadow-sm
                  border
                  border-gray-100
                  p-7
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-gray-800
                    mb-5
                  "
                >
                  Delivery Address
                </h2>

                <div className="space-y-3">

                  <input
                    type="text"
                    placeholder="Full Name"
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-2xl
                      px-5
                      py-4
                      outline-none
                      focus:border-indigo-500
                    "
                  />

                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-2xl
                      px-5
                      py-4
                      outline-none
                      focus:border-indigo-500
                    "
                  />

                  <textarea
                    rows="4"
                    placeholder="Full Address"
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-2xl
                      px-5
                      py-4
                      outline-none
                      focus:border-indigo-500
                    "
                  />

                </div>

              </div>

              {/* Payment Methods */}
              <div
                className="
                  bg-white
                  rounded-3xl
                  shadow-sm
                  border
                  border-gray-100
                  p-7
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-gray-800
                    mb-6
                  "
                >
                  Payment Method
                </h2>

                <div className="space-y-4">

                  {/* UPI */}
                  <div
                    onClick={() =>
                      setPaymentMethod("upi")
                    }
                    className={`
                      border
                      rounded-2xl
                      p-5
                      cursor-pointer
                      transition
                      ${
                        paymentMethod === "upi"
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-gray-200"
                      }
                    `}
                  >

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        checked={paymentMethod === "upi"}
                        readOnly
                      />

                      <h3 className="font-bold text-lg">
                        UPI Payment
                      </h3>

                    </div>

                    {paymentMethod === "upi" && (

                      <div className="mt-5">

                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DummyUPIPayment"
                          alt="QR Code"
                          className="w-40 h-40"
                        />

                        <p className="text-sm text-gray-500 mt-3">
                          Scan this QR using any UPI app
                        </p>

                      </div>

                    )}

                  </div>

                  {/* Card */}
                  <div
                    onClick={() =>
                      setPaymentMethod("card")
                    }
                    className={`
                      border
                      rounded-2xl
                      p-5
                      cursor-pointer
                      transition
                      ${
                        paymentMethod === "card"
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-gray-200"
                      }
                    `}
                  >

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        checked={paymentMethod === "card"}
                        readOnly
                      />

                      <h3 className="font-bold text-lg">
                        Debit / Credit Card
                      </h3>

                    </div>

                    {paymentMethod === "card" && (

                      <div className="space-y-4 mt-5">

                        <input
                          type="text"
                          placeholder="Card Number"
                          className="
                            w-full
                            border
                            border-gray-200
                            rounded-2xl
                            px-5
                            py-4
                            outline-none
                          "
                        />

                        <div className="grid grid-cols-2 gap-4">

                          <input
                            type="text"
                            placeholder="Expiry"
                            className="
                              border
                              border-gray-200
                              rounded-2xl
                              px-5
                              py-4
                              outline-none
                            "
                          />

                          <input
                            type="text"
                            placeholder="CVV"
                            className="
                              border
                              border-gray-200
                              rounded-2xl
                              px-5
                              py-4
                              outline-none
                            "
                          />

                        </div>

                      </div>

                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div
              className="
                bg-white
                rounded-3xl
                shadow-sm
                border
                border-gray-100
                p-7
                h-fit
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                  text-gray-800
                  mb-7
                "
              >
                Order Summary
              </h2>

              {/* Products */}
              <div className="space-y-5">

                {checkoutItems.map((item) => (

                  <div
                    key={item.id}
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        w-20
                        h-20
                        object-cover
                        rounded-2xl
                      "
                    />

                    <div className="flex-1">

                      <h3 className="font-bold text-gray-800">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <span className="font-bold">
                      ₹ {item.price * item.quantity}
                    </span>

                  </div>

                ))}

              </div>

              <hr className="my-7" />

              {/* Total */}
              <div className="space-y-4">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Delivery
                  </span>

                  <span className="text-green-600 font-bold">
                    Free
                  </span>

                </div>

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
                      text-3xl
                      font-extrabold
                      text-indigo-600
                    "
                  >
                    ₹ {totalPrice}
                  </span>

                </div>

                <button
                  className="
                    w-full
                    mt-6
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    py-4
                    rounded-2xl
                    font-bold
                    transition
                  "
                >
                  Place Order
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </MainLayout>

  );
}

export default Checkout;