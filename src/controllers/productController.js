const Product = require("../models/Product");
const Review = require("../models/Review");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { paginate } = require("../utils");

const creatProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const populateOptions = [{ model: "Review", path: "reviews" }];
  const excludeFields = "image.publicId";

  const products = await paginate({
    model: Product,
    page,
    limit,
    excludeFields,
    populateOptions,
  });
  res.status(StatusCodes.OK).json({ products });
};

const getAllProductsByVendor = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const user = req.user.userId;
  const filters = { user };
  const populateOptions = [{ model: "Review", path: "reviews" }];

  const products = await paginate({
    model: Product,
    page,
    limit,
    filters,
    populateOptions,
  });
  res.status(StatusCodes.OK).json({ products });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId })
    .select("-image.publicId")
    .populate("reviews");
  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }

  // Retrieve the associated reviews
  const reviews = await Review.find({ product: productId });

  // Delete the reviews associated with the product
  await Review.deleteMany({ product: productId });

  const image = product.image.publicId;
  if (image) {
    await cloudinary.uploader.destroy(image);
  }
  await Product.remove();

  res.status(StatusCodes.OK).json({ message: "Product deleted successfully" });
};

const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "e-commerce-api-folder",
    }
  );

  fs.unlinkSync(req.files.image.tempFilePath);

  return res
    .status(StatusCodes.OK)
    .json({ image: { url: result.secure_url, publicId: result.public_id } });
};

module.exports = {
  creatProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  getAllProductsByVendor,
};
