import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home"
import Category from "../pages/Category";
import ProductDetails from "../pages/ProductDetails" 
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";
import SearchResults from "../pages/SearchResults";
import MyOrders from "../pages/MyOrders";
import VendorDashboard from "../pages/VendorDashboard";
import VendorProducts from "../pages/VendorProducts";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";



function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/category/:categoryName"
          element={<Category />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/search/:query"
          element={<SearchResults />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/checkout"
          element={<Checkout />}
        />
        <Route
            path="/my-orders"
            element={<MyOrders />}
        />
        <Route
            path="/vendor"
            element={
              <VendorDashboard />
            }
          />

          <Route
            path="/vendor/products"
            element={
              <VendorProducts/>
            }
            />

             <Route

              path="/vendor/add-product"

              element={
                <AddProduct/>
              }

              />
              <Route

              path="/vendor/edit-product/:id"
              element={
                <EditProduct/>
              }
              />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;