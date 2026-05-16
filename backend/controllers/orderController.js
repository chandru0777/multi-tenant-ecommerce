const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const sendEmail = require("../config/mail");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    // get cart items
    const cartItems = await Cart.find({ user: userId }).populate("product");

    // remove invalid items
    const validItems = cartItems.filter((item) => item.product !== null);

    if (validItems.length === 0) {
      return res.status(400).json({
        message: "No valid items in cart",
      });
    }

    // prepare order items
    const items = validItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    // calculate total price
    const totalPrice = validItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    // create order
    const order = await Order.create({
      user: userId,
      items,
      totalPrice,
    });

    // 🧠 GET USER DETAILS
    const user = await User.findById(userId);

    // 📧 SEND EMAIL
    if (user && user.email) {
      await sendEmail(
        user.email,
        "Order Confirmed",
        `Your order of ₹${totalPrice} has been placed successfully.`
      );
    }

    // clear cart
    await Cart.deleteMany({ user: userId });

    res.status(201).json({
      message: "Order placed successfully & email sent",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Orders
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
};