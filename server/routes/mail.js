const express = require("express");
const sendMail = require("../utils/sendMail");
const Payment = require("../models/Payment");
const router = express.Router();

router.get("/sendinvoice/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Payment.findById(id)
      .populate("userId")
      .populate("carId");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const email = invoice.userId.email;
    const subject = "Your MotoNest Invoice";
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Invoice Details</h2>
        <p><strong>Invoice Number:</strong> ${invoice.paymentId}</p>
        <p><strong>Date:</strong> ${new Date(
          invoice.createdAt
        ).toLocaleDateString()}</p>
        <p><strong>Amount Paid:</strong> ₹${invoice.amount.toLocaleString(
          "en-IN"
        )}</p>
        
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        
        <h3 style="color: #555;">Car Details</h3>
        <p><strong>Car:</strong> ${invoice.carId.brand} ${
      invoice.carId.model
    }</p>
        <p><strong>Price:</strong> ₹${invoice.carId.price.toLocaleString(
          "en-IN"
        )}</p>
        
        ${
          invoice.carId.image && invoice.carId.image.length > 0
            ? `<img src="http://localhost:8080/${invoice.carId.image[0].replace(
                /\\/g,
                "/"
              )}" alt="Car Image" style="width: 100%; max-width: 300px; border-radius: 8px; margin-top: 10px;" />`
            : ""
        }
        
        <p style="margin-top: 20px; color: #777; font-size: 12px;">Thank you for choosing MotoNest!</p>
      </div>
    `;

    await sendMail(email, subject, html);

    res.status(200).json({ message: "Invoice sent to email successfully!" });
  } catch (error) {
    console.error("Error sending invoice:", error);
    res.status(500).json({ message: "Failed to send invoice email" });
  }
});

module.exports = router;
