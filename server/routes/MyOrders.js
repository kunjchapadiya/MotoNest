const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

router.get("/myorders/:id", async (req, res) => {
  try {
    const orders = await Payment.find({ userId: req.params.id })
      .populate("carId", "model brand price image")
      .populate("userId", "name email");

    res.status(200).json(orders);
  } catch (err) {
    console.error("Order fetch error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
