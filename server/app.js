require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 8080;
const Auth = require("./routes/Auth");
const CarRoutes = require("./routes/CarRoutes");
const UserRoutes = require("./routes/User");
const BodyType = require("./routes/BodyType");
const Brand = require("./routes/Brand");
const Enquiry = require("./routes/Enquiry");
const RecentlyAddCar = require("./routes/RecentlyAddCar");
const Profile = require("./routes/Profile");
const Dashboard = require("./routes/Dashboard");
const PaymentDetails = require("./routes/PaymentDetails");
const MyOrders = require("./routes/MyOrders");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

app.get("/", (req, res) => {
  res.send("✅ Our API");
});

app.use("/api/auth", Auth);
app.use("/api/car", RecentlyAddCar);
app.use("/api/car", CarRoutes);
app.use("/api/admin/users", UserRoutes);
app.use("/api/category", BodyType);
app.use("/api/admin/cars", CarRoutes);
app.use("/api/brand", Brand);
app.use("/api/enquiry", Enquiry);
app.use("/api/profile", Profile);
app.use("/api/dashboard", Dashboard);
app.use("/api/payment", require("./routes/PaymentDetails"));
app.use("/api/order", require("./routes/MyOrders"));
app.use("/api/mail", require("./routes/mail"));

app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server is running on port ${port}`);
});
