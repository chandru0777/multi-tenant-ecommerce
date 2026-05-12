console.log("MY NEW SERVER FILE IS RUNNING");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const storeRoutes = require("./routes/storeRoutes"); // ✅ ADDED
const analyticsRoutes = require("./routes/analyticsRoutes");

connectDB();

const app = express();

app.use(cors());

// 🔥 IMPORTANT: Webhook BEFORE express.json()
app.use(
  "/api/payment/webhook",
  express.raw({ type: "application/json" })
);

// ✅ Normal JSON middleware
app.use(express.json());

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/store", storeRoutes); // ✅ ADDED
app.use("/api/analytics", analyticsRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});