const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

const {

  createStore,
  getMyStore

} = require(
  "../controllers/storeController"
);

router.post(
  "/",
  protect,
  authorizeRoles(
    "vendor"
  ),
  createStore
);

router.get(
  "/my-store",
  protect,
  authorizeRoles(
    "vendor"
  ),
  getMyStore
);

module.exports =
router;