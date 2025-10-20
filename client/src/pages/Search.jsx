// import { useEffect, useState } from 'react';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import ListingItem from '../components/ListingItem';

// export default function Search() {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [sidebardata, setSidebardata] = useState({
//     searchTerm: '',
//     type: 'all',
//     parking: false,
//     furnished: false,
//     offer: false,
//     sort: 'created_at',
//     order: 'desc',
//   });

//   const [loading, setLoading] = useState(false);
//   const [listings, setListings] = useState([]);
//   const [showMore, setShowMore] = useState(false);

//   useEffect(() => {
//     let isMounted = true;
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     const typeFromUrl = urlParams.get('type');
//     const parkingFromUrl = urlParams.get('parking');
//     const furnishedFromUrl = urlParams.get('furnished');
//     const offerFromUrl = urlParams.get('offer');
//     const sortFromUrl = urlParams.get('sort');
//     const orderFromUrl = urlParams.get('order');

//     if (
//       searchTermFromUrl ||
//       typeFromUrl ||
//       parkingFromUrl ||
//       furnishedFromUrl ||
//       offerFromUrl ||
//       sortFromUrl ||
//       orderFromUrl
//     ) {
//       setSidebardata({
//         searchTerm: searchTermFromUrl || '',
//         type: typeFromUrl || 'all',
//         parking: parkingFromUrl === 'true' ? true : false,
//         furnished: furnishedFromUrl === 'true' ? true : false,
//         offer: offerFromUrl === 'true' ? true : false,
//         sort: sortFromUrl || 'created_at',
//         order: orderFromUrl || 'desc',
//       });
//     }

//     const fetchListings = async () => {
//       if (!isMounted) return;
//       setLoading(true);
//       setShowMore(false);
//       try {
//         const searchQuery = urlParams.toString();
//         const res = await fetch(`/api/listing/get?${searchQuery}`);
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data = await res.json();
//         if (isMounted) {
//           if (data.length > 8) {
//             setShowMore(true);
//           } else {
//             setShowMore(false);
//           }
//           setListings(data);
//         }
//       } catch (error) {
//         console.error('Error fetching listings:', error);
//         if (isMounted) {
//           setListings([]);
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchListings();

//     return () => {
//       isMounted = false;
//     };
//   }, [location.search]);

//   const handleChange = (e) => {
//     if (
//       e.target.id === 'all' ||
//       e.target.id === 'rent' ||
//       e.target.id === 'sale'
//     ) {
//       setSidebardata({ ...sidebardata, type: e.target.id });
//     }

//     if (e.target.id === 'searchTerm') {
//       setSidebardata({ ...sidebardata, searchTerm: e.target.value });
//     }

//     if (
//       e.target.id === 'parking' ||
//       e.target.id === 'furnished' ||
//       e.target.id === 'offer'
//     ) {
//       setSidebardata({
//         ...sidebardata,
//         [e.target.id]:
//           e.target.checked || e.target.checked === 'true' ? true : false,
//       });
//     }

//     if (e.target.id === 'sort_order') {
//       const sort = e.target.value.split('_')[0] || 'created_at';
//       const order = e.target.value.split('_')[1] || 'desc';
//       setSidebardata({ ...sidebardata, sort, order });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams();
//     urlParams.set('searchTerm', sidebardata.searchTerm);
//     urlParams.set('type', sidebardata.type);
//     urlParams.set('parking', sidebardata.parking);
//     urlParams.set('furnished', sidebardata.furnished);
//     urlParams.set('offer', sidebardata.offer);
//     urlParams.set('sort', sidebardata.sort);
//     urlParams.set('order', sidebardata.order);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   const onShowMoreClick = async () => {
//     try {
//       const numberOfListings = listings.length;
//       const startIndex = numberOfListings;
//       const urlParams = new URLSearchParams(location.search);
//       urlParams.set('startIndex', startIndex);
//       const searchQuery = urlParams.toString();
//       const res = await fetch(`/api/listing/get?${searchQuery}`);
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const data = await res.json();
//       if (data.length < 9) {
//         setShowMore(false);
//       }
//       setListings([...listings, ...data]);
//     } catch (error) {
//       console.error('Error loading more listings:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-16 border-b border-slate-700">
//         <div className="max-w-6xl mx-auto px-4">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
//             Find Your Perfect Property
//           </h1>
//           <div className="w-24 h-1 bg-amber-400 mx-auto mb-8"></div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Refined Sidebar */}
//           <div className="lg:w-1/3">
//             <div className="bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700">
//               <h2 className="text-2xl font-bold text-white mb-6">Refined Search</h2>
//               <form onSubmit={handleSubmit} className="space-y-8">
//                 {/* Search Input */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-slate-300">Property Search</label>
//                   <input
//                     type="text"
//                     id="searchTerm"
//                     placeholder="Search luxury properties..."
//                     className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-slate-400"
//                     value={sidebardata.searchTerm}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 {/* Property Type */}
//                 <div className="space-y-4">
//                   <label className="text-sm font-medium text-slate-300">Property Type</label>
//                   <div className="flex gap-4">
//                     {['all', 'rent', 'sale'].map((type) => (
//                       <label key={type} className="flex items-center">
//                         <input
//                           type="radio"
//                           id={type}
//                           name="type"
//                           className="w-4 h-4 text-amber-400 focus:ring-amber-400 bg-slate-700 border-slate-600"
//                           onChange={handleChange}
//                           checked={sidebardata.type === type}
//                         />
//                         <span className="ml-2 text-slate-300 capitalize">{type}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Amenities */}
//                 <div className="space-y-4">
//                   <label className="text-sm font-medium text-slate-300">Luxury Amenities</label>
//                   <div className="grid grid-cols-2 gap-4">
//                     {[
//                       { id: 'parking', label: 'Private Parking' },
//                       { id: 'furnished', label: 'Fully Furnished' },
//                       { id: 'offer', label: 'Special Offer' }
//                     ].map((amenity) => (
//                       <label key={amenity.id} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={amenity.id}
//                           className="w-4 h-4 text-amber-400 focus:ring-amber-400 bg-slate-700 border-slate-600"
//                           onChange={handleChange}
//                           checked={sidebardata[amenity.id]}
//                         />
//                         <span className="ml-2 text-slate-300">{amenity.label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Sort Options */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-slate-300">Sort By</label>
//                   <select
//                     onChange={handleChange}
//                     defaultValue={`${sidebardata.sort}_${sidebardata.order}`}
//                     id="sort_order"
//                     className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white"
//                   >
//                     <option value="regularPrice_desc">Price: High to Low</option>
//                     <option value="regularPrice_asc">Price: Low to High</option>
//                     <option value="createdAt_desc">Newest Listings</option>
//                     <option value="createdAt_asc">Oldest Listings</option>
//                   </select>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-amber-400 text-slate-900 py-4 px-6 rounded-lg font-semibold hover:bg-amber-500 transition-colors duration-300"
//                 >
//                   Search Properties
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Listings Section */}
//           <div className="lg:w-2/3">
//             <div className="bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700">
//               <div className="text-center mb-12">
//                 <h2 className="text-4xl font-bold text-white mb-4">Featured Properties</h2>
//                 <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
//               </div>

