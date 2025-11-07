const express = require('express');
const {
  registerPatient,
  createUserByAdmin,
  loginUser,
  createAdmin,
  getAllUsers,
  getDoctors,
  getPatients,
  getStaff,
} = require('../controller/authController');
const { protect, adminOnly } = require('../middelware/authmiddelware');



const router = express.Router();

router.post('/register', registerPatient);
router.post('/login', loginUser);

router.get('/doctor',protect, getDoctors);
router.get('/patients',protect,getPatients);
router.get('/staff',protect,getStaff);
router.post('/create',protect, adminOnly,createUserByAdmin );
router.get('/getUser',protect, getAllUsers);
router.post('/createadmin', createAdmin)


module.exports = router;
