const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { authenticateUser } = require("../middleware/authentication");

router.get("/", getAllReviews);

router.post("/:id", authenticateUser, createReview);

router.patch("/:id", authenticateUser, updateReview);
router.delete("/:id", authenticateUser, deleteReview);

router.get("/:id", getSingleReview);

module.exports = router;