//               {/* Loading State */}
//               {loading && (
//                 <div className="flex justify-center items-center h-64">
//                   <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-400 border-t-transparent"></div>
//                 </div>
//               )}

//               {/* No Results */}
//               {!loading && listings.length === 0 && (
//                 <div className="text-center py-12">
//                   <p className="text-xl text-slate-400">No properties match your criteria</p>
//                 </div>
//               )}

//               {/* Listings Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {!loading &&
//                   listings &&
//                   listings.map((listing) => (
//                     <ListingItem key={listing._id} listing={listing} />
//                   ))}
//               </div>

//               {/* Show More Button */}
//               {showMore && (
//                 <div className="text-center mt-8">
//                   <button
//                     onClick={onShowMoreClick}
//                     className="inline-flex items-center px-6 py-3 border border-amber-400 text-amber-400 rounded-lg hover:bg-amber-400 hover:text-slate-900 transition-colors duration-300"
//                   >
//                     Load More Properties
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({ //inital states
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-16 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Find Your Perfect Property
          </h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-8"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Refined Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Refined Search</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Search Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Property Search</label>
                  <input
                    type="text"
                    id="searchTerm"
                    placeholder="Search luxury properties..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-slate-400"
                    value={sidebardata.searchTerm}
                    onChange={handleChange}
                  />
                </div>

                {/* Property Type */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-slate-300">Property Type</label>
                  <div className="flex gap-4">
                    {['all', 'rent', 'sale'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          id={type}
                          name="type"
                          className="w-4 h-4 text-amber-400 focus:ring-amber-400 bg-slate-700 border-slate-600"
                          onChange={handleChange}
                          checked={sidebardata.type === type}
                        />
                        <span className="ml-2 text-slate-300 capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-slate-300">Luxury Amenities</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'parking', label: 'Private Parking' },
                      { id: 'furnished', label: 'Fully Furnished' },
                      { id: 'offer', label: 'Special Offer' }
                    ].map((amenity) => (
                      <label key={amenity.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={amenity.id}
                          className="w-4 h-4 text-amber-400 focus:ring-amber-400 bg-slate-700 border-slate-600"
                          onChange={handleChange}
                          checked={sidebardata[amenity.id]}
                        />
                        <span className="ml-2 text-slate-300">{amenity.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Sort By</label>
                  <select
                    onChange={handleChange}
                    value={`${sidebardata.sort}_${sidebardata.order}`}
                    id="sort_order"
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white"
                  >
                    <option value="regularPrice_desc">Price: High to Low</option>
                    <option value="regularPrice_asc">Price: Low to High</option>
                    <option value="createdAt_desc">Newest Listings</option>
                    <option value="createdAt_asc">Oldest Listings</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-400 text-slate-900 py-4 px-6 rounded-lg font-semibold hover:bg-amber-500 transition-colors duration-300"
                >
                  Search Properties
                </button>
              </form>
            </div>
          </div>

          {/* Listings Section */}
          <div className="lg:w-2/3">
            <div className="bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Featured Properties</h2>
                <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-400 border-t-transparent"></div>
                </div>
              )}

              {/* No Results */}
              {!loading && listings.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-slate-400">No properties match your criteria</p>
                </div>
              )}

              {/* Listings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {!loading &&
                  listings &&
                  listings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))}
              </div>

              {/* Show More Button */}
              {showMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={onShowMoreClick}
                    className="inline-flex items-center px-6 py-3 border border-amber-400 text-amber-400 rounded-lg hover:bg-amber-400 hover:text-slate-900 transition-colors duration-300"
                  >
                    Load More Properties
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
