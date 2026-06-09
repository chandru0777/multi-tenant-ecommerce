import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function AdminDashboard() {

  const { token } = useAuth();

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    if (token) {

      fetchStats();

    }

  }, [token]);

  const fetchStats =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:8000/api/admin/dashboard-stats",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const data =
          await response.json();

        setStats(data);

      } catch (error) {

        console.log(error);

      }

    };

  const cards = [

    {
      title: "Total Users",
      value:
        stats?.totalUsers || 0,
      color:
        "from-blue-500 to-indigo-600"
    },

    {
      title: "Total Vendors",
      value:
        stats?.totalVendors || 0,
      color:
        "from-purple-500 to-violet-600"
    },

    {
      title: "Total Products",
      value:
        stats?.totalProducts || 0,
      color:
        "from-green-500 to-emerald-600"
    },

    {
      title: "Total Orders",
      value:
        stats?.totalOrders || 0,
      color:
        "from-orange-500 to-red-500"
    },

    {
      title: "Total Revenue",
      value:
        `₹${(
          stats?.totalRevenue || 0
        ).toLocaleString()}`,
      color:
        "from-pink-500 to-rose-600"
    }

  ];

  return (

    <MainLayout>

      <div className="mt-8 mb-16">

        {/* Header */}

        <div className="mb-10">

          <p
            className="
            text-xs
            font-bold
            uppercase
            tracking-widest
            text-indigo-500
            mb-1
            "
          >
            Admin Panel
          </p>

          <h1
            className="
            text-4xl
            font-extrabold
            text-gray-900
            "
          >
            Dashboard

            <span
              className="
              block
              h-1
              w-16
              rounded-full
              bg-gradient-to-r
              from-indigo-500
              to-purple-500
              mt-2
              "
            />

          </h1>

        </div>

        {/* Stats */}

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-5
          gap-5
          mb-10
          "
        >

          {

            cards.map((card) => (

              <div
                key={card.title}
                className={`
                bg-gradient-to-r
                ${card.color}
                text-white
                rounded-3xl
                p-6
                shadow-lg
                `}
              >

                <h3
                  className="
                  text-sm
                  font-medium
                  opacity-90
                  "
                >
                  {card.title}
                </h3>

                <h2
                  className="
                  text-3xl
                  font-extrabold
                  mt-2
                  "
                >
                  {card.value}
                </h2>

              </div>

            ))

          }

        </div>

        {/* Quick Actions */}

        <div
          className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          border
          border-gray-100
          "
        >

          <h2
            className="
            text-xl
            font-bold
            mb-6
            "
          >
            Quick Actions
          </h2>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            "
          >

            <Link
              to="/admin/users"
              className="
              bg-indigo-50
              hover:bg-indigo-100
              rounded-2xl
              p-6
              transition
              "
            >
              <h3 className="font-bold">
                Manage Users
              </h3>

              <p
                className="
                text-sm
                text-gray-500
                mt-2
                "
              >
                View users and update roles
              </p>

            </Link>

            <Link
              to="/admin/products"
              className="
              bg-green-50
              hover:bg-green-100
              rounded-2xl
              p-6
              transition
              "
            >
              <h3 className="font-bold">
                Manage Products
              </h3>

              <p
                className="
                text-sm
                text-gray-500
                mt-2
                "
              >
                View and delete products
              </p>

            </Link>

            <Link
              to="/admin/orders"
              className="
              bg-orange-50
              hover:bg-orange-100
              rounded-2xl
              p-6
              transition
              "
            >
              <h3 className="font-bold">
                Manage Orders
              </h3>

              <p
                className="
                text-sm
                text-gray-500
                mt-2
                "
              >
                Monitor all orders
              </p>

            </Link>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default AdminDashboard;