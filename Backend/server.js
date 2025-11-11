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
  console.log("hello world");
  res.send("Hello World");
});

// Local development server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally at: http://localhost:${PORT}`);
  });
}

module.exports = app;
