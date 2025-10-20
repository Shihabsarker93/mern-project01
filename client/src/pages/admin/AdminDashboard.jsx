import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminNav from '../../components/admin/AdminNav';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const { currentAdmin } = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/dashboard');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <AdminNav />
      <div className='p-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Admin Dashboard</h1>

        <div className='flex flex-wrap gap-4'>
          <div className='flex-1 min-w-[300px] bg-slate-100 p-4 rounded-lg'>
            <h2 className='text-xl font-semibold mb-4'>User Statistics</h2>
            <div className='flex flex-col gap-2'>
              <p>Total Users: {stats?.users.total}</p>
              <p>Banned Users: {stats?.users.banned}</p>
              <p>Warned Users: {stats?.users.warned}</p>
            </div>
          </div>

          <div className='flex-1 min-w-[300px] bg-slate-100 p-4 rounded-lg'>
            <h2 className='text-xl font-semibold mb-4'>Listing Statistics</h2>
            <div className='flex flex-col gap-2'>
              <p>Total Listings: {stats?.listings.total}</p>
              <p>For Sale: {stats?.listings.sale}</p>
              <p>For Rent: {stats?.listings.rent}</p>
            </div>
          </div>
        </div>

        <div className='mt-6 bg-slate-100 p-4 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>Recent Listings</h2>
          <div className='flex flex-col gap-4'>
            {stats?.recentListings.map((listing) => (
              <div key={listing._id} className='flex justify-between items-center bg-white p-3 rounded-lg'>
                <div>
                  <p className='font-semibold'>{listing.name}</p>
                  <p className='text-sm text-gray-500'>by {listing.userRef.username}</p>
                </div>
                <Link
                  to={`/admin/listing/${listing._id}`}
                  className='text-blue-700 hover:underline'
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

