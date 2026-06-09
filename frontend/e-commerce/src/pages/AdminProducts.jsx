import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

function AdminProducts() {
  const { token } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setProducts(
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

  const deleteProduct = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <MainLayout>
      <div className="mt-8">

        <div className="mb-8">
          <h1 className="text-4xl font-extrabold">
            Manage Products
          </h1>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            border
            rounded-2xl
            p-3
            mb-6
          "
        />

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-5
            "
          >
            {filteredProducts.map(
              (product) => (
                <div
                  key={product._id}
                  className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-sm
                  "
                >
                  <img
                    src={`${product.image}?w=900&q=80`}
                    alt={product.name}
                    loading="lazy"
                    className="
                    h-56
                    w-full
                    object-cover
                    "
                  />

                  <div className="p-4">

                    <h3 className="font-bold">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {
                        product.store
                          ?.name
                      }
                    </p>

                    <p className="font-bold mt-2">
                      ₹ {product.price}
                    </p>

                    <p className="text-sm text-gray-500">
                      Stock:
                      {product.stock}
                    </p>

                    <button
                      onClick={() =>
                        deleteProduct(
                          product._id
                        )
                      }
                      className="
                        w-full
                        mt-4
                        bg-red-600
                        text-white
                        py-2
                        rounded-xl
                      "
                    >
                      Delete
                    </button>

                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default AdminProducts;