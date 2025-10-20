import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../redux/user/userSlice';

export default function UpdateProfile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 py-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Update Your Profile
          </h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
        </div>

        {/* Update Form Card */}
        <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-white mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  defaultValue={currentUser.username}
                  id="username"
                  className="w-full px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  defaultValue={currentUser.email}
                  className="w-full px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-white mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Leave blank to keep current password"
                  id="password"
                  className="w-full px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="flex-1 bg-slate-700 text-white py-4 rounded-xl font-semibold hover:bg-slate-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-amber-400 text-slate-900 py-4 rounded-xl font-semibold hover:bg-amber-300 transition disabled:opacity-70 shadow-lg"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>

          {/* Status Messages */}
          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-400 rounded-lg">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}
          {updateSuccess && (
            <div className="mt-4 p-4 bg-green-900/20 border border-green-400 rounded-lg">
              <p className="text-green-400 text-center">
                Profile updated successfully! Redirecting...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
