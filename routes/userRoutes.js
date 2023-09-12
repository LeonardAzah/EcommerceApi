const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermisions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router.get("/", authenticateUser, authorizePermisions("admin"), getAllUsers);
router.get("/showMe", authenticateUser, showCurrentUser);
router.patch("/updateuserpassword", authenticateUser, updateUserPassword);
router.patch("/updateuser", authenticateUser, updateUser);
router.get("/:id", authenticateUser, getSingleUser);

module.exports = router;
