import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProductCard from "../components/ProductCard";

function SearchResults() {

  const { query } = useParams();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          const response =
            await fetch(

`http://localhost:8000/api/products/search/${query}`

            );

          const data =
            await response.json();

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

    fetchProducts();

  }, [query]);

  if (loading) {

    return (

      <MainLayout>

        <div className="py-40 text-center">

          <h1
            className="
              text-3xl
              font-bold
              text-indigo-600
            "
          >
            Searching Products...
          </h1>

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <section className="mt-10">

        <div className="mb-8">

          <p
            className="
              text-xs
              uppercase
              tracking-widest
              text-gray-400
              font-bold
              mb-2
            "
          >
            Search Results
          </p>

          <h1
            className="
              text-4xl
              font-black
              text-gray-900
            "
          >
            "{query}"
          </h1>

          <p
            className="
              mt-2
              text-gray-500
            "
          >
            {products.length} products found
          </p>

        </div>

        {products.length === 0 ? (

          <div
            className="
              py-32
              text-center
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                text-gray-700
              "
            >
              No Products Found
            </h2>

          </div>

        ) : (

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

        )}

      </section>

    </MainLayout>

  );

}

export default SearchResults;