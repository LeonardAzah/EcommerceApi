const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Provide product name"],
      maxlength: [50, "Name can not be more than 50 character"],
    },
    price: {
      type: Number,
      required: [true, "Provide product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Provide product description"],
      maxlength: [800, "Decription can not be more than 800 character"],
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Provide product category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Provide comapny name"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: true,
    },
    featured: { type: Boolean, default: false },
    freeShipping: { type: Boolean, default: false },
    inventory: { type: Number, required: true, default: 15 },
    averageRating: { type: Number, default: 0 },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
