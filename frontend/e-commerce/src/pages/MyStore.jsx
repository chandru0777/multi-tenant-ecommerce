import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

function MyStore() {

  const { token } = useAuth();

  const [store, setStore] =
    useState(null);

  useEffect(() => {

    fetchStore();

  }, []);

  const fetchStore =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:8000/api/store/my-store",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const data =
          await response.json();

        setStore(data);

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <MainLayout>

      <div
        className="
        max-w-2xl
        mx-auto
        mt-10
        "
      >

        <div
          className="
          bg-white
          rounded-3xl
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
            My Store
          </h1>

          {store && (

            <div
              className="
              space-y-4
              "
            >

              <div>

                <p
                  className="
                  text-sm
                  text-gray-500
                  "
                >
                  Store Name
                </p>

                <h2
                  className="
                  text-xl
                  font-bold
                  "
                >
                  {store.name}
                </h2>

              </div>

              <div>

                <p
                  className="
                  text-sm
                  text-gray-500
                  "
                >
                  Store ID
                </p>

                <p>
                  {store._id}
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </MainLayout>

  );

}

export default MyStore;