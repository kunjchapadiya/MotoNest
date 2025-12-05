const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kchapadiya10@gmail.com",
      pass: "dvfujwzvfbptzxki",
    },
  });

  const info = await transporter.sendMail({
    from: '"MotoNest" <kchapadiya10@gmail.com>',
    to: to,
    subject: subject,
    html: html,
  });

  console.log("Message sent:", info.messageId);
};

module.exports = sendMail;
