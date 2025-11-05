const Room = require('../models/roomModels');
const User = require('../models/user');

// ✅ Staff/Admin create room + assign doctor + timing
exports.createRoomSchedule = async (req, res) => {
  try {
    const { doctorId, roomNumber, date, startTime, slotDuration } = req.body;

    if (!doctorId || !roomNumber || !date || !startTime) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(400).json({ message: 'Doctor not found' });
    }

    // calculate endTime
    const start = new Date(startTime);
    const duration = slotDuration || 60; // default 60 min
    const end = new Date(start.getTime() + duration * 60000);

    // check overlapping
    const overlapping = await Room.findOne({
      doctorId,
      roomNumber,
      date,
      $or: [
        { startTime: { $lt: end, $gte: start } },
        { endTime: { $lte: end, $gt: start } },
        { startTime: { $lte: start }, endTime: { $gte: end } }
      ]
    });

    if (overlapping) {
      return res.status(400).json({ message: 'Overlapping slot exists for this doctor in this room' });
    }

    const room = await Room.create({
      doctorId,
      roomNumber,
      date,
      startTime: start,
      endTime: end
    });

    res.status(201).json({ message: 'Room slot created successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Error creating room slot', error: error.message });
  }
};

// ✅ Patient view available slots
exports.getRoomScheduleByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const slots = await Room.find({
      date: new Date(date),
      isBooked: false
    }).populate('doctorId', 'fullname email');

    res.status(200).json({ message: 'Available slots fetched', slots });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slots', error: error.message });
  }
};

// ✅ Patient book slot (atomic update)
exports.bookRoomSlot = async (req, res) => {
  try {
    const { roomId } = req.body;
    const patientId = req.user.id;

    // atomic update: update only if slot is not booked
    const room = await Room.findOneAndUpdate(
      { _id: roomId, isBooked: false },
      { isBooked: true, patientId: patientId },
      { new: true } 
    );

    if (!room) {
      return res.status(400).json({ message: 'Slot already booked' });
    }

    res.status(200).json({ message: 'Slot booked successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Error booking slot', error: error.message });
  }
};
