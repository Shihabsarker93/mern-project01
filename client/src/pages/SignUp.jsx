// SignUp.jsx
//Araf Ahmed

  return (
    <div className='min-h-screen bg-neutral-900 py-16'>
      <div className='max-w-lg mx-auto px-4'>
        <h1 className='text-4xl text-center font-bold text-white mb-6'>Sign Up</h1>
        <div className='w-24 h-1 bg-amber-400 mx-auto mb-8'></div>
        
        <div className='bg-neutral-800 p-8 rounded-2xl shadow-xl border border-neutral-700'>
          <form onSubmit={} className='flex flex-col gap-4'>
            <input
              type='text'
              placeholder='Username'
              className='bg-neutral-900 border border-neutral-700 p-3 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400 transition-colors'
              id='username'
              onChange={}
            />
            <input
              type='email'
              placeholder='Email'
              className='bg-neutral-900 border border-neutral-700 p-3 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400 transition-colors'
              id='email'
              onChange={}
            />
            <input
              type='password'
              placeholder='Password'
              className='bg-neutral-900 border border-neutral-700 p-3 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400 transition-colors'
              id='password'
              onChange={}
            />

            <button
              disabled={loading}// eacch ditme loading cantnot 
              //if clicked loading otherwise cliackable signUp
              className='bg-amber-400 text-white p-3 rounded-xl uppercase font-semibold hover:bg-amber-500 disabled:opacity-80 transition-colors duration-300 mt-2'
            >
              {loading ? 'Loading...' : 'Sign Up'} 
            </button>
            <OAuth/>
          </form>
          
          <div className='flex gap-2 mt-6 justify-center text-neutral-300'>
            <p>Have an account?</p>
            <Link to={'/sign-in'}>
              <span className='text-amber-400 hover:text-amber-300 transition-colors'>Sign in</span>
            </Link>
          </div>
          
          {error && <p className='text-red-500 text-center mt-5'>{error}</p>}
        </div>
      </div>
    </div>
  );
}

