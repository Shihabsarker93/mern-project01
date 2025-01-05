
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
