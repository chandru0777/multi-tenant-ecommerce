const User = require("../models/User");
const Order = require("../models/Order");

const getAllUsers =
async (req, res) => {

  try {

    const users =
      await User.find()
      .select("-password")
      .sort({
        createdAt: -1
      });

    res.status(200)
      .json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message
    });

  }

};

const updateUserRole =
async (req, res) => {

  try {

    const { role } =
      req.body;

    const user =
      await User.findByIdAndUpdate(

        req.params.id,

        { role },

        { new: true }

      ).select("-password");

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    res.status(200).json({
      message:
        "Role updated successfully",
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

const Product =
require("../models/Product");

const getAllProducts =
async (req, res) => {

  try {

    const products =
      await Product.find()
        .select(
    "name price image stock category store"
  )

      .populate(
        "store",
        "name"
      )
      .sort({
        createdAt: -1
      })
      .lean();

    res.status(200)
      .json(products);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message
    });

  }

};

const deleteProductByAdmin =
async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {

      return res.status(404).json({
        message:
          "Product not found"
      });

    }

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Product deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message
    });

  }

};


const getAllOrders =
async (req, res) => {

  try {

    const orders =
      await Order.find()
        .populate(
          "user",
          "name email"
        )
        .populate(
          "items.product",
          "name image price"
        )
        .sort({
          createdAt: -1
        })
        .lean();

    res.status(200).json(
      orders
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message
    });

  }

};

const getDashboardStats =
async (req, res) => {

  try {

    const totalUsers =
      await User.countDocuments();

    const totalVendors =
      await User.countDocuments({
        role: "vendor",
      });

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const revenueData =
      await Order.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$totalPrice",
            },
          },
        },
      ]);

    const totalRevenue =
      revenueData[0]?.totalRevenue || 0;

    res.status(200).json({
      totalUsers,
      totalVendors,
      totalProducts,
      totalOrders,
      totalRevenue,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getAllUsers,
  updateUserRole,
  getAllProducts,
  deleteProductByAdmin,
  getAllOrders,
  getDashboardStats
};