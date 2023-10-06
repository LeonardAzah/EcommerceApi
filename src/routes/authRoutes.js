const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateUser } = require("../middleware/authentication");

router.post("/register", authController.register);
router.post("/register-owner", authController.registerOwner);
router.post("/register-admin", authController.registerAdmin);
router.post("/verify-email", authController.verifyEmail);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/login", authController.login);
router.delete("/logout", authenticateUser, authController.logout);

module.exports = router;
