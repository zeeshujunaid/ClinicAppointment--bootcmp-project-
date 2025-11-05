const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, 
  endTime: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model("RoomSchedule", roomSchema);
