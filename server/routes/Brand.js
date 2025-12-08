const express = require("express");
const router = express.Router();
const Car = require("../models/car");

// GET cars by body type

router.get("/:brand", async (req, res) => {
    try {
        const brandParam = req.params.brand.toLowerCase();

        const brandMapping = {
            "mercedes": "Mercedes-Benz",
            "land-rover": "Land Rover",
            "rolls-royce": "Rolls-Royce"
        };

        const searchBrand = brandMapping[brandParam] || brandParam;

        const cars = await Car.find({
            brand: { $regex: `^${searchBrand}$`, $options: "i" }
        });

        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});



module.exports = router;
