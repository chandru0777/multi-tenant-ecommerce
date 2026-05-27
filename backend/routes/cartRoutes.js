const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCartItems,
  updateCartQuantity,
  removeCartItem
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware"); // ✅ ADDED

// Protected routes
router.post("/", protect, addToCart);
router.get("/", protect, getCartItems);
router.put(
  "/:id",
  protect,
  updateCartQuantity
);

router.delete(
  "/:id",
  protect,
  removeCartItem
);

module.exports = router;