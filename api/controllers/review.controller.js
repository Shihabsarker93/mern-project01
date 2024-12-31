import Review from '../models/review.model.js';
import { errorHandler } from '../utils/error.js';


export const createReview = async (req, res, next) => {
  try {
    const { rating, comment, listingId } = req.body;
    
    // Check if user has already reviewed this listing
    const existingReview = await Review.findOne({
      userRef: req.user.id,
      listingRef: listingId
    });

    if (existingReview) {
      return next(errorHandler(400, 'You have already reviewed this listing'));
    }

    const review = await Review.create({
      rating,
      comment,
      userRef: req.user.id,
      listingRef: listingId,
    });

    // Populate the userRef to get username immediately
    const populatedReview = await Review.findById(review._id)
      .populate('userRef', 'username');

    res.status(201).json(populatedReview);
  } catch (error) {
    // Handle unique constraint violation
    if (error.code === 11000) {
      return next(errorHandler(400, 'You can only submit one review per listing'));
    }
    next(error);
  }
};

// export const updateReview = async (req, res, next) => {
//   try {
//     // Find the existing review
//     const review = await Review.findById(req.params.reviewId);
    
//     // Check if review exists
//     if (!review) {
//       return next(errorHandler(404, 'Review not found'));
//     }
    
//     // Check if user is the review owner
//     if (review.userRef.toString() !== req.user.id) {
//       return next(errorHandler(401, 'You can only update your own reviews'));
//     }
    
//     // Update the review
//     const updatedReview = await Review.findByIdAndUpdate(
//       req.params.reviewId,
//       {
//         rating: req.body.rating,
//         comment: req.body.comment
//       },
//       { 
//         new: true,
//         runValidators: true // This ensures pre-save middleware runs
//       }
//     ).populate('userRef', 'username');
    
//     res.status(200).json(updatedReview);
//   } catch (error) {
//     next(error);
//   }
// };

export const getListingReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ listingRef: req.params.listingId })
      .populate('userRef', 'username')
      .sort({ createdAt: -1 }); // Sort reviews by most recent
    
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};


export const deleteReview = async (req, res, next) => {
  try {
    // Find the existing review
    const review = await Review.findById(req.params.reviewId);
    
    // Check if review exists
    if (!review) {
      return next(errorHandler(404, 'Review not found'));
    }
    
    // Check if user is the review owner
    if (review.userRef.toString() !== req.user.id) {
      return next(errorHandler(401, 'You can only delete your own reviews'));
    }
    
    // Delete the review
    await Review.findByIdAndDelete(req.params.reviewId);
    
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};