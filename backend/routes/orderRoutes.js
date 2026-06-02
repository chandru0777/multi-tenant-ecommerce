const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
  placeBuyNowOrder
} = require("../controllers/orderController");

router.post(
  "/",
  protect,
  placeOrder
);

router.get(
  "/my-orders",
  protect,
  getUserOrders
);

router.put(
  "/:id",
  protect,
  updateOrderStatus
);

module.exports = router;