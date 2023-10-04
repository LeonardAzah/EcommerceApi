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
  authorizePermissions,
} = require("../middleware/authentication");

router.post("/", authenticateUser, authorizePermissions("owner"), creatProduct);
router.get("/", getAllProducts);

router.post(
  "/uploadImage",
  authenticateUser,
  authorizePermissions("owner"),
  uploadImage
);

router.patch(
  "/:id",
  authenticateUser,
  authorizePermissions("owner"),
  updateProduct
);
router.delete(
  "/:id",
  authenticateUser,
  authorizePermissions("owner"),
  deleteProduct
);
router.get("/:id", getSingleProduct);

router.get("/:id/reviews", getSingleProductReviews);

module.exports = router;
