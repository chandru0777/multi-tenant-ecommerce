import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

function CreateStore() {

  const { token } = useAuth();

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const response =
          await fetch(
            "http://localhost:8000/api/store",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`
              },

              body: JSON.stringify({
                name
              })
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          alert(
            data.message
          );

          return;

        }

        alert(
          "Store created successfully"
        );

        navigate("/vendor");

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <MainLayout>

      <div
        className="
        max-w-xl
        mx-auto
        mt-16
        "
      >

        <div
          className="
          bg-white
          rounded-3xl
          shadow-sm
          border
          border-gray-100
          p-8
          "
        >

          <h1
            className="
            text-3xl
            font-extrabold
            mb-6
            "
          >
            Create Store
          </h1>

          <form
            onSubmit={
              handleSubmit
            }
            className="
            space-y-5
            "
          >

            <input
              type="text"
              placeholder="Store Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              required
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

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              py-4
              rounded-2xl
              font-bold
              "
            >

              {
                loading
                  ? "Creating..."
                  : "Create Store"
              }

            </button>

          </form>

        </div>

      </div>

    </MainLayout>

  );

}

export default CreateStore;