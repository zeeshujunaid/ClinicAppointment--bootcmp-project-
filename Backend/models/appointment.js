const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  age: Number,
  bloodGroup: String,
  address: String,
  phone: String,
  medicalHistory: String,
  allergies: String,
  currentMedications: String,
  emergencyContact: String,
  date: { type: Date, default: Date.now },
  time: String,
  status: {
    type: String,
    enum: ["Upcoming", "Completed", "Cancelled"],
    default: "Upcoming",
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
