const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry"); // import model
const { isAdmin, verifyToken } = require("../middlewares/authMiddleware");
// GET all enquiries
router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.status(200).json(enquiries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST new enquiry
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, email, phoneNo, enquiryMessage } = req.body;

    const enquiry = await Enquiry.create({
      name,
      email,
      phoneNo,
      enquiryMessage,
    });

    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to submit enquiry" });
  }
});

//update status
router.post("/:id", verifyToken, async (req, res) => {
  try {
    const { enquiryStatus } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { enquiryStatus },
      { new: true }
    );
    res.status(200).json(enquiry);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
