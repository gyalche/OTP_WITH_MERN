import { Router } from 'express';
import {
  createResetSession,
  generateOTP,
  getUser,
  login,
  register,
  resetPassword,
  updateUser,
  verifyOTP,
} from '../controllers/appController';
const router = Router();

//post route;
router.post('/register', register);
router.post('/registerMail');
router.post('/authenticate');
router.post('/login', login);

//get method;
router.get('/user/:username', getUser);
router.get('/generateOTP', generateOTP);
router.get('/verifyOTP', verifyOTP);
router.get('/createResetSession', createResetSession);

//put method;
router.put('/updateuser', updateUser);
router.put('/resetPassword', resetPassword);

export default router;
