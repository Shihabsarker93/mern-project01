// //Shihab

// import { useSelector } from 'react-redux';// user

// import { useRef, useState, useEffect } from 'react';
// //firebase to sotre images
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../firebase';
// import {
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
//   deleteUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
//   signOutUserStart,
// } from '../redux/user/userSlice';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';

// export default function Profile() {
//   const fileRef = useRef(null);
//   const { currentUser, loading, error } = useSelector((state) => state.user); //user
//   const [file, setFile] = useState(undefined);//image inital 0
//   const [filePerc, setFilePerc] = useState(0);// 0 to 100 percent upload initally 0
//   const [fileUploadError, setFileUploadError] = useState(false);

//   const [formData, setFormData] = useState({}); //change
//   const [updateSuccess, setUpdateSuccess] = useState(false);//initally updateuser false statement

//   const [showListingsError, setShowListingsError] = useState(false);
//   const [userListings, setUserListings] = useState([]);
//   const dispatch = useDispatch();

//   // image upload 1...
//   useEffect(() => {
//     if (file) {
//       handleFileUpload(file);
//     }
//   }, [file]);

//   const handleFileUpload = (file) => {
//     const storage = getStorage(app); //image imported from firebase exported  
//     const fileName = new Date().getTime() + file.name; //unique file name
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);//uplaod percentage

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setFilePerc(Math.round(progress));// perecent
//       },
//       (error) => {
//         setFileUploadError(true);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
//           setFormData({ ...formData, avatar: downloadURL })
//         );
//       }
//     );
//   };

//   // update username , pass, email
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//         return;
//       }

//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }
//   };
//  //delete usesr// no text returing as delte method
//   const handleDeleteUser = async () => {
//     try {
//       dispatch(deleteUserStart());
//       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       dispatch(signOutUserStart());
//       const res = await fetch('/api/auth/signout');
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };

//   const handleShowListings = async () => {
//     try {
//       setShowListingsError(false);
//       const res = await fetch(`/api/user/listings/${currentUser._id}`);
//       const data = await res.json();
//       if (data.success === false) {
//         setShowListingsError(true);
//         return;
//       }

//       setUserListings(data);
//     } catch (error) {
//       setShowListingsError(true);
//     }
//   };

//   const handleListingDelete = async (listingId) => {
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

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900">
//       {/* Hero Section */}
//       <div className="border-b border-slate-700 py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
//             Profile Dashboard
//           </h1>
//           <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto py-12 px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Profile Info & Quick Actions */}
//           <div className="lg:col-span-1">
//             <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
//               {/* Profile Image */}
//               <div className="text-center">
//                 <input
//                   onChange={(e) => setFile(e.target.files[0])}
//                   type="file"
//                   ref={fileRef}
//                   hidden
//                   accept="image/*"
//                 />
//                 <img
//                   onClick={() => fileRef.current.click()}
//                   src={formData.avatar || currentUser.avatar}
//                   alt="profile"
//                   className="w-40 h-40 rounded-full mx-auto border-4 border-amber-400 cursor-pointer object-cover hover:opacity-90 transition"
//                 />
//                 <p className="text-sm mt-4">
//                   {fileUploadError ? ( //handle the uplaod
//                     <span className="text-red-400">
//                       Error Image upload (image must be less than 2 mb)
//                     </span>
//                   ) : filePerc > 0 && filePerc < 100 ? ( //if 0><100 lodaing
//                     <span className="text-amber-400">{`Uploading ${filePerc}%`}</span>
//                   ) : filePerc === 100 ? (
//                     <span className="text-green-400">Image successfully uploaded!</span>
//                   ) : (
//                     <span className="text-slate-400">Click to change profile picture</span>
//                   )}
//                 </p>
//               </div>

//               {/* Quick Actions */}
//               <div className="mt-8 space-y-4">
//                 <Link
//                   to="/create-listing"
//                   className="block w-full bg-amber-400 text-slate-900 py-4 rounded-xl text-center font-semibold hover:bg-amber-300 transition shadow-lg"
//                 >
//                   Create New Listing
//                 </Link>
//                 <button
//                   onClick={handleShowListings}
//                   className="block w-full bg-slate-700 text-amber-400 py-4 rounded-xl text-center font-semibold hover:bg-slate-600 transition border border-amber-400"
//                 >
//                   Show My Listings
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Center & Right Columns - Form & Listings */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Profile Form */}
//             <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
//               <h2 className="text-2xl font-bold text-white mb-6">Update Profile</h2>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="space-y-4">
//                   <input
//                     type="text"
//                     placeholder="Username"
//                     defaultValue={currentUser.username}
//                     id="username"
//                     className="w-full px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
//                     onChange={handleChange}
//                   />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     id="email"
//                     defaultValue={currentUser.email}
//                     className="w-full px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
//                     onChange={handleChange}
//                   />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     id="password"
//                     className="w-full px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <button
//                     disabled={loading}
//                     className="bg-amber-400 text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-amber-300 transition disabled:opacity-70 shadow-lg"
//                   >
//                     {loading ? 'Loading...' : 'Update Profile'} 
//                   </button> 
                  
