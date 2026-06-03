import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

function VendorDashboard() {

  return (

    <MainLayout>

      <div className="mt-8">

        <h1
          className="
            text-4xl
            font-extrabold
          "
        >
          Vendor Dashboard
        </h1>

         <Link
            to="/vendor/add-product"
            className="
                inline-block
                mt-6
                bg-indigo-600
                text-white
                px-5
                py-3
                rounded-xl
            "
            >
            Add Product
            </Link>

            <Link
                to="/vendor/products"
                className="
                    bg-indigo-600
                    text-white
                    px-5
                    py-3
                    rounded-2xl
                    inline-block
                "
                >
                Manage Products
                </Link>

        <div
          className="
            mt-8
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          <div
            className="
              bg-white
              p-6
              rounded-3xl
              shadow-sm
            "
          >
            <h2
              className="
                text-xl
                font-bold
              "
            >
              Products
            </h2>

            <p
              className="
                text-gray-500
                mt-2
              "
            >
              Manage products
            </p>

          </div>

          <div
            className="
              bg-white
              p-6
              rounded-3xl
              shadow-sm
            "
          >
            <h2
              className="
                text-xl
                font-bold
              "
            >
              Orders
            </h2>

            <p
              className="
                text-gray-500
                mt-2
              "
            >
              Manage orders
            </p>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default VendorDashboard;