import express from 'express';
import { 
  createReview, 
  getListingReviews, 
  // updateReview, 
  deleteReview 
} from '../controllers/review.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createReview);
router.get('/listing/:listingId', getListingReviews);
// router.put('/update/:reviewId', verifyToken, updateReview);
router.delete('/delete/:reviewId', verifyToken, deleteReview);

export default router;