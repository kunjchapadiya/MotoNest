const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Car = require("../models/car");
const Enquiry = require("../models/enquiry");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// total user
router.get("/totaluser", verifyToken, isAdmin, async (req, res) => {
  const totalUser = await User.countDocuments({ role: "user" });
  res.json({ totalUser });
});

// total car
router.get("/totalcar", verifyToken, isAdmin, async (req, res) => {
  const totalCar = await Car.countDocuments({});
  res.json({ totalCar });
});

// total enquiry
router.get("/pendingquery", verifyToken, isAdmin, async (req, res) => {
  const totalEnquiry = await Enquiry.countDocuments({
    enquiryStatus: "Pending",
  });
  res.json({ totalEnquiry });
});

// recent added car
router.get("/recentcar", verifyToken, isAdmin, async (req, res) => {
  const recentCar = await Car.find({}).sort({ createdAt: -1 }).limit(5);
  res.json({ recentCar });
});

// recent enquiry
router.get("/recentenquiry", verifyToken, isAdmin, async (req, res) => {
  const recentEnquiry = await Enquiry.find({}).sort({ createdAt: -1 }).limit(5);
  res.json({ recentEnquiry });
});

module.exports = router;
