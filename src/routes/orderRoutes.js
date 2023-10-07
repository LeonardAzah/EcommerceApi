const express = require("express");

const router = express.Router();

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  getOrdersForAVendor,
  createOrder,
  updateOrder,
} = require("../controllers/orderController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.post("/", authenticateUser, createOrder);
router.get("/", authenticateUser, authorizePermissions("admin"), getAllOrders);
router.get(
  "/vendors-order",
  authenticateUser,
  authorizePermissions("vendor"),
  getOrdersForAVendor
);
router.get("/showAllMyOrders", authenticateUser, getCurrentUserOrders);
router.patch("/:id", authenticateUser, updateOrder);
router.get("/:id", authenticateUser, getSingleOrder);

module.exports = router;
