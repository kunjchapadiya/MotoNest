const express = require("express");
const router = express.Router();
const Car = require("../models/car");

// GET cars by body type
router.get("/:type", async (req, res) => {
    try {
        const type = req.params.type;
        const cars = await Car.find({ bodyType: { $regex: new RegExp(`^${type}$`, "i") } });
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});



module.exports = router;
