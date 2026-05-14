import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProductCard from "../components/ProductCard";

import { products } from "../data/products";

function Category() {

  // URL category edukkrom
  const { name } = useParams();

  // Matching products filter pannrom
  const filteredProducts = products.filter(
    (product) => product.category === name
  );

  return (

    <MainLayout>

      {/* Category Heading */}
      <div className="mt-6 mb-10">

        <h1
          className="
            text-4xl
            font-extrabold
            text-gray-800
            capitalize
          "
        >
          {name} Products
        </h1>

        <p className="text-gray-500 mt-2">
          Explore trending {name} products
        </p>

      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 ? (

        <div
          className="
            text-center
            py-20
          "
        >

          <h2 className="text-3xl font-bold text-gray-700">
            No Products Found
          </h2>

        </div>

      ) : (

        /* Products Grid */
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-8
          "
        >

          {filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      )}

    </MainLayout>

  );
}

export default Category;