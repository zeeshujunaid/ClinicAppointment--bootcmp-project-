const express = require('express');
const {
  registerPatient,
  createUserByAdmin,
  loginUser,
  getAllUsers,
} = require('../controllers/authController');
const { protect, adminOnly } = require('../middelware/authmiddelware');


const router = express.Router();

router.post('/register', registerPatient);
router.post('/login', loginUser);

router.post('/createdoctor',protect, adminOnly,createUserByAdmin );
router.get('/getUser',protect, getAllUsers);

module.exports = router;
