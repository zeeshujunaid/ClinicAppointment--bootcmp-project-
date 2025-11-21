const express = require("express");
const router = express.Router();
const {
  protect,
} = require("../middelware/authmiddelware");
const { patientOnly, staffOnly } = require("../middelware/roomMiddelware");
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
