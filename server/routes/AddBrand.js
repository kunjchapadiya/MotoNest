const express = require("express");
const router = express.Router();
const Brand = require("../models/brands");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });

router.post("/addbrand", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).send("Image is required");
    }

    // Extract actual extension (.png, .jpg, .jpeg)
    const ext = path.extname(req.file.originalname);

    // Create final filename with correct extension
    const finalName = req.file.filename + ext;

    // Rename file to include extension
    fs.renameSync(req.file.path, `uploads/${finalName}`);

    const brand = new Brand({
      name,
      image: [finalName], // Save correct filename
      description,
    });

    await brand.save();
    res.status(201).send(brand);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getbrand", async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).send(brands);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
