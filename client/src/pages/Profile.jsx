//SHIHAB


  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="border-b border-slate-700 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Profile Dashboard
          </h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info & Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
              {/* Profile Image */}
              <div className="text-center">
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
                <p className="text-sm mt-4">
                  { ? ( //handle the uplaod
                    <span className="text-red-400">
                      Error Image upload (image must be less than 2 mb)
                    </span>
                  ) : filePerc > 0 && filePerc < 100 ? ( //if 0><100 lodaing
                    <span className="text-amber-400">{`Uploading ${filePerc}%`}</span>
                  ) : filePerc === 100 ? (
                    <span className="text-green-400">Image successfully uploaded!</span>
                  ) : (
                    <span className="text-slate-400">Click to change profile picture</span>
                  )}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-4">
                <Link
                  to="/create-listing"
                  className="block w-full bg-amber-400 text-slate-900 py-4 rounded-xl text-center font-semibold hover:bg-amber-300 transition shadow-lg"
                >
                  Create New Listing
                </Link>
                <button
                  onClick={}
                  className="block w-full bg-slate-700 text-amber-400 py-4 rounded-xl text-center font-semibold hover:bg-slate-600 transition border border-amber-400"
                >
                  Show My Listings
                </button>
              </div>
            </div>
          </div>

          {/* Center & Right Columns - Form & Listings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Form */}
            <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Update Profile</h2>
              <form onSubmit={} className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Username"
                    defaultValue={currentUser.username}
                    id="username"
                    className="w-full px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    onChange={}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    defaultValue={currentUser.email}
                    className="w-full px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    onChange={}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="w-full px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    onChange={}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button
                    disabled={loading}
                    className="bg-amber-400 text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-amber-300 transition disabled:opacity-70 shadow-lg"
                  >
                    {loading ? 'Loading...' : 'Update Profile'} 
                  </button> 
                  
                  <div className="flex gap-4">
                    <button
                      onClick={}
                      type="button"
                      className="text-red-400 hover:text-red-300 font-medium"
                    >
                      Delete Account
                    </button>
                    <button
                      onClick={}
                      type="button"
                      className="text-red-400 hover:text-red-300 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </form>

              {/* Status Messages */} {/*Update user succesfully using updateSuccess*/}
              {error && <p className="mt-4 text-red-400">{error}</p>}
              {updateSuccess && (
                <p className="mt-4 text-green-400">Profile updated successfully!</p>
              )}
            </div>

            {/* Listings Section */}
            {showListingsError && (
              <p className="text-red-400">Error showing listings</p>
            )}

            {userListings && userListings.length > 0 && (
              <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">Your Listings</h2>
                <div className="space-y-4">
                  {userListings.map((listing) => (
                    <div
                      key={listing._id}
                      className="bg-slate-900 rounded-xl p-4 flex items-center gap-6 border border-slate-700 hover:border-amber-400 transition group"
                    >
                      <Link to={`/listing/${listing._id}`} className="flex-shrink-0">
                        <img
                          src={listing.imageUrls[0]}
                          alt="listing cover"
                          className="h-24 w-24 object-cover rounded-lg"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/listing/${listing._id}`}
                          className="text-amber-400 font-semibold hover:text-amber-300 text-lg"
                        >
                          <p className="truncate">{listing.name}</p>
                        </Link>
                        <p className="text-slate-400 truncate mt-1">
                          {listing.address}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Link to={`/update-listing/${listing._id}`}>
                          <button className="px-4 py-2 bg-slate-800 text-amber-400 rounded-lg hover:bg-slate-700 transition border border-amber-400">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => (listing._id)}
                          className="px-4 py-2 bg-red-900/20 text-red-400 rounded-lg hover:bg-red-900/40 transition border border-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
