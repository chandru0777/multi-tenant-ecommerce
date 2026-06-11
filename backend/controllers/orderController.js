const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const Store = require("../models/Store");
const Product = require("../models/Product");
//const sendEmail = require("../config/mail");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

const {

  customerName,

  phone,

  shippingAddress

} = req.body;

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

  customerName,

  phone,

  shippingAddress

});

    // 🧠 GET USER DETAILS
    const user = await User.findById(userId);

    // 📧 SEND EMAIL
    // if (user && user.email) {
    //   await sendEmail(
    //     user.email,
    //     "Order Confirmed",
    //     `Your order of ₹${totalPrice} has been placed successfully.`
    //   );
    // }

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
   const userId = req.user._id;

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

const placeBuyNowOrder =
  async (req, res) => {

    try {

      const {

  userId,

  productId,

  quantity,

  customerName,

  phone,

  shippingAddress

} = req.body;
      const Product =
        require("../models/Product");

      const product =
        await Product.findById(
          productId
        );

      if (!product) {

        return res.status(404).json({
          message:
            "Product not found",
        });

      }

      const order =
  await Order.create({

    user: userId,

    items: [

      {
        product: productId,
        quantity,
      },

    ],

    totalPrice:
      product.price *
      quantity,

    customerName,

    phone,

    shippingAddress

  });

      res.status(201).json({

        message:
          "Buy Now order placed",

        order,

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

};

//vendoe Orders 

const getVendorOrders = async (req, res) => {

  try {

    const store =
      await Store.findOne({
        owner: req.user._id,
      });

    if (!store) {

      return res.status(404).json({
        message: "Store not found",
      });

    }

    const products =
      await Product.find({
        store: store._id,
      });

    const productIds =
      products.map(
        (product) =>
          product._id
      );

    const orders =
      await Order.find({
        "items.product": {
          $in: productIds,
        },
      })
      .populate("user", "name email")
      .populate(
        "items.product"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json(
      orders
    );

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
  placeBuyNowOrder,
  getVendorOrders
};