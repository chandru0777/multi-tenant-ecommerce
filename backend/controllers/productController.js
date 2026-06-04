const Product = require("../models/Product");
const Store = require("../models/Store");

// CREATE PRODUCT (Vendor only)
const createProduct = async (req, res) => {
  try {
    // find vendor's store
    const store = await Store.findOne({ owner: req.user._id });

    if (!store) {
      return res.status(400).json({
        message: "No store found. Please create a store first",
      });
    }

    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      image: req.body.image, // ✅ FIXED (Cloudinary URL)
      store: store._id,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS (Public)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("store", "name");

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PRODUCT (Only owner vendor/admin)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("store");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // authorization check
    if (
      product.store.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized to update this product",
      });
    }

    // prepare update data
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
    };

    // if new image uploaded
    if (req.file) {
      updateData.image = req.file.path; // ✅ update image
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PRODUCT (Only owner vendor/admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("store");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (
      product.store.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized to delete this product",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


 const getProductsByCategory =
  async (req, res) => {


    try {

      const products =
        await Product.find({

          category:
            req.params.category,

        });
        

      res.status(200).json(products);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

};

 const getSingleProduct =
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          message: "Product not found",
        });

      }

      res.status(200).json(product);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

};

 const searchProducts =
  async (req, res) => {

    try {

      const products =
        await Product.find({

          name: {

            $regex:
              req.params.query,

            $options: "i",

          },

        });

      res.status(200).json(products);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

};
//unique vendors
const getVendorProducts =
async (req, res) => {

  try {

    const store =
      await Store.findOne({

        owner:
          req.user._id,

      });

    if (!store) {

      return res.status(404).json({

        message:
          "Store not found",

      });

    }

    const products =
      await Product.find({

        store:
          store._id,

      });

    res.status(200).json(
      products
    );

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};
//Order tracking


const placeBuyNowOrder = async (req, res) => {

  try {

    const userId = req.user._id;

    const {
      productId,
      quantity
    } = req.body;

    const product =
      await Product.findById(productId);

    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      });

    }

    const order =
      await Order.create({

        user: userId,

        items: [
          {
            product: productId,
            quantity
          }
        ],

        totalPrice:
          product.price * quantity

      });

    res.status(201).json({

      message:
        "Order placed successfully",

      order

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getSingleProduct,
  searchProducts,
   getVendorProducts,
   placeBuyNowOrder 
};