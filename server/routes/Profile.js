const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

//get user profile
router.get("/getprofile", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// edit email and name
router.post("/editprofile", verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ _id: req.user.id });

    user.name = name;
    user.email = email;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete account

router.delete("/deleteaccount", verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.user.id });
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
