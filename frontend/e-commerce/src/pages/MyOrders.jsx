import {  useEffect,useState} from "react";

import MainLayout from "../layouts/MainLayout";

import {  useAuth} from "../context/AuthContext";

function MyOrders() {

  const { user } =
    useAuth();

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const response =
            await fetch(

`http://localhost:8000/api/order/${user._id}`

            );

          const data =
            await response.json();

          setOrders(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    if (user) {

      fetchOrders();

    }

  }, [user]);

  if (loading) {

    return (

      <MainLayout>

        <h1
          className="
            text-center
            py-20
            text-3xl
            font-bold
          "
        >
          Loading Orders...
        </h1>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="mt-8">

        <h1
          className="
            text-4xl
            font-extrabold
            mb-10
          "
        >
          My Orders
        </h1>

        {

          orders.length === 0

            ? (

              <div
                className="
                  text-center
                  py-20
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  No Orders Found
                </h2>

              </div>

            )

            : (

              <div
                className="
                  space-y-6
                "
              >

                {

                  orders.map(
                    (order) => (

                      <div

                        key={order._id}

                        className="
                          bg-white
                          border
                          rounded-3xl
                          p-6
                          shadow-sm
                        "
                      >

                        <div
                          className="
                            flex
                            justify-between
                            mb-4
                          "
                        >

                          <div>

                            <p
                              className="
                                font-bold
                              "
                            >
                              Order ID
                            </p>

                            <p
                              className="
                                text-gray-500
                                text-sm
                              "
                            >
                              {order._id}
                            </p>

                          </div>

                          <div>

                            <span
                              className="
                                bg-yellow-100
                                text-yellow-700
                                px-4
                                py-2
                                rounded-full
                                font-bold
                              "
                            >
                              {order.status}
                            </span>

                          </div>

                        </div>

                        <div
                          className="
                            space-y-4
                          "
                        >

                          {

                            order.items.map(
                              (item) => (

                                <div

                                  key={
                                    item._id
                                  }

                                  className="
                                    flex
                                    gap-4
                                    items-center
                                  "
                                >

                                  <img

                                    src={
                                      item
                                      .product
                                      .image
                                    }

                                    alt={
                                      item
                                      .product
                                      .name
                                    }

                                    className="
                                      w-20
                                      h-20
                                      object-cover
                                      rounded-xl
                                    "
                                  />

                                  <div>

                                    <h3
                                      className="
                                        font-bold
                                      "
                                    >
                                      {
                                        item
                                        .product
                                        .name
                                      }
                                    </h3>

                                    <p>
                                      Qty:
                                      {
                                        item
                                        .quantity
                                      }
                                    </p>

                                  </div>

                                </div>

                              )
                            )

                          }

                        </div>

                        <div
                          className="
                            mt-6
                            flex
                            justify-between
                          "
                        >

                          <span
                            className="
                              font-bold
                            "
                          >
                            Total
                          </span>

                          <span
                            className="
                              text-indigo-600
                              font-extrabold
                            "
                          >
                            ₹
                            {
                              order
                              .totalPrice
                            }
                          </span>

                        </div>

                      </div>

                    )
                  )

                }

              </div>

            )

        }

      </div>

    </MainLayout>

  );

}

export default MyOrders;