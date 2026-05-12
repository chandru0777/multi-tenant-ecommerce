const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // ✅ removes extra spaces
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // ✅ ensures consistent emails
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6, // ✅ basic validation
    },

    role: {
      type: String,
      enum: ["admin", "vendor", "customer"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);