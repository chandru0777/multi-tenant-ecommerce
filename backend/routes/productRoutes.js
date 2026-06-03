const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getSingleProduct,
  searchProducts,
   getVendorProducts
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
//const upload = require("../middleware/uploadMiddleware"); // ✅ ADDED

// Public route
router.get("/", getProducts);

router.get(

  "/vendor/my-products",

  protect,

  authorizeRoles(
    "vendor",
    "admin"
  ),

  getVendorProducts

);

router.get(
  "/category/:category",
  getProductsByCategory
);

router.get(
  "/:id",
  getSingleProduct
);

router.get(
  "/search/:query",
  searchProducts
);

// Admin & Vendor only
router.post(
  "/",
  protect,
  authorizeRoles("admin", "vendor"),
  //upload.single("image"), // ✅ IMPORTANT
  createProduct
);
//vendor prooducts 





router.get(
  "/:id",
  getSingleProduct
);

router.put("/:id", protect, authorizeRoles("admin", "vendor"), updateProduct);

router.delete("/:id", protect, authorizeRoles("admin", "vendor"), deleteProduct);

module.exports = router;