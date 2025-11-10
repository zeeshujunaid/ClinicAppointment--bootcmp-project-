const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roomScheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomSchedule",
    required: true,
  },

  // Patient details (required)
  bloodGroup: { type: String, required: true },
  address: { type: String, required: true },
  medicalHistory: { type: String, default: "" },
  currentMedications: {
    type: [String],
    default: [],
  },
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

});

module.exports = mongoose.model("Appointment", appointmentSchema);
