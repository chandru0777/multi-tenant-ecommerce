import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProductCard from "../components/ProductCard";

function Category() {

  const { categoryName } = useParams();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchCategoryProducts =
      async () => {

        try {

          const response =
            await fetch(

`http://localhost:8000/api/products/category/${categoryName}`

            );

          const data =
            await response.json();

          // MongoDB _id → id
          const formattedProducts =
            data.map((product) => ({

              ...product,

              id: product._id,

            }));

          setProducts(
            formattedProducts
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchCategoryProducts();

  }, [categoryName]);

  // Loading UI
  if (loading) {

    return (

      <MainLayout>

        <div
          className="
            flex
            justify-center
            items-center
            py-40
          "
        >

          <h1
            className="
              text-3xl
              font-bold
              text-indigo-600
            "
          >
            Loading Products...
          </h1>

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      {/* Banner */}
      <section
        className="
          mt-8
          rounded-3xl
          overflow-hidden
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          px-8
          py-14
          text-white
        "
      >

        <p
          className="
            text-sm
            uppercase
            tracking-widest
            mb-2
            text-indigo-100
          "
        >
          Explore Category
        </p>

        <h1
          className="
            text-4xl
            font-black
            capitalize
          "
        >
          {categoryName}
        </h1>

        <p
          className="
            mt-3
            text-indigo-100
            max-w-xl
          "
        >
          Discover premium products,
          exciting offers, and trending
          collections in {categoryName}.
        </p>

      </section>

      {/* Products */}
      <section className="mt-12">

        <div
          className="
            flex
            items-center
            justify-between
            mb-8
          "
        >

          <div>

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-gray-400
                mb-1
              "
            >
              Category Products
            </p>

            <h2
              className="
                text-3xl
                font-extrabold
                capitalize
                text-gray-900
              "
            >
              {categoryName}
            </h2>

          </div>

          <span
            className="
              text-sm
              font-semibold
              text-indigo-600
              bg-indigo-50
              px-4
              py-2
              rounded-xl
            "
          >
            {products.length} Products
          </span>

        </div>

        {/* Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
          "
        >

          {products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </section>

    </MainLayout>

  );

}

export default Category;