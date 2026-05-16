const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// Place order
router.post("/", placeOrder);

// Get orders of a user
router.get("/:userId", getUserOrders);

// Update order status
router.put("/:id", updateOrderStatus);

module.exports = router;