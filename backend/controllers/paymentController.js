const Razorpay = require("razorpay");

const razorpay = new Razorpay({

  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_KEY_SECRET,

});


const createRazorpayOrder =
async (req, res) => {

  try {

   console.log("BODY:", req.body);

const amount = req.body.amount;

console.log("AMOUNT:", amount);

    const options = {

      amount: amount * 100, // paise

      currency: "INR",

      receipt: `receipt_${Date.now()}`,

    };

    const order =
      await razorpay.orders.create(
        options
      );

    res.status(200).json(order);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message,

    });

  }

};

module.exports = {

  createRazorpayOrder,

};