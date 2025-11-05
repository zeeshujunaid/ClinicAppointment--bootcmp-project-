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
app.use(
    cors({
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);


connectDB(); 

app.use("/api/v1/auth", authroutes);
app.use("/api/v1/appointment", appointmentroutes);
app.use("/api/v1/room", docroom);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});