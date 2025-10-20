// SignIn.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});

  const { loading, error } = useSelector((state) => state.user); //both in one globally diclared 

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
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message)); //diff signup  handling by redux
        return;
      }
      dispatch(signInSuccess(data)); //handling by redux toolkit diff signup
      navigate('/');// navigate to homepage after signin
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen bg-neutral-900 py-16'>
      <div className='max-w-lg mx-auto px-4'>
        <h1 className='text-4xl text-center font-bold text-white mb-6'>Sign In</h1>
        <div className='w-24 h-1 bg-amber-400 mx-auto mb-8'></div>
        
        <div className='bg-neutral-800 p-8 rounded-2xl shadow-xl border border-neutral-700'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              type='email'
              placeholder='Email'
              className='bg-neutral-900 border border-neutral-700 p-3 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400 transition-colors'
              id='email'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Password'
              className='bg-neutral-900 border border-neutral-700 p-3 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400 transition-colors'
              id='password'
              onChange={handleChange}
            />

            <button
              disabled={loading}
              className='bg-amber-400 text-white p-3 rounded-xl uppercase font-semibold hover:bg-amber-500 disabled:opacity-80 transition-colors duration-300 mt-2'
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
            <OAuth/>
          </form>
          
          <div className='flex gap-2 mt-6 justify-center text-neutral-300'>
            <p>Dont have an account?</p> 
            <Link to={'/sign-up'}>
              <span className='text-amber-400 hover:text-amber-300 transition-colors'>Sign up</span>
            </Link>
          </div>
          
          {error && <p className='text-red-500 text-center mt-5'>{error}</p>}
        </div>
      </div>
    </div>
  );
}
