const Order = require("../models/Order");
const Review = require("../models/Review");
const Product = require("../models/Product");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { checkPermissions } = require("../utils");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const createOrder = async (req, res) => {
  try {
    const { items: cartItems, tax, shippingFee } = req.body;

    if (!cartItems || cartItems.length < 1) {
      throw new CustomError.BadRequestError("No cart items provided");
    }
    if (!tax || !shippingFee) {
      throw new CustomError.BadRequestError(
        "Please provide tax and shipping fee"
      );
    }

    let orderItems = [];
    let subtotal = 0;

    for (const item of cartItems) {
      const dbProduct = await Product.findOne({ _id: item.product });
      if (!dbProduct) {
        throw new CustomError.NotFoundError("Product not found.");
      }
      const { name, price, image, _id } = dbProduct;
      const singleOrderItem = {
        amount: item.amount,
        name,
        price,
        image,
        product: _id,
      };
      // add item to order
      orderItems = [...orderItems, singleOrderItem];
      // calculate subtotal
      subtotal += item.amount * price;
    }
    // calculate total
    const total = tax + shippingFee + subtotal;
    const totalInCents = Math.round(total * 100);
    // get client secret
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalInCents,
      currency: "usd",
    });

    const order = await Order.create({
      orderItems,
      total,
      subtotal,
      tax,
      shippingFee,
      clientSecret: process.env.STRIPE_KEY,
      user: req.user.userId,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ order, clientSecret: order.clientSecret });
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError("Order not found");
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders });
};

const getOrdersForAVendor = async (req, res) => {
  const vendorsId = req.user.userId;
  const products = await Product.find({ user: vendorsId });
  const productIds = products.map((product) => product._id);
  const orders = await Order.find({ products: { $in: productIds } }).populate({
    path: "user",
    select: "name email",
  });
  res.status(StatusCodes.OK).json({ orders });
};

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError("Order not found");
  }
  checkPermissions(req.user, order.user);
  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  getOrdersForAVendor,
  createOrder,
  updateOrder,
};
