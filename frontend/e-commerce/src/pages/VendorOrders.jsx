import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { useAuth } from "../context/AuthContext";

function VendorOrders() {

  const { token } = useAuth();

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    if (token) {

      fetchOrders();

    }

  }, [token]);

  const fetchOrders =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:8000/api/order/vendor-orders",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const data =
          await response.json();

        setOrders(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.log(error);

      }

    };

  const updateStatus =
    async (
      orderId,
      status
    ) => {

      try {

        const response =
          await fetch(

`http://localhost:8000/api/order/${orderId}`,

            {

              method: "PUT",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`

              },

              body: JSON.stringify({
                status
              })

            }

          );

        const data =
          await response.json();

        if (!response.ok) {

          alert(data.message);

          return;

        }

        alert(
          "Status Updated"
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <MainLayout>

      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        Vendor Orders
      </h1>

      {

        orders.length === 0

          ?

          (

            <h2>
              No Orders Found
            </h2>

          )

          :

          (

            <div className="space-y-6">

              {

                orders.map((order) => (

                  <div
                    key={order._id}
                    className="
                    bg-white
                    rounded-2xl
                    p-6
                    shadow-sm
                    "
                  >

                    <div className="mb-4">

                      <h2
                        className="
                        text-xl
                        font-bold
                        "
                      >
                        Order ID:
                      </h2>

                      <p>
                        {order._id}
                      </p>

                    </div>

                    <div className="mb-4">

                      <h3
                        className="
                        font-semibold
                        "
                      >
                        Customer
                      </h3>

                      <p>
                        {order.user?.name}
                      </p>

                      <p>
                        {order.user?.email}
                      </p>

                    </div>

                    <div>

  <p className="font-bold">
    Address
  </p>

  <p className="text-sm text-gray-500">
    {order.user?.email}
  </p>

  <p className="text-sm text-gray-500">
    {order.phone}
  </p>

  <p className="text-sm text-gray-500">
    {order.shippingAddress}
  </p>

</div>

                    <div className="mb-2 mt-5">

                      <h3
                        className="
                        font-semibold
                        mb-2
                        "
                      >
                        Products
                      </h3>

                      {

                        order.items.map(
                          (item) => (

                            <div
                              key={
                                item._id
                              }
                              className="
                              flex
                              justify-between
                              py-2
                              "
                            >

                              <span>

                                {
                                  item.product
                                    ?.name
                                }

                              </span>

                              <span>

                                Qty:
                                {
                                  item.quantity
                                }

                              </span>

                            </div>

                          )
                        )

                      }

                    </div>

                    <div
                      className="
                      flex
                      justify-between
                      items-center
                      "
                    >

                      <div>

                        <p>

                          Total:

                          <strong>

                            ₹
                            {
                              order.totalPrice
                            }

                          </strong>

                        </p>

                        <p>

                          Current Status:

                          <strong>

                            {
                              order.status
                            }

                          </strong>

                        </p>

                      </div>

                      <select

                        value={
                          order.status
                        }

                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }

                        className="
                        border
                        rounded-xl
                        px-4
                        py-2
                        "

                      >

                        <option value="pending">
                          Pending
                        </option>

                        <option value="processing">
                          Processing
                        </option>

                        <option value="packed">
                          Packed
                        </option>

                        <option value="shipped">
                          Shipped
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>

                      </select>

                    </div>

                  </div>

                ))

              }

            </div>

          )

      }

    </MainLayout>

  );

}

export default VendorOrders;