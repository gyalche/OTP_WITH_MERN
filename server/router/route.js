import express from 'express';
import {
  createResetSession,
  generateOTP,
  getUser,
  localVeriable,
  login,
  register,
  resetPassword,
  updateUser,
  verifyOTP,
  verifyUser,
} from '../controllers/appController.js';
const router = express.Router();

//post route;
router.post('/register', register);
router.post('/registerMail');
router.post('/authenticate');
router.post('/login', login);

//get method;
router.get('/user/:username', getUser);
router.get('/generateOTP', verifyUser, localVeriable, generateOTP);
router.get('/verifyOTP', verifyOTP);
router.get('/createResetSession', createResetSession);

//put method;
router.put('/updateuser', verifyUser, updateUser);
router.put('/resetPassword', resetPassword);

export default router;
