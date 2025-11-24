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

app.use("/api/auth", authroutes);
app.use("/api/appointment", appointmentroutes);
app.use("/api/room", docroom);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
module.exports = app;
