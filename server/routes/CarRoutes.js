const express = require("express");
const router = express.Router();
const Car = require("../models/car");
const upload = require("../middlewares/upload");
const { isAdmin, verifyToken } = require("../middlewares/authMiddleware");

// VIEW ALL CARS
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// VIEW SINGLE CAR
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// ADD CAR
router.post(
  "/addcar",
  verifyToken,
  isAdmin,
  upload.array("image"),
  async (req, res) => {
    try {
      let imagePaths = [];
      if (req.files && req.files.length > 0) {
        imagePaths = req.files.map((file) => file.path);
      } else if (req.body.image) {
        imagePaths = Array.isArray(req.body.image)
          ? req.body.image
          : [req.body.image];
      }

      const {
        model,
        brand,
        year,
        kmDriven,
        fuelType,
        registrationState,
        price,
        description,
        transmission,
        owner,
        color,
        bodyType,
      } = req.body;

      const car = new Car({
        model,
        brand,
        year,
        kmDriven,
        fuelType,
        registrationState,
        price,
        description,
        image: imagePaths,
        transmission,
        owner,
        color,
        bodyType,
      });

      await car.save();

      res.status(201).json({
        message: "Car added successfully",
        car,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// UPDATE CAR
router.put(
  "/updateCar/:id",
  verifyToken,
  isAdmin,
  upload.array("image"),
  async (req, res) => {
    try {
      let updateData = { ...req.body };

      if (req.files && req.files.length > 0) {
        updateData.image = req.files.map((file) => file.path);
      }

      const updatedCar = await Car.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true } // returns updated data
      );

      if (!updatedCar) {
        return res.status(404).json({ message: "Car not found" });
      }

      res.status(200).json({
        message: "Car updated successfully",
        updatedCar,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// DELETE CAR
router.delete("/deleteCar/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
