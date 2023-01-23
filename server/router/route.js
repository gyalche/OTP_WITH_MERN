import express from 'express';
import {
  createResetSession,
  generateOTP,
  getUser,
  localVariable,
  login,
  register,
  resetPassword,
  updateUser,
  verifyOTP,
  verifyUser,
} from '../controllers/appController.js';
const router = express.Router();
import { registerMail } from '../controllers/mailer.js';
//post route;
router.post('/register', register);
router.post('/registerMail', registerMail);
router.post('/authenticate');
router.post('/login', login);

//get method;
router.get('/user/:username', getUser);
router.get('/generateOTP', verifyUser, localVariable, generateOTP);
router.get('/verifyOTP', verifyUser, verifyOTP);
router.get('/createResetSession', verifyUser, createResetSession);

//put method;
router.put('/updateuser', verifyUser, updateUser);
router.put('/resetPassword', verifyUser, resetPassword);

export default router;
