const Store = require("../models/Store");

const createStore = async (req, res) => {

  try {

    const existingStore =
      await Store.findOne({
        owner: req.user._id
      });

    if (existingStore) {

      return res.status(400).json({
        message:
          "Store already exists"
      });

    }

    const store =
      await Store.create({

        name: req.body.name,

        owner:
          req.user._id

      });

    res.status(201).json({

      message:
        "Store created successfully",

      store

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message
    });

  }

};

const getMyStore = async (req, res) => {

  try {

    const store =
      await Store.findOne({
        owner: req.user._id
      });

    if (!store) {

      return res.status(404).json({
        message:
          "Store not found"
      });

    }

    res.status(200).json(
      store
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message
    });

  }

};

module.exports = {

  createStore,
  getMyStore

};