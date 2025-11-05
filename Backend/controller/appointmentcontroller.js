const Appointment = require("../models/appointment");
const User = require("../models/user");

//Create Appointment
exports.createAppointment = async (req, res) => {
  try {
    const { age, bloodGroup, address, phone, medicalHistory, allergies, currentMedications, emergencyContact } = req.body;

    // userId from auth middleware
    const userId = req.user.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const appointment = new Appointment({
      userId,
      age,
      bloodGroup,
      address,
      phone,
      medicalHistory,
      allergies,
      currentMedications,
      emergencyContact,
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error: error.message });
  }
};

//Get All Appointments (Admin,Doctor)
exports.getAllAppointments = async (req, res) => {
  try {
    // Check role
    if (req.user.role !== "admin" && req.user.role !== "doctor") {
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

//Get Appointments of a Specific User (by userId)
exports.getUserAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    const appointments = await Appointment.find({ userId: id }).populate("userId", "fullname email role");

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this user" });
    }

    res.status(200).json({
      message: "User appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user appointments", error: error.message });
  }
};
