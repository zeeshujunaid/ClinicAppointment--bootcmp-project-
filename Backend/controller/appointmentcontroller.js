const Appointment = require("../models/appointment");
const User = require("../models/user");
const Room = require("../models/roomModels");

exports.createAppointment = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const {
      patientId,
      doctorId,
      roomScheduleId,
      reason,
      age,
      bloodGroup,
      address,
      phone,
      emergencyContact,
    } = req.body;

    if (!patientId || !doctorId || !roomScheduleId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Fetch RoomSchedule
    const roomSchedule = await Room.findById(roomScheduleId);
    if (!roomSchedule) {
      return res.status(404).json({ message: "Room schedule not found" });
    }

    if (roomSchedule.status !== "available") {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // 🩺 Double-check doctor overlap
    const conflict = await Appointment.findOne({
      doctorId,
      date: roomSchedule.date,
      $or: [
        {
          startTime: {
            $lt: roomSchedule.endTime,
            $gte: roomSchedule.startTime,
          },
        },
        {
          endTime: { $lte: roomSchedule.endTime, $gt: roomSchedule.startTime },
        },
        {
          startTime: { $lte: roomSchedule.startTime },
          endTime: { $gte: roomSchedule.endTime },
        },
      ],
    });

    if (conflict) {
      return res
        .status(400)
        .json({ message: "Doctor already has an appointment in this slot" });
    }

    const appointment = await Appointment.create({
      userId: patientId,
      doctorId,
      roomScheduleId,
      date: roomSchedule.date,
      startTime: roomSchedule.startTime,
      endTime: roomSchedule.endTime,
      status: "Upcoming",
      reason,
      age,
      bloodGroup,
      address,
      phone,
      emergencyContact,
    });

    // 🟡 Update RoomSchedule to booked
    roomSchedule.status = "booked";
    await roomSchedule.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating appointment", error: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    if (
      req.user.role !== "admin" &&
      req.user.role !== "doctor" &&
      req.user.role !== "staff"
    ) {
      return res
        .status(403)
        .json({
          message:
            "Access denied. Only admin or doctor can view all appointments.",
        });
    }

    const appointments = await Appointment.find().populate(
      "userId",
      "fullname email"
    );

    res.status(200).json({
      message: "All appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching appointments", error: error.message });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.user.role; // verifyUser middleware se user info

    let query = {};
    if (role === "doctor") {
      query = { doctorId: id }; // doctor ke appointments
    } else {
      query = { userId: id }; // patient ke appointments
    }

    const appointments = await Appointment.find(query)
      .populate("userId", "fullname email role")
      .populate("doctorId", "fullname specialization profileImage fees");

    if (!appointments || appointments.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user appointments",
      error: error.message,
    });
  }
};
