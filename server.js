const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const authroutes = require("./Backend/routes/authRoutes");
const docroom = require("./Backend/routes/roomRoutes");
const appointmentroutes = require("./Backend/routes/appointmentRoutes");

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/auth", authroutes);
app.use("/api/appointment", appointmentroutes);
app.use("/api/room", docroom);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
