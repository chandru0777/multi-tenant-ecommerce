import {
  useContext,
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Signup() {

  const navigate = useNavigate();

  const { signup } =
    useContext(AuthContext);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  // Input change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // Submit
  const handleSubmit = (e) => {

    e.preventDefault();

    signup(formData);

    navigate("/");

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
          Create Account
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
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
            Signup
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