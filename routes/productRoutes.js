const express = require("express");
const router = express.Router();
const {
  creatProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
  deleteProduct,
} = require("../controllers/productController");
const { getSingleProductReviews } = require("../controllers/reviewController");
const {
  authenticateUser,
  authorizePermisions,
} = require("../middleware/authentication");

router.post("/", authenticateUser, authorizePermisions("admin"), creatProduct);
router.get("/", getAllProducts);

router.post(
  "/uploadImage",
  authenticateUser,
  authorizePermisions("admin"),
  uploadImage
);

router.patch(
  "/:id",
  authenticateUser,
  authorizePermisions("admin"),
  updateProduct
);
router.delete(
  "/:id",
  authenticateUser,
  authorizePermisions("admin"),
  deleteProduct
);
router.get("/:id", getSingleProduct);

router.get("/:id/reviews", getSingleProductReviews);

module.exports = router;
