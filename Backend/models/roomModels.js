const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  status: { type: String, enum: ["available", "booked"], default: "available" },
  day: { type: String },
}, { timestamps: true });

//  allow multiple slots per day, prevent duplicate exact slot
roomSchema.index({ roomNumber: 1, date: 1, startTime: 1, endTime: 1 }, { unique: false });

module.exports = mongoose.model("RoomSchedule", roomSchema);
