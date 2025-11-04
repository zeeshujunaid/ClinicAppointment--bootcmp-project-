const express = require('express');
const {
  registerPatient,
  createUserByAdmin,
  loginUser,
  createAdmin,
  getAllUsers,
} = require('../controller/authController');
const { protect, adminOnly } = require('../middelware/authmiddelware');



const router = express.Router();

router.post('/register', registerPatient);
router.post('/login', loginUser);

router.post('/createdoctor',protect, adminOnly,createUserByAdmin );
router.get('/getUser',protect, getAllUsers);
router.post('/createadmin', createAdmin)


module.exports = router;
