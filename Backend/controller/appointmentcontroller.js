const User = require("../models/user");
const Room = require("../models/roomModels");
const Appointment = require("../models/appointment");

exports.createAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      roomScheduleId,
      bloodGroup,
      address,
      emergencyContact,
    } = req.body;

    if (!patientId || !doctorId || !roomScheduleId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // fecthing room schema
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
      bloodGroup,
      address,
      emergencyContact,
    });

    // room schedule booked
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
    // blocking user to get all appointments
    if (
      req.user.role == "patient"
      // req.user.role !== "admin" &&
      // req.user.role !== "doctor" &&
      // req.user.role !== "staff"
    ) {
      return res.status(403).json({
        message:
          "Access denied. Only admin or doctor can view all appointments.",
      });
    }

    // getting other data from other colletion 
    const appointments = await Appointment.find()
      .populate("userId", "fullname email")
      .populate("doctorId", "fullname specialization fees")
      .populate("roomScheduleId", "roomNumber"); 

    res.status(200).json({
      message: "All appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching appointments",
      error: error.message,
    });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    // getting id to get his appointments only
    const { id } = req.params;
    const role = req.user.role;


    let query = {};
    if (role === "doctor") {
      query = { doctorId: id };
    } else {
      query = { userId: id };
    }

    // getting other info from other fields 
    const appointments = await Appointment.find(query)
      .populate("userId", "fullname email role")
      .populate("doctorId", "fullname specialization image fees");

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

exports.getPatientAndDoctorAppointments = async (req, res) => {
  try {
    // getting doctorid and data to fetch only this date appointments
    const { doctorId, date } = req.body; 
    if (!doctorId || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //Doctor appointments for that day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // getting all required data
    const doctorAppointments = await Appointment.find({
      doctorId,
      date: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate("userId", "fullname email phone age")
      .populate("roomScheduleId", "roomNumber");

    res.status(200).json({
      doctorAppointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching patient and doctor appointments",
      error: error.message,
    });
  }
};


exports.completeAppointment = async (req, res) => {
  try {
    const { appointmentId, newMedication } = req.body;

    const appointment = await Appointment.findById(appointmentId).populate(
      "userId"
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "Completed";
    await appointment.save();

    const patient = appointment.userId;
    if (newMedication && newMedication.trim() !== "") {
      if (!patient.currentMedications) {
        patient.currentMedications = [];
      }
      patient.currentMedications.push(newMedication);
      await patient.save();
    }

    res.json({
      message: "Appointment completed and medication added successfully",
      updatedAppointment: appointment,
      updatedPatient: patient,
    });
  } catch (error) {
    console.error("Error completing appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

