const express = require('express');
const router = express.Router();
const { protect } = require('../middelware/authmiddelware');
const { staffOnly, patientOnly } = require('../middelware/roomMiddelware');
const {
  createRoomSchedule,
  getRoomScheduleByDate,
  bookRoomSlot
} = require('../controller/roomcontroller');

// Staff/Admin creates room schedule
router.post('/create', protect, staffOnly, createRoomSchedule);

// Patient views available slots for date
router.get('/date/:date', protect, patientOnly, getRoomScheduleByDate);

// Patient books a slot
router.post('/book', protect, patientOnly, bookRoomSlot);

module.exports = router;
