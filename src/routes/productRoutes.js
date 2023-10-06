const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const {
  creatProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
  deleteProduct,
  getAllProductsByVendor,
} = require("../controllers/productController");
const { getSingleProductReviews } = require("../controllers/reviewController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.post(
  "/",
  authenticateUser,
  authorizePermissions("vendor"),
  creatProduct
);

router.get("/", getAllProducts);
router.get(
  "/vendor",
  authenticateUser,
  authorizePermissions("vendor"),
  getAllProductsByVendor
);

router.post(
  "/uploadImage",
  authenticateUser,
  authorizePermissions("vendor"),
  uploadImage
);

router.patch(
  "/:id",
  authenticateUser,
  authorizePermissions("vendor"),
  updateProduct
);
router.delete(
  "/:id",
  authenticateUser,
  authorizePermissions("vendor"),
  deleteProduct
);
router.get("/:id", getSingleProduct);

router.get("/:id/reviews", getSingleProductReviews);

module.exports = router;
