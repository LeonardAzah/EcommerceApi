const express = require("express");

const router = express.Router();

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require("../controllers/orderController");
const {
  authenticateUser,
  authorizePermisions,
} = require("../middleware/authentication");

router.post("/", authenticateUser, createOrder);
router.get("/", authenticateUser, authorizePermisions("admin"), getAllOrders);
router.get("/showAllMyOrders", authenticateUser, getCurrentUserOrders);
router.patch("/:id", authenticateUser, updateOrder);
router.get("/:id", authenticateUser, getSingleOrder);

module.exports = router;
