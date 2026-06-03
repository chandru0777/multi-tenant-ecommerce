import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

function AddProduct() {

  const { token } = useAuth();

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [image, setImage] =
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
            "http://localhost:8000/api/products",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({

                name,

                description,

                price:
                  Number(price),

                category,

                stock:
                  Number(stock),

                image,

              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          alert(data.message);

          return;

        }

        alert(
          "Product added successfully"
        );

        navigate(
          "/vendor/products"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Something went wrong"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <MainLayout>

      <div
        className="
          max-w-3xl
          mx-auto
          mt-10
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
              text-4xl
              font-extrabold
              mb-8
            "
          >
            Add Product
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              placeholder="Product Name"
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

            <textarea
              rows="4"
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
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

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(
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

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(
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

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) =>
                setStock(
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

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) =>
                setImage(
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
                transition
              "
            >

              {
                loading
                  ? "Adding Product..."
                  : "Add Product"
              }

            </button>

          </form>

        </div>

      </div>

    </MainLayout>

  );

}

export default AddProduct;