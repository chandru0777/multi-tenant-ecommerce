const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },

    // ✅ PAYMENT FIELDS (ADDED)
    paymentStatus: {
      type: String,
      default: "pending",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);