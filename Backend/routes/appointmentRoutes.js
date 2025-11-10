const express = require("express");
const {
  createAppointment,
  getAllAppointments,
  getUserAppointments,
  getPatientAndDoctorAppointments,
  completeAppointment,
} = require("../controller/appointmentcontroller");

const { verifyUser, allowRoles } = require("../middelware/appointmentMiddelware");

const router = express.Router();


router.post("/create", verifyUser, allowRoles("patient"), createAppointment);


router.get("/all", verifyUser, allowRoles("admin", "doctor","staff"), getAllAppointments);

router.get("/user/:id", verifyUser, allowRoles("admin", "doctor", "patient"), getUserAppointments);

router.post("/appointment/complete", completeAppointment);

router.post("/getdoctortodayappointment" , verifyUser , allowRoles("admin", "doctor", "patient"), getPatientAndDoctorAppointments );

module.exports = router;
