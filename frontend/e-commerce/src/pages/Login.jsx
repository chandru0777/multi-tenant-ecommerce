import {
  useContext,
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  // Submit
  const handleSubmit = (e) => {

    e.preventDefault();

    const success =
      login(email, password);

    if (success) {

      navigate("/");

    } else {

      setError(
        "Invalid email or password"
      );

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
        onSubmit={handleSubmit}
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
          Login
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
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

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
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

          {error && (

            <p className="text-red-500 text-sm">
              {error}
            </p>

          )}

          <button
            type="submit"
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
            Login
          </button>

        </div>

        <p
          className="
            text-center
            text-sm
            text-gray-500
            mt-6
          "
        >
          Don’t have an account?

          <Link
            to="/signup"
            className="
              text-indigo-600
              font-semibold
              ml-1
            "
          >
            Signup
          </Link>

        </p>

      </form>

    </div>

  );
}

export default Login;