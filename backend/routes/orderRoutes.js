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

  getVendorOrders

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

module.exports = router;