import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

function Signup() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const navigate =
    useNavigate();

  // Signup Function
  const handleSignup =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      setError("");

      try {

        const response =
          await fetch(

"http://localhost:8000/api/auth/register",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                name,
                email,
                password,

              }),

            }

          );

        const data =
          await response.json();

        // Backend Error
        if (!response.ok) {

          setError(
            data.message
          );

          setLoading(false);

          return;

        }

        // Save Token
        localStorage.setItem(
          "token",
          data.token
        );

        // Save User
        localStorage.setItem(
          "user",

          JSON.stringify(
            data.user
          )

        );
        console.log("Signup Success");
        // Navigate Home
        navigate("/");

      } catch (error) {

        console.log(error);

        setError(
          "Something went wrong"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
        px-5
      "
    >

      <form

        onSubmit={handleSignup}

        className="
          bg-white
          shadow-sm
          border
          border-gray-100
          rounded-3xl
          p-10
          w-full
          max-w-md
        "
      >

        <h1
          className="
            text-4xl
            font-extrabold
            text-gray-900
            mb-8
            text-center
          "
        >
          Create Account
        </h1>

        <div className="space-y-5">

          {/* Error */}
          {
            error && (

              <p
                className="
                  text-red-500
                  text-sm
                  text-center
                "
              >
                {error}
              </p>

            )
          }

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"

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
              focus:border-indigo-500
            "
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(
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
              focus:border-indigo-500
            "
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(
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
              focus:border-indigo-500
            "
          />

          {/* Button */}
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
                ? "Creating Account..."
                : "Signup"
            }

          </button>

        </div>

        {/* Login Link */}
        <p
          className="
            text-center
            text-sm
            text-gray-500
            mt-6
          "
        >

          Already have an account?

          <Link
            to="/login"

            className="
              text-indigo-600
              font-semibold
              ml-1
            "
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );

}

export default Signup;