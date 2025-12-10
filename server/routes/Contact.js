const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

router.post("/addcontact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
