import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { useAuth } from "../context/AuthContext";

function AdminUsers() {

  const { token } = useAuth();

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (token) {

      fetchUsers();

    }

  }, [token]);

  const fetchUsers =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:8000/api/admin/users",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const data =
          await response.json();

        setUsers(
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

    const updateRole =
async (
  userId,
  role
) => {

  try {

    const response =
      await fetch(

`http://localhost:8000/api/admin/users/${userId}/role`,

        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`

          },

          body: JSON.stringify({
            role
          })

        }

      );

    const data =
      await response.json();

    if (!response.ok) {

      alert(data.message);

      return;

    }

    fetchUsers();

  } catch (error) {

    console.log(error);

  }

};

  return (

    <MainLayout>

      <div className="mt-8 mb-16">

        {/* Header */}

        <div className="mb-8">

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
            Manage Users

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

        {/* Loading */}

        {

          loading

          ?

          (

            <div
              className="
              bg-white
              rounded-3xl
              p-10
              text-center
              "
            >

              Loading Users...

            </div>

          )

          :

          (

            <div
              className="
              bg-white
              rounded-3xl
              border
              border-gray-100
              shadow-sm
              overflow-hidden
              "
            >

              <div
                className="
                px-6
                py-5
                border-b
                border-gray-100
                "
              >

                <h2
                  className="
                  text-lg
                  font-bold
                  "
                >
                  Users
                </h2>

              </div>

              <div className="overflow-x-auto">

                <table
                  className="
                  w-full
                  text-sm
                  "
                >

                  <thead>

                    <tr
                      className="
                      border-b
                      border-gray-100
                      "
                    >

                      <th className="text-left px-6 py-4">
                        Name
                      </th>

                      <th className="text-left px-6 py-4">
                        Email
                      </th>

                      <th className="text-left px-6 py-4">
                        Role
                      </th>

                      <th className="text-left px-6 py-4">
                        Joined
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {

                      users.map((user) => (

                        <tr
                          key={user._id}
                          className="
                          border-b
                          border-gray-50
                          hover:bg-gray-50
                          "
                        >

                          <td className="px-6 py-4 font-medium">

                            {user.name}

                          </td>

                          <td className="px-6 py-4 text-gray-500">

                            {user.email}

                          </td>

                          <td className="px-6 py-4">

  <select
  value={user.role}
  onChange={(e) =>
    updateRole(
      user._id,
      e.target.value
    )
  }
  className={`
    px-4
    py-2
    rounded-xl
    text-sm
    font-semibold
    border
    outline-none
    cursor-pointer
    transition-all
    duration-200

    ${
      user.role === "admin"
        ? "bg-red-50 text-red-700 border-red-200 hover:border-red-300"
        : user.role === "vendor"
        ? "bg-indigo-50 text-indigo-700 border-indigo-200 hover:border-indigo-300"
        : "bg-green-50 text-green-700 border-green-200 hover:border-green-300"
    }

    focus:ring-4

    ${
      user.role === "admin"
        ? "focus:ring-red-100"
        : user.role === "vendor"
        ? "focus:ring-indigo-100"
        : "focus:ring-green-100"
    }
  `}
>

  <option value="customer">
    Customer
  </option>

  <option value="vendor">
    Vendor
  </option>

  <option value="admin">
    Admin
  </option>

</select>

                          </td>

                          <td className="px-6 py-4 text-gray-500">

                            {

                              new Date(
                                user.createdAt
                              ).toLocaleDateString()

                            }

                          </td>

                        </tr>

                      ))

                    }

                  </tbody>

                </table>

              </div>

            </div>

          )

        }

      </div>

    </MainLayout>

  );

}

export default AdminUsers;