const express = require("express");
const router = express.Router();
const Car = require("../models/car");

router.get("/getinfo/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const regex = new RegExp(key, "i");

    const cars = await Car.find({
      $or: [
        { model: { $regex: regex } },
        { brand: { $regex: regex } },
        { bodyType: { $regex: regex } },
        { color: { $regex: regex } },
        { description: { $regex: regex } },
      ],
    });

    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
