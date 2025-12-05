const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");
const { v4: uuidv4 } = require("uuid"); // You might need to install uuid or just use a random string function

const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.rzp_test_key_id,
  key_secret: process.env.rzp_test_secret_key,
});

// 1. Create Order
router.post("/create-order", verifyToken, async (req, res) => {
  const { amount, carId } = req.body;

  if (!amount || !carId) {
    return res.status(400).json({ message: "Amount and Car ID are required" });
  }

  try {
    const options = {
      amount: amount, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
});

// 2. Verify Payment
router.post("/verify-payment", verifyToken, async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    carId,
    amount,
  } = req.body;

  try {
    // Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.rzp_test_secret_key)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Save Payment to Database
      const newPayment = new Payment({
        userId: req.user.id,
        carId,
        paymentId: razorpay_payment_id,
        amount,
        paymentStatus: "Completed",
      });

      await newPayment.save();

      res.status(200).json({
        success: true,
        message: "Payment verified and saved successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res
      .status(500)
      .json({ message: "Payment verification failed", error: error.message });
  }
});

router.get("/getpayment", async (req, res) => {
  try {
    const payment = await Payment.find()
      .populate("carId", "model brand price")
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get payment details",
      error: error.message,
    });
  }
});

router.get("/getpayment/:id", verifyToken, async (req, res) => {
  try {
    const payment = await Payment.findOne({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("carId", "model brand price registrationNumber"); // Populate car details

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "No payment found for this user",
      });
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get payment details",
      error: error.message,
    });
  }
});
module.exports = router;
