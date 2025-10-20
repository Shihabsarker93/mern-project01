//create listing ->update listing

import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();// extra 
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

  useEffect(() => { // use the previous information
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

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
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center my-10 relative pb-4">
          Update Your Listing
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-amber-400"/>
        </h1>

        <form onSubmit={handleSubmit} className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 shadow-2xl flex flex-col lg:flex-row gap-8 border border-slate-700">
          <div className="flex flex-col gap-6 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="bg-slate-900/50 border-2 border-slate-700 p-4 rounded-lg focus:border-amber-400 focus:outline-none transition-colors text-lg text-white"
              id="name"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              placeholder="Description"
              className="bg-slate-900/50 border-2 border-slate-700 p-4 rounded-lg focus:border-amber-400 focus:outline-none transition-colors min-h-[150px] text-lg text-white"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              className="bg-slate-900/50 border-2 border-slate-700 p-4 rounded-lg focus:border-amber-400 focus:outline-none transition-colors text-lg text-white"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
            />

            <div className="flex gap-8 flex-wrap">
              {[
                { id: 'sale', label: 'Sell' },
                { id: 'rent', label: 'Rent' },
                { id: 'parking', label: 'Parking spot' },
                { id: 'furnished', label: 'Furnished' },
                { id: 'offer', label: 'Offer' },
              ].map(({ id, label }) => (
                <div key={id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={id}
                    className="w-6 h-6 rounded border-2 border-amber-400 checked:bg-amber-400 focus:ring-amber-400"
                    onChange={handleChange}
                    checked={
                      id === 'sale' || id === 'rent'
                        ? formData.type === id
                        : formData[id]
                    }
                  />
                  <span className="text-white text-lg">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-8">
              {[
                { id: 'bedrooms', label: 'Beds', min: 1, max: 10 },
                { id: 'bathrooms', label: 'Baths', min: 1, max: 10 },
                { id: 'regularPrice', label: 'Regular price', min: 50, max: 10000000 },
              ].map(({ id, label, min, max }) => (
                <div key={id} className="flex items-center gap-3">
                  <input
                    type="number"
                    id={id}
                    min={min}
                    max={max}
                    required
                    className="bg-slate-900/50 border-2 border-slate-700 p-4 rounded-lg focus:border-amber-400 focus:outline-none transition-colors w-32 text-lg text-white"
                    onChange={handleChange}
                    value={formData[id]}
                  />
                  <div className="flex flex-col">
                    <p className="text-white text-lg">{label}</p>
                    {id === 'regularPrice' && formData.type === 'rent' && (
                      <span className="text-sm text-slate-400">($ / month)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-6">
            <div className="text-white">
              <p className="text-xl font-semibold">Images</p>
              <p className="text-slate-400 mt-2">
                The first image will be the cover (max 6)
              </p>
            </div>

            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="bg-slate-900/50 border-2 border-slate-700 p-4 rounded-lg focus:border-amber-400 focus:outline-none transition-colors flex-1 text-white"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="px-6 py-4 border-2 border-amber-400 text-amber-400 rounded-lg hover:bg-amber-400 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>

            {imageUploadError && (
              <p className="text-red-500 text-lg text-center">{imageUploadError}</p>
            )}

            <div className="space-y-4">
              {formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between items-center p-4 bg-slate-900/50 rounded-lg border border-slate-700"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="w-24 h-24 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="px-6 py-3 text-red-500 hover:text-red-400 transition-colors text-lg"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <button
              disabled={loading || uploading}
              className="mt-6 p-4 bg-amber-400 text-slate-900 rounded-lg text-lg font-semibold hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update listing'}
            </button>

            {error && (
              <p className="text-red-500 text-lg text-center mt-2">{error}</p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
