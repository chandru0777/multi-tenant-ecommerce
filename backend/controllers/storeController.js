const Store = require("../models/Store");

// CREATE STORE (Vendor only)
const createStore = async (req, res) => {
  try {
    const store = await Store.create({
      name: req.body.name,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "Store created",
      store,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET MY STORE
const getMyStore = async (req, res) => {
  try {
    const store = await Store.findOne({ owner: req.user._id });

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createStore,
  getMyStore,
};