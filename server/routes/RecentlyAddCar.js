const express = require("express");
const router = express.Router();
const Car = require("../models/car");

router.get("/recent", async (req, res) => {
    try {
        console.log("Fetching recent cars...");
        const recentCars = await Car.find()
            .sort({ createdAt: -1 }) // newest first
            .limit(3);
        console.log(`Found ${recentCars.length} recent cars`);
        res.json(recentCars);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
