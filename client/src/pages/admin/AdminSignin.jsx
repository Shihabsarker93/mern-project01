// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { adminSignInStart, adminSignInSuccess, adminSignInFailure } from '../redux/admin/adminSlice';

// export default function AdminSignin() {
//   const [formData, setFormData] = useState({});
//   const { loading, error } = useSelector((state) => state.admin);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(adminSignInStart());
//       const res = await fetch('/api/admin/signin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(adminSignInFailure(data.message));
//         return;
//       }
//       dispatch(adminSignInSuccess(data));
//       navigate('/admin/dashboard');
//     } catch (error) {
//       dispatch(adminSignInFailure(error.message));
//     }
//   };

//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl text-center font-semibold my-7'>Admin Sign In</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input
//           type='email'
//           placeholder='Email'
//           className='border p-3 rounded-lg'
//           id='email'
//           onChange={handleChange}
//         />
//         <input
//           type='password'
//           placeholder='Password'
//           className='border p-3 rounded-lg'
//           id='password'
//           onChange={handleChange}
//         />
//         <button
//           disabled={loading}
//           className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//         >
//           {loading ? 'Loading...' : 'Sign In'}
//         </button>
//       </form>
//       {error && <p className='text-red-500 mt-5'>{error}</p>}
//     </div>
//   );
// }

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminSignInStart, adminSignInSuccess, adminSignInFailure } from '../../redux/admin/adminSlice';

export default function AdminSignin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(adminSignInStart());
      const res = await fetch('/api/admin/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(adminSignInFailure(data.message));
        return;
      }
      localStorage.setItem('token', data.token); // Save token for authenticated routes
      dispatch(adminSignInSuccess(data));
      navigate('/admin/dashboard'); // Redirect to admin dashboard
    } catch (error) {
      dispatch(adminSignInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Admin Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
