const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCartItems,
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware"); // ✅ ADDED

// Protected routes
router.post("/", protect, addToCart);
router.get("/", protect, getCartItems);

module.exports = router;