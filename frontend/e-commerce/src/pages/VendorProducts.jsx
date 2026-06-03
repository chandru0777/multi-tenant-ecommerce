import {useEffect,useState} from "react";

import MainLayout from "../layouts/MainLayout";

import { useAuth} from "../context/AuthContext";

import { Link } from "react-router-dom";

function VendorProducts() {

  const {
    token
  } = useAuth();

  const [products,
  setProducts] =
  useState([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts =
  async () => {

    try {

      const response =
      await fetch(

"http://localhost:8000/api/products/vendor/my-products",

      {

        headers: {

          Authorization:
`Bearer ${token}`

        }

      }

      );

      const data =
      await response.json();

      setProducts(data);

    }

    catch(error){

      console.log(error);

    }

  };

  const handleDelete =
async (productId) => {

  const confirmDelete =
    window.confirm(
      "Delete this product?"
    );

  if (!confirmDelete)
    return;

  try {

    const response =
      await fetch(

`http://localhost:8000/api/products/${productId}`,

        {

          method: "DELETE",

          headers: {

            Authorization:
              `Bearer ${token}`

          }

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
      "Product deleted successfully"
    );

    fetchProducts();

  }

  catch(error){

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
        My Products
      </h1>

      {
        products.length === 0 ?

        (

          <h2>
            No Products Found
          </h2>

        )

        :

        (

          <div
          className="
          grid
          grid-cols-4
          gap-6
          "
          >

            {

              products.map(
              (product)=>(

                <div
                key={product._id}
                className="
                bg-white
                p-4
                rounded-2xl
                "
                >

                  <img
                  src={
                    product.image
                  }
                  alt={
                    product.name
                  }
                  />

                  <h3>
                    {
                      product.name
                    }
                  </h3>

                  <p>
                    ₹
                    {
                      product.price
                    }
                  </p>

                </div>

              )
              )

            }

            <div className="flex gap-3 mt-4">

            <Link
                to={`/vendor/edit-product/${product._id}`}
                className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-xl
                "
            >
                Edit
            </Link>

            <button
                onClick={() =>
                handleDelete(
                    product._id
                )
                }
                className="
                bg-red-600
                text-white
                px-4
                py-2
                rounded-xl
                "
            >
                Delete
            </button>

            </div>

          </div>

        )

      }

    </MainLayout>

  );

}

export default VendorProducts;