import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';

import { useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user); //state of the current user not to use /profile to natigate

  const [searchTerm, setSearchTerm] = useState(''); //header seach functionality
  const [listings, setListings] = useState([]);
  const [showListings, setShowListings] = useState(false);  // State to control visibility of listings
  const navigate = useNavigate();

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listing/get'); // Make an API call to fetch listings
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        setListings(data); // Update the listings state with fetched data
        setShowListings(true); // Automatically show the listings after fetching
      } else {
        console.error('Failed to fetch listings'); // Log an error if the API call fails
      }
    } catch (error) {
      console.error('Error fetching listings:', error); // Handle fetch errors
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);// keep the prev seach same
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const toggleListings = () => {
    setShowListings((prev) => !prev);  // Toggle the visibility 
    if (!showListings) {
      fetchListings();  // Only fetch listings when they are shown
    }
  };

  // Button class for consistent look
  const buttonClass = "text-sm sm:text-base hover:text-amber-700 transition bg-amber-700 text-white px-3 py-1 rounded-lg hover:bg-amber-800";

  return (
    <header className="bg-black text-white shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto py-4 px-6">
        {/* Profile Button */}
        <Link to="/profile">
          <button className={buttonClass}>
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover border border-amber-700"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              'Sign In'
            )}
          </button>
        </Link>

        {/* Create Listing Button */}
        {currentUser && (
          <Link to="/create-listing">
            <button className={buttonClass}>Create Listing</button>
          </Link>
        )}

        {/* My Listings Button */}
        {currentUser && (
          <Link to="/profile">
            <button className={buttonClass}>My Listings</button>
          </Link>
        )}

        {/* Mortgage Calculator Button */}
        <Link to="/mortgage-calculator">
          <button className={buttonClass}>Mortgage Calculator</button>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-800 text-white rounded-lg flex items-center px-4 py-2"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-32 sm:w-64 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-amber-700" />
          </button>
        </form>

        {/* KeyNest Button (Logo) */}
        <Link to="/" className="flex items-center">
          <h1 className="text-lg sm:text-2xl font-bold">
            <span className="text-amber-700">Key</span>
            <span className="text-white">Nest</span>
          </h1>
        </Link>

        {/* About Button */}
        <Link to="/about">
          <button className={buttonClass}>About</button>
        </Link>
      </div>

      {/* All Listings Button */}
      <button
        onClick={toggleListings}  // Toggle the listings visibility
        className={buttonClass}
      >
        {showListings ? 'Hide Listings' : 'All Listings'}
      </button>

      {/* Display fetched listings if showListings is true */}
      {showListings && listings.length > 0 && (
        <div className="mt-4 p-4 bg-neutral-800 text-white rounded-lg max-w-6xl mx-auto">
          <h2 className="text-xl font-bold">Available Listings</h2>
          <ul className="mt-2">
            {listings.map((listing) => (
              <li key={listing._id} className="py-2">
                <Link to={`/listing/${listing._id}`} className="hover:text-amber-700">
                  {listing.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

