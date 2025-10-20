// // MyListings.jsx
// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// export default function MyListings() {
//   const [userListings, setUserListings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchUserListings = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const res = await fetch(`/api/user/listings/${currentUser._id}`);
//         const data = await res.json();
//         if (data.success === false) {
//           setError(data.message);
//           return;
//         }
//         setUserListings(data);
//       } catch (error) {
//         setError('Failed to fetch listings');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (currentUser?._id) {
//       fetchUserListings();
//     }
//   }, [currentUser?._id]);

//   const handleDeleteListing = async (listingId) => {
//     try {
//       const res = await fetch(`/api/listing/delete/${listingId}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//         return;
//       }
//       setUserListings((prev) =>
//         prev.filter((listing) => listing._id !== listingId)
//       );
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   if (loading) {
//     return <div className="text-center p-6">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500 text-center p-6">{error}</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-semibold mb-6">My Listings</h1>
//       {userListings.length === 0 ? (
//         <div className="text-center">
//           <p className="mb-4">You haven't created any listings yet.</p>
//           <Link
//             to="/create-listing"
//             className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800"
//           >
//             Create a Listing
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {userListings.map((listing) => (
//             <div
//               key={listing._id}
//               className="bg-white rounded-lg shadow-md overflow-hidden"
//             >
//               <img
//                 src={listing.imageUrls[0]}
//                 alt={listing.name}
//                 className="h-48 w-full object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold mb-2 truncate">
//                   {listing.name}
//                 </h3>
//                 <p className="text-gray-600 mb-2 truncate">
//                   {listing.address}
//                 </p>
//                 <p className="text-gray-800 mb-2">
//                   ${listing.regularPrice.toLocaleString()}
//                   {listing.type === 'rent' && ' / month'}
//                 </p>
//                 <div className="flex gap-2">
//                   <Link
//                     to={`/update-listing/${listing._id}`}
//                     className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 flex-1 text-center"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDeleteListing(listing._id)}
//                     className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 flex-1"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// Profile.jsx component remains the same as before...

// MyListings.jsx
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MyListings() {
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          return;
        }
        setUserListings(data);
      } catch (error) {
        setError('Failed to fetch listings');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?._id) {
      fetchUserListings();
    }
  }, [currentUser?._id]);

  const handleDeleteClick = (listing) => {
    setListingToDelete(listing);
    setShowDeleteModal(true);
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Delete Listing</h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete "{listingToDelete?.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteListing(listingToDelete?._id)}
                className="px-4 py-2 bg-red-900/20 text-red-400 rounded-lg hover:bg-red-900/40 transition border border-red-400"
              >
                Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="border-b border-slate-700 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            My Listings
          </h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Create Listing Button */}
        <div className="mb-8 text-center">
          <Link
            to="/create-listing"
            className="inline-block bg-amber-400 text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-amber-300 transition shadow-lg"
          >
            Create New Listing
          </Link>
        </div>

        {userListings.length === 0 ? (
          <div className="text-center">
            <p className="text-white text-xl mb-6">You haven't created any listings yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-400 transition group"
              >
                <Link to={`/listing/${listing._id}`}>
                  <div className="relative h-48">
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-slate-900/80 px-3 py-1 rounded-full">
                      <span className="text-amber-400 font-semibold">
                        ${listing.regularPrice.toLocaleString()}
                        {listing.type === 'rent' && '/month'}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  <Link to={`/listing/${listing._id}`}>
                    <h3 className="text-xl font-semibold text-amber-400 mb-2 hover:text-amber-300">
                      {listing.name}
                    </h3>
                  </Link>
                  <p className="text-slate-400 mb-4">{listing.address}</p>
                  
                  <div className="flex gap-3">
                    <Link
                      to={`/update-listing/${listing._id}`}
                      className="flex-1"
                    >
                      <button className="w-full px-4 py-2 bg-slate-700 text-amber-400 rounded-lg hover:bg-slate-600 transition border border-amber-400">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(listing)}
                      className="flex-1 px-4 py-2 bg-red-900/20 text-red-400 rounded-lg hover:bg-red-900/40 transition border border-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Profile Link */}
        <div className="mt-8 text-center">
          <Link
            to="/profile"
            className="text-amber-400 hover:text-amber-300 transition"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}