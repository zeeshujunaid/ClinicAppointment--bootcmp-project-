const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true }, // ISO Date object
  endTime: { type: Date, },   // calculated from startTime + slotDuration
  status: { type: String, enum: ["available", "booked"], default: "available" },
  day: { type: String }, // optional
}, { timestamps: true });

module.exports = mongoose.model("RoomSchedule", roomSchema);
