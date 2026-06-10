import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

function AdminOrders() {

  const { token } = useAuth();

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

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
            "http://localhost:8000/api/admin/orders",
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

      } finally {

        setLoading(false);

      }

    };

  return (

    <MainLayout>

      <div className="mt-8 mb-16">

        <div className="mb-8">

          <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-1">
            Admin Panel
          </p>

          <h1 className="text-4xl font-extrabold text-gray-900">
            Manage Orders
          </h1>

        </div>

        {loading ? (

          <h2>Loading...</h2>

        ) : orders.length === 0 ? (

          <h2>No Orders Found</h2>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="
                bg-white
                rounded-3xl
                border
                border-gray-100
                p-6
                shadow-sm
                "
              >

                <div className="flex justify-between items-start mb-4">

                  <div>

                    <h2 className="font-bold text-lg">
                      Order #
                      {order._id.slice(-6)}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {order.user?.name}
                    </p>

                    <p className="text-gray-500 text-sm">
                      {order.user?.email}
                    </p>

                  </div>

                  <span
                    className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-bold

                    ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                    `}
                  >

                    {order.status}

                  </span>

                </div>

                <div className="space-y-3">

                  {order.items.map((item) => (

                    <div
                      key={item._id}
                      className="
                      flex
                      items-center
                      gap-4
                      border-b
                      border-gray-100
                      pb-3
                      "
                    >

                      <img
                        src={
                          item.product?.image
                        }
                        alt={
                          item.product?.name
                        }
                        loading="lazy"
                        className="
                        w-16
                        h-16
                        rounded-xl
                        object-cover
                        "
                      />

                      <div className="flex-1">

                        <h3 className="font-semibold">
                          {
                            item.product?.name
                          }
                        </h3>

                        <p className="text-sm text-gray-500">
                          Qty:
                          {item.quantity}
                        </p>

                      </div>

                      <span className="font-bold">
                        ₹
                        {item.product?.price}
                      </span>

                    </div>

                  ))}

                </div>

                <div className="flex justify-between mt-5">

                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="font-bold text-indigo-600">
                    ₹
                    {order.totalPrice}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </MainLayout>

  );

}

export default AdminOrders;