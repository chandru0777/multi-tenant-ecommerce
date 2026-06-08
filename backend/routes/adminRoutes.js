const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

const {
  getAllUsers,
  updateUserRole
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

module.exports = router;