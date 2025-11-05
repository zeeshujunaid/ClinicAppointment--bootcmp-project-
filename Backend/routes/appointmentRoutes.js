const express = require("express");
const {
  createAppointment,
  getAllAppointments,
  getUserAppointments,
} = require("../controller/appointmentcontroller");

const { verifyUser, allowRoles } = require("../middelware/appointmentMiddelware");

const router = express.Router();

// patient can create appointment
router.post("/create", verifyUser, allowRoles("patient"), createAppointment);

// only admin and doctor can view all apointments
router.get("/all", verifyUser, allowRoles("admin", "doctor"), getAllAppointments);

// get user data by id (only view by doc,admin,patient)
router.get("/user/:id", verifyUser, allowRoles("admin", "doctor", "patient"), getUserAppointments);

module.exports = router;
