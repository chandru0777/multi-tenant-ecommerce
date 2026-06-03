import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import MainLayout
from "../layouts/MainLayout";

import {
  useAuth
} from "../context/AuthContext";

function EditProduct() {

  const { id } =
    useParams();

  const { token } =
    useAuth();

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category,
    setCategory] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [image, setImage] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct =
    async () => {

      try {

        const response =
          await fetch(

`http://localhost:8000/api/products/${id}`

          );

        const data =
          await response.json();

        setName(data.name);

        setDescription(
          data.description
        );

        setPrice(
          data.price
        );

        setCategory(
          data.category
        );

        setStock(
          data.stock
        );

        setImage(
          data.image
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const response =
          await fetch(

`http://localhost:8000/api/products/${id}`,

            {

              method: "PUT",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`

              },

              body: JSON.stringify({

                name,

                description,

                price,

                category,

                stock,

                image

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
          "Product updated successfully"
        );

        navigate(
          "/vendor/products"
        );

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
          max-w-3xl
          mx-auto
          mt-10
        "
      >

        <div
          className="
            bg-white
            p-8
            rounded-3xl
            shadow-sm
          "
        >

          <h1
            className="
              text-4xl
              font-bold
              mb-8
            "
          >
            Edit Product
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              value={name}
              onChange={(e)=>
                setName(
                  e.target.value
                )
              }
              placeholder="Name"
              className="
                w-full
                border
                rounded-2xl
                px-5
                py-4
              "
            />

            <textarea
              rows="4"
              value={description}
              onChange={(e)=>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Description"
              className="
                w-full
                border
                rounded-2xl
                px-5
                py-4
              "
            />

            <input
              type="number"
              value={price}
              onChange={(e)=>
                setPrice(
                  e.target.value
                )
              }
              placeholder="Price"
              className="
                w-full
                border
                rounded-2xl
                px-5
                py-4
              "
            />

            <input
              type="text"
              value={category}
              onChange={(e)=>
                setCategory(
                  e.target.value
                )
              }
              placeholder="Category"
              className="
                w-full
                border
                rounded-2xl
                px-5
                py-4
              "
            />

            <input
              type="number"
              value={stock}
              onChange={(e)=>
                setStock(
                  e.target.value
                )
              }
              placeholder="Stock"
              className="
                w-full
                border
                rounded-2xl
                px-5
                py-4
              "
            />

            <input
              type="text"
              value={image}
              onChange={(e)=>
                setImage(
                  e.target.value
                )
              }
              placeholder="Image URL"
              className="
                w-full
                border
                rounded-2xl
                px-5
                py-4
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-indigo-600
                text-white
                py-4
                rounded-2xl
                font-bold
              "
            >

              {
                loading
                ? "Updating..."
                : "Update Product"
              }

            </button>

          </form>

        </div>

      </div>

    </MainLayout>

  );

}

export default EditProduct;