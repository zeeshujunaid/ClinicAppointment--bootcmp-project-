require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./Config/db');
const authroutes = require('./routes/authRoutes');
const docroom = require('./routes/roomRoutes')
const appointmentroutes = require('./routes/appointmentRoutes');

app.use(express.json());

// Middleware to handle cors
app.use(cors());


connectDB(); 

app.use("/api/auth", authroutes);
app.use("/api/appointment", appointmentroutes);
app.use("/api/room", docroom);
app.get("/" , (req,res)=>{
    console.log("hello world")
})


const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally at: http://localhost:${PORT}`);
  });
}
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

export default app;
