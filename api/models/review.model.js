import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  listingRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  }
}, { 
  timestamps: true,
  // Add a unique index to prevent multiple reviews from same user for same listing
  index: { userRef: 1, listingRef: 1, unique: true }
});

// Add a pre-save middleware to enforce one review per user per listing
reviewSchema.pre('save', async function(next) {
  try {
    // Check if a review already exists for this user and listing
    const existingReview = await this.constructor.findOne({
      userRef: this.userRef,
      listingRef: this.listingRef,
      _id: { $ne: this._id } // Exclude the current review when updating
    });

    if (existingReview) {
      const error = new Error('You can only submit one review per listing');
      error.name = 'ValidationError';
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;








// import mongoose from 'mongoose';

// const reviewSchema = new mongoose.Schema(
//   {
//     rating: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 5,
//     },
//     comment: {
//       type: String,
//       required: true,
//     },
//     userRef: {
//       type: mongoose.Schema.Types.ObjectId, // Reference to the User model
//       ref: 'User',
//       required: true,
//     },
//     listingRef: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// // Create a unique compound index to prevent multiple reviews from the same user on the same listing
// reviewSchema.index({ userRef: 1, listingRef: 1 }, { unique: true });

// const Review = mongoose.model('Review', reviewSchema);
// export default Review;