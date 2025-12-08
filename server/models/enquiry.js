const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enquirySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phoneNo: {
    type: String,
    require: true,
    maxLength: 10,
    minLength: 10,
  },
  enquiryDate: {
    type: Date,
    default: Date.now,
  },
  enquiryMessage: {
    type: String,
    require: true,
  },
  enquiryStatus: {
    type: String,
    enum: ["Pending", "Resolved", "Cancelled"],
    default: "Pending",
  },
});

module.exports =
  mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);
