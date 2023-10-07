const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getAllVendors,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router.get("/", authenticateUser, authorizePermissions("admin"), getAllUsers);
router.get(
  "/vendors",
  authenticateUser,
  authorizePermissions("admin"),
  getAllVendors
);

router.get("/showMe", authenticateUser, showCurrentUser);
router.patch(
  "/updateuserpassword",
  authenticateUser,
  authorizePermissions("admin"),
  updateUserPassword
);
router.patch("/updateuser", authenticateUser, updateUser);
router.get(
  "/:id",
  authenticateUser,
  authorizePermissions("admin"),
  getSingleUser
);

module.exports = router;
