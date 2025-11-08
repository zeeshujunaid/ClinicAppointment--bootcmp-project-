const Room = require("../models/roomModels");
const User = require("../models/user");

// staff create room for doctor with date and time
exports.createRoomSchedule = async (req, res) => {
  try {
    const { doctorId, roomNumber, date, startTime, slotDuration } = req.body;

    if (!doctorId || !roomNumber || !date || !startTime) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(400).json({ message: "Doctor not found" });
    }

    // Convert startTime to Date reliably
    const [hours, minutes] = startTime.split(":").map(Number);
    const start = new Date(date); // only date part
    start.setHours(hours, minutes, 0, 0); // set hours and minutes

    if (isNaN(start.getTime())) {
      return res.status(400).json({ message: "Invalid start time" });
    }

    const duration = Number(slotDuration) || 60;
    const end = new Date(start.getTime() + duration * 60000);

    // checking for overlaping
    const overlapping = await Room.findOne({
      roomNumber,
      date: new Date(date),
      $or: [
        { startTime: { $lt: end, $gte: start } },
        { endTime: { $gt: start, $lte: end } },
        { startTime: { $lte: start }, endTime: { $gte: end } },
      ],
    });

    if (overlapping) {
      return res.status(400).json({
        message: "room aleady assinged",
      });
    }

    // saving room slot
    const room = await Room.create({
      doctorId,
      roomNumber,
      date: new Date(date),
      startTime: start,
      endTime: end,
      status: "available",
    });

    res.status(201).json({ message: "Room slot created successfully", room });
  } catch (error) {
    console.error("Create Room Error:", error);
    res
      .status(500)
      .json({ message: "Error creating room slot", error: error.message });
  }
};

// getting room slot of doctor for patient
exports.getRoomScheduleByDate = async (req, res) => {
  try {
    const { date } = req.params;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const slots = await Room.find({
      date: new Date(date),
      status: "available",
    }).populate("doctorId", "fullname specialization");

    res
      .status(200)
      .json({ message: "Available slots fetched", count: slots.length, slots });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching slots", error: error.message });
  }
};

// patient bok room slot
exports.bookRoomSlot = async (req, res) => {
  try {
    const { roomId } = req.body;
    const patientId = req.user.id;

    const room = await Room.findOneAndUpdate(
      { _id: roomId, status: "available" },
      { status: "booked", patientId },
      { new: true }
    );

    if (!room) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    res.status(200).json({ message: "Slot booked successfully", room });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking slot", error: error.message });
  }
};
 