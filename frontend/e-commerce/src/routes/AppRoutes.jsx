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
import ProtectedRoute from "../routes/ProtectedRoute";
import VendorRoute from "../routes/VendorRoute";
import AdminRoute from "../routes/AdminRoute";


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

       <Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
/>

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

      <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
            path="/my-orders"
            element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
            path="/vendor"
            element={
              <ProtectedRoute>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor/products"
            element={
              <ProtectedRoute>
                <VendorProducts/>
              </ProtectedRoute>
            }
            />

             <Route

              path="/vendor/add-product"

              element={
                <ProtectedRoute>
                  <AddProduct/>
                </ProtectedRoute>
              }

              />
              <Route

              path="/vendor/edit-product/:id"
              element={
                <ProtectedRoute>
                  <EditProduct/>
                </ProtectedRoute>
              }
              />
              <Route
              path="/vendor/orders"
              element={
               <ProtectedRoute>
                 <VendorOrders />
               </ProtectedRoute>
              }
            />
            <Route
            path="/admin/users"
            element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
          />

          <Route
            path="/admin/products"
            element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
          />

          <Route
          path ="/admin/orders"
          element={
          <ProtectedRoute>
            <AdminOrders/>
          </ProtectedRoute>
        }
          />

          <Route
            path="/admin"
            element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
          />

          <Route
            path="/vendor/create-store"
            element={
            <ProtectedRoute>
              <CreateStore />
            </ProtectedRoute>
          }
          />

          <Route
            path="/vendor/store"
            element={
            <ProtectedRoute>
              <MyStore />
            </ProtectedRoute>
          }
          />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;