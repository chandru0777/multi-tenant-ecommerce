import MainLayout
from "../layouts/MainLayout";

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