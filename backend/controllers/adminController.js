const User =
require("../models/User");

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

module.exports = {
  getAllUsers,
  updateUserRole
};