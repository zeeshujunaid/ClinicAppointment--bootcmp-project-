const Appointment = require("../models/appointment");
const User = require("../models/user");


exports.createAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      age,
      bloodGroup,
      address,
      phone,
      medicalHistory,
      allergies,
      currentMedications,
      emergencyContact,
    } = req.body;

    const userId = req.user.id;

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found or invalid" });
    }

    const appointment = new Appointment({
      userId,
      doctorId,
      age,
      bloodGroup,
      address,
      phone,
      medicalHistory,
      allergies,
      currentMedications,
      emergencyContact,
      status: "Upcoming", 
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating appointment",
      error: error.message,
    });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "doctor" && req.user.role!== "staff") {
      return res.status(403).json({ message: "Access denied. Only admin or doctor can view all appointments." });
    }

    const appointments = await Appointment.find().populate("userId", "fullname email");

    res.status(200).json({
      message: "All appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
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
      .populate("doctorId", "fullname specialization profileImage");

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

