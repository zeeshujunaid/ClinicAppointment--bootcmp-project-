const express = require('express');
const router = express.Router();
const { protect } = require('../middelware/authmiddelware');
const { staffOnly, patientOnly } = require('../middelware/roomMiddelware');
const {
  createRoomSchedule,
  getRoomScheduleByDate,
  bookRoomSlot
} = require('../controller/roomcontroller');


router.post('/create', protect, staffOnly, createRoomSchedule);


router.get('/date/:date', protect, patientOnly, getRoomScheduleByDate);


router.post('/book', protect, patientOnly, bookRoomSlot);

module.exports = router;
