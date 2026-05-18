const Cart = require("../models/Cart");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // check if item already exists in cart
    const existingItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingItem) {
      // update quantity
      existingItem.quantity += quantity;

      await existingItem.save();

      return res.status(200).json({
        message: "Cart updated",
        cart: existingItem,
      });
    }

    // create new cart item
    const cart = await Cart.create({
      user: req.user._id, // ✅ from token
      product: productId,
      quantity,
    });

    res.status(201).json({
      message: "Added to cart",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CART ITEMS (ONLY LOGGED-IN USER)
const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user._id })
      .populate("product"); // ✅ important

    res.status(200).json(cartItems);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCartItems,
};