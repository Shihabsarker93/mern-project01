import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaDollarSign,
  FaCalendar,
  FaStar,
  // FaEdit,
  FaTrash,
} from 'react-icons/fa';
import Contact from '../components/Contact';
import ReviewForm from '../components/ReviewForm';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/review/listing/${params.listingId}`);
        const data = await res.json();
        setReviews(data);
        // Check if current user has already reviewed
        if (currentUser) {
          const userReview = data.find(review => review.userRef?._id === currentUser._id);
          setHasUserReviewed(!!userReview);
        }
      } catch (error) {
        console.error('Error fetching reviews', error);
      }
    };

    fetchListing();
    fetchReviews();
  }, [params.listingId, currentUser]);

  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]);
    setEditingReview(null);
    setHasUserReviewed(true);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const res = await fetch(`/api/review/delete/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        // Remove the deleted review from the reviews array
        setReviews(reviews.filter(review => review._id !== reviewId));
        // Reset hasUserReviewed if the user's review was deleted
        if (currentUser) {
          const remainingUserReview = reviews.find(review => review.userRef?._id === currentUser._id);
          setHasUserReviewed(!remainingUserReview);
        }
      } else {
        const errorData = await res.json();
        console.error('Error deleting review:', errorData);
        alert(errorData.message || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    }
  };

  const handleUpdateReview = async (updatedReview) => {
    try {
      const res = await fetch(`/api/review/update/${updatedReview._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: updatedReview.rating,
          comment: updatedReview.comment
        }),
      });
  
      if (res.ok) {
        const updated = await res.json();
        // Update the review in the reviews array
        setReviews(reviews.map(review => 
          review._id === updated._id ? updated : review
        ));
        setEditingReview(null);
      } else {
        const errorData = await res.text();
        console.error('Error updating review:', errorData);
        alert(errorData || 'Failed to update review');
      }
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review');
    }
  };

  return (
    <main className="min-h-screen bg-neutral-900">
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-3xl text-amber-700 font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl text-red-500 font-medium">
            Something went wrong!
          </p>
        </div>
      )}
      {listing && !loading && !error && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Image Slider Section */}
          <div className="relative mb-8">
            <Swiper 
              navigation 
              className="rounded-2xl overflow-hidden"
              style={{
                '--swiper-navigation-color': '#b45309',
                '--swiper-navigation-size': '22px',
              }}
            >
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[70vh] bg-center bg-no-repeat bg-cover"
                    style={{
                      backgroundImage: `url(${url})`,
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Share Button */}
            <button
              className="absolute top-4 right-4 z-10 bg-neutral-800 text-amber-700 rounded-full p-3 hover:bg-neutral-700 transition-all duration-300 border border-amber-700"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            >
              <FaShare className="text-xl" />
            </button>
            {copied && (
              <div className="absolute top-20 right-4 z-10 bg-neutral-800 text-amber-700 rounded-lg shadow-lg px-4 py-2 border border-amber-700">
                <p>Link copied!</p>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="bg-neutral-800 rounded-2xl shadow-xl p-6 border border-neutral-700">
            {/* Header Section */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <h1 className="text-3xl font-bold text-white">
                  {listing.name}
                </h1>
                <div className="flex items-center gap-2">
                  <FaDollarSign className="text-amber-700 text-2xl" />
                  <p className="text-2xl font-semibold text-amber-700">
                    {listing.offer
                      ? listing.discountPrice.toLocaleString('en-US')
                      : listing.regularPrice.toLocaleString('en-US')}
                    {listing.type === 'rent' && (
                      <span className="text-neutral-400 text-lg ml-1">/month</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-neutral-300">
                <FaMapMarkerAlt className="text-amber-700" />
                {listing.address}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full text-white bg-amber-700 text-sm">
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
                {listing.offer && (
                  <span className="px-4 py-2 rounded-full text-amber-700 border border-amber-700 text-sm">
                    ${+listing.regularPrice - +listing.discountPrice} OFF
                  </span>
                )}
                <span className="px-4 py-2 rounded-full text-neutral-300 bg-neutral-700 text-sm flex items-center gap-2">
                  <FaCalendar className="text-amber-700" />
                  Available Now
                </span>
              </div>

              {/* Description */}
              <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-700">
                <h2 className="font-semibold text-white mb-3">About this property</h2>
                <p className="text-neutral-300 leading-relaxed">{listing.description}</p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 bg-neutral-900 rounded-xl p-4 border border-neutral-700">
                  <FaBed className="text-amber-700 text-2xl" />
                  <span className="text-neutral-300">
                    {listing.bedrooms} {listing.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-neutral-900 rounded-xl p-4 border border-neutral-700">
                  <FaBath className="text-amber-700 text-2xl" />
                  <span className="text-neutral-300">
                    {listing.bathrooms} {listing.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-neutral-900 rounded-xl p-4 border border-neutral-700">
                  <FaParking className="text-amber-700 text-2xl" />
                  <span className="text-neutral-300">
                    {listing.parking ? 'Parking Available' : 'No Parking'}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-neutral-900 rounded-xl p-4 border border-neutral-700">
                  <FaChair className="text-amber-700 text-2xl" />
                  <span className="text-neutral-300">
                    {listing.furnished ? 'Furnished' : 'Unfurnished'}
                  </span>
                </div> 
              </div>

              {/* Contact Button */}
              {currentUser && listing.userRef !== currentUser._id && !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="w-full bg-amber-700 text-white py-4 rounded-xl hover:bg-amber-800 transition-colors duration-300 font-semibold mt-6"
                >
                  Contact Owner
                </button>
              )}
              {contact && <Contact listing={listing} />}
            </div>

            {/* Reviews Section */}
            <div className="mt-8 bg-neutral-800 rounded-2xl p-6 border border-neutral-700">
              <h2 className="text-2xl font-bold text-white mb-6">Property Reviews</h2>
              
              {/* Review Form - Only for logged-in users who didn't list this property */}
              {currentUser && listing.userRef !== currentUser._id && !hasUserReviewed && (
                <ReviewForm 
                  listingId={params.listingId} 
                  onReviewSubmit={handleReviewSubmit}
                  initialReview={editingReview}
                  onUpdateReview={handleUpdateReview}
                />
              )}

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
                          {[...Array(5)].map((_, index) => (
                            <FaStar 
                              key={index} 
                              className={`mr-1 ${index < review.rating ? 'text-amber-500' : 'text-neutral-600'}`} 
                            />
                          ))}
                          <span className="ml-2 text-neutral-400 text-sm">
                            {review.rating}/5
                          </span>
                        </div>
                        
                        {/* Username */}
                        <span className="text-neutral-300 text-sm font-medium">
                          - {review.userRef?.username || review.userRef || 'Anonymous User'}
                        </span>
                      </div>

                      {/* Delete Button (only for review owner) */}
                      {currentUser && review.userRef?._id === currentUser._id && (
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleDeleteReview(review._id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <FaTrash />
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

