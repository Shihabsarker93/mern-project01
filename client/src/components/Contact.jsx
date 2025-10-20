import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    toast.success("Email client opened to contact the owner!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "navy", // Navy blue background
        color: "white", // White text color
      },
    });
  };

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            
            <span className='font-semibold text-white'>Contact</span>{' '}
            <span className='font-semibold text-white'>{landlord.name}</span>{' '}
            <span className='font-semibold text-white'>{landlord.email}</span>{' '}
            <span className='font-semibold text-white'>For the property </span>{' '}
            <span className='font-semibold text-white'>{listing.name.toLowerCase()}</span>

          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg bg-blue text-black' // Changed background and text color
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
            onClick={handleSendMessage}
          >
            Send Message
          </Link>
        </div>
      )}
      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}
