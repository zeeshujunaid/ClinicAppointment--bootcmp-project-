require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const authroutes = require("./routes/authRoutes");
const docroom = require("./routes/roomRoutes");
const appointmentroutes = require("./routes/appointmentRoutes");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use("/api/auth", authroutes);
app.use("/api/appointment", appointmentroutes);
app.use("/api/room", docroom);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Vercel ke liye module export
module.exports = app;
