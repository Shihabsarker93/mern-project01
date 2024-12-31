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