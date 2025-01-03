import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function ReviewForm({ listingId, onReviewSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const res = await fetch('/api/review/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          comment,
          listingId
        }),
      });

      const data = await res.json();

      if (res.ok) {
        onReviewSubmit(data);
        setRating(0);
        setComment('');
        setHover(0);
      } else {
        setError(data.message || 'Failed to submit review');
        console.error('Failed to submit review', data);
      }
    } catch (error) {
      setError('Error submitting review');
      console.error('Error submitting review', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900 rounded-xl p-6 border border-neutral-700 mt-6">
      <h3 className="text-xl font-semibold text-white mb-4">Leave a Review</h3>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={`${
                index <= (hover || rating) ? 'text-amber-500' : 'text-neutral-500'
              } bg-transparent border-none outline-none cursor-pointer text-2xl mr-1`}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <FaStar />
            </button>
          );
        })}
        <span className="ml-2 text-neutral-300">{rating} / 5</span>
      </div>
      
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review here..."
        className="w-full bg-neutral-800 text-white p-3 rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-700 min-h-[100px]"
        required
      />
      
      <button 
        type="submit" 
        className="w-full bg-amber-700 text-white py-3 rounded-xl hover:bg-amber-800 transition-colors duration-300 font-semibold mt-4"
      >
        Submit Review
      </button>
    </form>
  );
}

