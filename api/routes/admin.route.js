import express from 'express';
import { 
  adminSignin, 
  adminSignout, 
  adminSignup,
  getDashboardStats,
  getAllUsers,
  banUser
} from '../controllers/admin.controller.js';
import { verifyAdminToken } from '../utils/adminMiddleware.js';

const router = express.Router();

// Auth routes
router.post('/signup', adminSignup);
router.post('/signin', adminSignin);
router.get('/signout', adminSignout);

// Protected routes
router.use(verifyAdminToken);
router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.put('/user/ban/:id', banUser);

export default router;