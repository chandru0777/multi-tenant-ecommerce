const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

const {

  placeOrder,

  getUserOrders,

  updateOrderStatus,

  placeBuyNowOrder,

  getVendorOrders,

  getVendorDashboardStats

} = require("../controllers/orderController");


// Place Order
router.post(
  "/",
  protect,
  placeOrder
);


// Buy Now Order
router.post(
  "/buy-now",
  protect,
  placeBuyNowOrder
);


// User Orders
router.get(
  "/my-orders",
  protect,
  getUserOrders
);


// Vendor Orders
router.get(
  "/vendor-orders",
  protect,
  authorizeRoles(
    "vendor",
    "admin"
  ),
  getVendorOrders
);


// Update Order Status
router.put(
  "/:id",
  protect,
  updateOrderStatus
);

router.get(
  "/vendor-dashboard-stats",
  protect,
  authorizeRoles("vendor"),
  getVendorDashboardStats
);

module.exports = router;