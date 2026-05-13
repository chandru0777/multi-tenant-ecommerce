const express = require("express");
const router = express.Router();

const {
  createStore,
  getMyStore,
} = require("../controllers/storeController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Vendor only
router.post("/", protect, authorizeRoles("vendor"), createStore);

// Get own store
router.get("/my", protect, authorizeRoles("vendor"), getMyStore);

module.exports = router;