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
router.get("/:id", authenticateUser, getSingleUser);
router.get("/showMe/:id", showCurrentUser);
router.patch("/updateuser/:id", updateUser);
router.patch("/updateuserpassword/:id", updateUserPassword);

module.exports = router;
