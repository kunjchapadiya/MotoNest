const mongoose = require("mongoose");
const { array } = require("../middlewares/upload");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: Array,
    default: [],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
