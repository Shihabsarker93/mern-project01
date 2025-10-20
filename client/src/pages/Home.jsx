

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-7xl font-extrabold leading-tight">
              Discover Your
              <span className="block text-amber-400">Luxury Home</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-lg">
              Welcome to an exclusive collection of premium properties. Where luxury meets lifestyle.
            </p>
            <Link
              to={'/search'}
              className="inline-block px-8 py-4 bg-amber-400 text-slate-900 rounded-lg font-semibold hover:bg-amber-300 transition-colors duration-300"
            >
              Explore Properties
            </Link>
          </div>
          <div className="hidden md:block md:w-1/2">
            {/* Decorative element space */}
          </div>
        </div>
      </div>

      {/* Exclusive Offers Section */}
      {offerListings && offerListings.length > 0 && (
        <div className="bg-slate-900 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Exclusive Offers
              </h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {offerListings.map((listing) => (
                <div key={listing._id} className="group">
                  <div className="bg-slate-800 rounded-xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-2">
                    <div className="relative h-64">
                      <img 
                        src={listing.imageUrls[0]} 
                        alt={listing.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-amber-400 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold">
                        Special Offer
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{listing.name}</h3>
                      <p className="text-slate-300 mb-4">{listing.description?.substring(0, 100)}...</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-amber-600">${listing.regularPrice.toLocaleString()}</span>
                        <Link
                          to={`/listing/${listing._id}`}
                          className="px-4 py-2 bg-amber-400 text-slate-900 rounded-lg hover:bg-amber-300 transition-colors duration-300"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Premium Rentals Section */}
      {rentListings && rentListings.length > 0 && (
        <div className="bg-slate-900 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Premium Rentals
              </h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {rentListings.map((listing) => (
                <div key={listing._id} className="group">
                  <div className="bg-slate-800 rounded-xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-2">
                    <div className="relative h-64">
                      <img 
                        src={listing.imageUrls[0]} 
                        alt={listing.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-2">{listing.name}</h3>
                        <div className="flex items-center text-amber-400">
                          <span className="text-lg font-semibold">${listing.regularPrice}/month</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="flex items-center text-slate-300">
                            <span>{listing.bedrooms} Bedrooms</span>
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span>{listing.bathrooms} Bathrooms</span>
                          </div>
                        </div>
                        <Link
                          to={`/listing/${listing._id}`}
                          className="px-4 py-2 bg-amber-400 text-slate-900 rounded-lg hover:bg-amber-300 transition-colors duration-300"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Luxury Properties for Sale Section */}
      {saleListings && saleListings.length > 0 && (
        <div className="bg-slate-900 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Luxury Properties for Sale
              </h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {saleListings.map((listing) => (
                <div key={listing._id} className="group">
                  <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2">
                    <div className="relative h-64">
                      <img 
                        src={listing.imageUrls[0]} 
                        alt={listing.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-slate-900 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        For Sale
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{listing.name}</h3>
                      <p className="text-slate-300 mb-4">{listing.description?.substring(0, 100)}...</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-amber-600">${listing.regularPrice.toLocaleString()}</span>
                        <Link
                          to={`/listing/${listing._id}`}
                          className="px-4 py-2 bg-amber-400 text-slate-900 rounded-lg hover:bg-amber-300 transition-colors duration-300"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


