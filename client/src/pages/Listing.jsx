

{/* Reviews List */}
{reviews.length > 0 ? (
<div className="grid gap-4 mt-6">
  {reviews.map((review) => (
    <div 
      key={review._id} 
      className="bg-neutral-900 rounded-xl p-6 border border-neutral-700"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          {/* Star Rating */}
          <div className="flex items-center mr-4">
            
            </span>
          </div>
          
          {/* Username */}
          <span className="text-neutral-300 text-sm font-medium">
            - {review.userRef?.username || review.userRef || 'Anonymous User'}
          </span>
        </div>

        {/* Delete Button (only for review owner) */}
        
          <div className="flex items-center space-x-2">
            <button 
              
            </button>
          </div>
        )}
      </div>
      <p className="text-neutral-300">{review.comment}</p>
    </div>
  ))}
</div>
) : (
<p className="text-neutral-400 text-center mt-4">
  No reviews yet for this property
</p>
)}
</div>
</div>
</div>
)}
</main>
);
}
