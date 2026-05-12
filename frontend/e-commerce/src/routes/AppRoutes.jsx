import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home"
import Category from "../pages/Category";
import ProductDetails from "../pages/ProductDetails" 
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/category/:name"
          element={<Category />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;