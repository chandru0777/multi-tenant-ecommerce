const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
//const upload = require("../middleware/uploadMiddleware"); // ✅ ADDED

// Public route
router.get("/", getProducts);

// Admin & Vendor only
router.post(
  "/",
  protect,
  authorizeRoles("admin", "vendor"),
  //upload.single("image"), // ✅ IMPORTANT
  createProduct
);

router.put("/:id", protect, authorizeRoles("admin", "vendor"), updateProduct);

router.delete("/:id", protect, authorizeRoles("admin", "vendor"), deleteProduct);

module.exports = router;