import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validation checks
      if (formData.imageUrls.length < 1) {
        return setError('You must upload at least one image');
      }
      if (+formData.regularPrice < +formData.discountPrice) {
        return setError('Discount price must be lower than regular price');
      }

      // Debugging logs
      console.log('Current User:', currentUser);
      console.log('Form Data:', formData);

      setLoading(true);
      setError(false);

      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for sending cookies/auth headers
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      // Check response status
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await res.json();
      setLoading(false);

      // Debugging
      console.log('Server Response:', data);

      navigate(`/listing/${data._id}`);
    } catch (error) {
      console.error('Submission Error:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="border-b border-slate-700 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Create a New Listing
          </h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-8"></div>
        </div>
      </div>

      {/* Main Form Section */}
      <main className="p-6 max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-8 text-slate-200">
          <div className="flex flex-col gap-6 flex-1">
            <input
              type="text"
              placeholder="Property Name"
              className="border border-slate-600 p-4 rounded-xl bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 text-white"
              id="name"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border border-slate-600 p-4 rounded-xl bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 text-white"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              className="border border-slate-600 p-4 rounded-xl bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 text-white"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
            />
            
            {/* Checkboxes for parking debugged  */} 
            <div className="flex gap-6 flex-wrap">
            {[
                  { id: 'sale', label: 'Sale' },
                  { id: 'rent', label: 'Rent' },
                  { id: 'parking', label: 'Parking' },
                  { id: 'furnished', label: 'Furnished' },
                  { id: 'offer', label: 'Offer' }
                ].map((item) => (
                  <div key={item.id} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      id={item.id}
                      className="w-5 h-5 rounded border-slate-600 text-amber-400 focus:ring-amber-400 bg-slate-800"
                      onChange={handleChange}
                      checked={
                        item.id === 'sale' || item.id === 'rent'
                          ? formData.type === item.id
                          : formData[item.id]
                      }
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
            </div>

            {/* Number Inputs */}
            <div className="flex gap-6 flex-wrap">
              {[
                { id: 'bedrooms', label: 'Bedrooms', min: 1, max: 10 },
                { id: 'bathrooms', label: 'Bathrooms', min: 1, max: 10 },
                { id: 'regularPrice', label: 'Regular Price', min: 50, max: 10000000 },
                formData.offer && {
                  id: 'discountPrice',
                  label: 'Discounted Price',
                  min: 0,
                  max: 10000000,
                },
              ]
                .filter(Boolean)
                .map((field) => (
                  <div key={field.id} className="flex flex-col items-center gap-2">
                    <input
                      type="number"
                      id={field.id}
                      min={field.min}
                      max={field.max}
                      required
                      className="p-4 border border-slate-600 rounded-lg bg-slate-800 text-white focus:ring-2 focus:ring-amber-400"
                      onChange={handleChange}
                      value={formData[field.id]}
                    />
                    <p className="text-center">{field.label}</p>
                    {(field.id === 'regularPrice' || field.id === 'discountPrice') &&
                      formData.type === 'rent' && (
                        <span className="text-xs text-slate-400">($ / month)</span>
                      )}
                  </div>
                ))}
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="flex flex-col flex-1 gap-6">
            <p className="font-semibold text-amber-400">
              Images:
              <span className="font-normal text-slate-400 ml-2">
                The first image will be the cover (max 6 images)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="p-4 border border-slate-600 rounded-xl w-full bg-slate-800 text-slate-200 file:bg-amber-400 file:text-slate-900 file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:cursor-pointer hover:file:bg-amber-300"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="p-4 text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-300 focus:outline-none disabled:opacity-70"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            <p className="text-red-400 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 && (
              <div className="mt-4 space-y-4">
                {formData.imageUrls.map((url, index) => (
                  <div
                    key={url}
                    className="flex justify-between items-center p-4 border border-slate-600 rounded-xl bg-slate-800"
                  >
                    <img
                      src={url}
                      alt="listing"
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-2 text-red-400 rounded-lg hover:text-red-300 focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || uploading}
              className="p-4 bg-amber-400 text-slate-900 rounded-lg w-full hover:bg-amber-300 focus:outline-none disabled:opacity-70 font-semibold"
            >
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">
            {error}
          </p>
        )}
      </main>
    </div>
  );
}
