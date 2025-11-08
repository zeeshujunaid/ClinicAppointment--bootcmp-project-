const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // patient reference
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roomScheduleId: { type: mongoose.Schema.Types.ObjectId, ref: "RoomSchedule", required: true },

  // Patient details (required)
  age: { type: Number, required: true },
  bloodGroup: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  medicalHistory: { type: String, default: "" },
  allergies: { type: String, default: "" },
  currentMedications: { type: String, default: "" },
  emergencyContact: { type: String, required: true },

  // Appointment info
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },

  status: {
    type: String,
    enum: ["Upcoming", "Completed", "Cancelled"],
    default: "Upcoming",
  },

  reason: { type: String, default: "General Checkup" },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
