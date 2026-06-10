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
import VendorOrders from "../pages/VendorOrders";
import AdminUsers from "../pages/AdminUsers";
import AdminProducts from "../pages/AdminProducts";
import AdminOrders from "../pages/AdminOrders";
import AdminDashboard from "../pages/AdminDashboard";
import CreateStore from "../pages/CreateStore";
import MyStore from "../pages/MyStore";


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
              <Route
              path="/vendor/orders"
              element={
                <VendorOrders />
              }
            />
            <Route
            path="/admin/users"
            element={<AdminUsers />}
          />

          <Route
            path="/admin/products"
            element={<AdminProducts />}
          />

          <Route
          path ="/admin/orders"
          element={<AdminOrders/>}
          />

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/vendor/create-store"
            element={<CreateStore />}
          />

          <Route
            path="/vendor/store"
            element={<MyStore />}
          />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;