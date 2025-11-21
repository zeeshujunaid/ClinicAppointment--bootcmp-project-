const express = require("express");
const router = express.Router();
const { protect } = require("../Backend/middelware/authmiddelware");
const { staffOnly, patientOnly } = require("../Backend/middelware/roomMiddelware");
const {
  createRoomSchedule,
  getRoomScheduleByDate,
  bookRoomSlot,
  getAllRoomSlots,
} = require("../controller/roomcontroller");

router.post("/create", protect, staffOnly, createRoomSchedule);

router.get("/date/:date", protect, patientOnly, getRoomScheduleByDate);

router.post("/book", protect, patientOnly, bookRoomSlot);

router.get("/roomschedule", getAllRoomSlots);

module.exports = router;