//                   <div className="flex gap-4">
//                     <button
//                       onClick={handleDeleteUser}
//                       type="button"
//                       className="text-red-400 hover:text-red-300 font-medium"
//                     >
//                       Delete Account
//                     </button>
//                     <button
//                       onClick={handleSignOut}
//                       type="button"
//                       className="text-red-400 hover:text-red-300 font-medium"
//                     >
//                       Sign Out
//                     </button>
//                   </div>
//                 </div>
//               </form>

//               {/* Status Messages */} {/*Update user succesfully using updateSuccess*/}
//               {error && <p className="mt-4 text-red-400">{error}</p>}
//               {updateSuccess && (
//                 <p className="mt-4 text-green-400">Profile updated successfully!</p>
//               )}
//             </div>

//             {/* Listings Section */}
//             {showListingsError && (
//               <p className="text-red-400">Error showing listings</p>
//             )}

//             {userListings && userListings.length > 0 && (
//               <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
//                 <h2 className="text-2xl font-bold text-white mb-6">Your Listings</h2>
//                 <div className="space-y-4">
//                   {userListings.map((listing) => (
//                     <div
//                       key={listing._id}
//                       className="bg-slate-900 rounded-xl p-4 flex items-center gap-6 border border-slate-700 hover:border-amber-400 transition group"
//                     >
//                       <Link to={`/listing/${listing._id}`} className="flex-shrink-0">
//                         <img
//                           src={listing.imageUrls[0]}
//                           alt="listing cover"
//                           className="h-24 w-24 object-cover rounded-lg"
//                         />
//                       </Link>
//                       <div className="flex-1 min-w-0">
//                         <Link
//                           to={`/listing/${listing._id}`}
//                           className="text-amber-400 font-semibold hover:text-amber-300 text-lg"
//                         >
//                           <p className="truncate">{listing.name}</p>
//                         </Link>
//                         <p className="text-slate-400 truncate mt-1">
//                           {listing.address}
//                         </p>
//                       </div>
//                       <div className="flex gap-3">
//                         <Link to={`/update-listing/${listing._id}`}>
//                           <button className="px-4 py-2 bg-slate-800 text-amber-400 rounded-lg hover:bg-slate-700 transition border border-amber-400">
//                             Edit
//                           </button>
//                         </Link>
//                         <button
//                           onClick={() => handleListingDelete(listing._id)}
//                           className="px-4 py-2 bg-red-900/20 text-red-400 rounded-lg hover:bg-red-900/40 transition border border-red-400"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  // Keeping all the existing state and handlers
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showGoodbye, setShowGoodbye] = useState(false);
  const dispatch = useDispatch();
  const [showNoListingsModal, setShowNoListingsModal] = useState(false);

  // Keep all the existing useEffects and handlers
  useEffect(() => {
    setFormData({ ...currentUser });
  }, [currentUser]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // All existing handlers remain the same
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          handleUpdateAvatar(downloadURL);
        });
      }
    );
  };

  // Keep all other handlers...
  const handleUpdateAvatar = async (avatarUrl) => {
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: avatarUrl }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    setShowGoodbye(true);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        setShowGoodbye(false);
        return;
      }
      setTimeout(() => {
        dispatch(deleteUserSuccess(data));
      }, 2000);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      setShowGoodbye(false);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
      {/* Modals remain the same */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-xl max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Delete Account</h3>
            <p className="text-slate-300 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={handleDeleteUser}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-500"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-slate-600 text-white py-2 rounded-lg hover:bg-slate-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Profile Dashboard</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Profile Image */}
          <div className="bg-slate-800 rounded-xl p-8 shadow-xl border border-slate-700">
            <div className="text-center mb-8">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
              />
              <img
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser.avatar}
                alt="profile"
                className="w-40 h-40 rounded-full mx-auto border-4 border-amber-400 cursor-pointer object-cover hover:opacity-90 transition"
              />
              <button
                onClick={() => fileRef.current.click()}
                className="mt-4 w-full bg-amber-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-amber-500 transition shadow-lg"
              >
                Change Profile Picture
              </button>
              <p className="text-sm mt-2">
                {fileUploadError ? (
                  <span className="text-red-400">Error Image upload (image must be less than 2 mb)</span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-amber-400">{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span className="text-green-400">Image successfully uploaded!</span>
                ) : (
                  ''
                )}
              </p>
            </div>
          </div>

          {/* Right Column - Action Buttons */}
          <div className="bg-slate-800 rounded-xl p-8 shadow-xl border border-slate-700">
            <div className="space-y-4">
              <Link
                to="/update-profile"
                className="block w-full bg-amber-500 text-white py-4 rounded-xl text-center font-semibold hover:bg-amber-400 transition shadow-lg"
              >
                Update Profile Information
              </Link>
              <Link
                to="/create-listing"
                className="block w-full bg-amber-600 text-white py-4 rounded-xl text-center font-semibold hover:bg-amber-500 transition shadow-lg"
              >
                Create New Listing
              </Link>
              <Link
                to="/my-listings"
                className="block w-full bg-amber-700 text-white py-4 rounded-xl text-center font-semibold hover:bg-amber-600 transition shadow-lg"
              >
                View My Listings
              </Link>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full bg-red-800 text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition shadow-lg"
              >
                Delete Account
              </button>
              <button
                onClick={handleSignOut}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-500 transition shadow-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

