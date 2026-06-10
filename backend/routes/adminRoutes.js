const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

const {
  getAllUsers,
  updateUserRole,
  getAllProducts,
  deleteProductByAdmin,
  getAllOrders,
  getDashboardStats
} = require("../controllers/adminController");

router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

router.put(
  "/users/:id/role",
  protect,
  authorizeRoles("admin"),
  updateUserRole
);

router.get(
  "/products",
  protect,
  authorizeRoles("admin"),
  getAllProducts
);

router.delete(
  "/products/:id",
  protect,
  authorizeRoles("admin"),
  deleteProductByAdmin
);

router.get(
  "/orders",
  protect,
  authorizeRoles("admin"),
  getAllOrders
);
router.get(
  "/dashboard-stats",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

module.exports = router;