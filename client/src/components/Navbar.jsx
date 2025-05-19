import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import {
  useClerk,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  useUser
} from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const { credits, loadingcredits } = useContext(AppContext);
  const navigate=useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      loadingcredits();
    }
  }, [isSignedIn]); // Include isSignedIn in dependency array to avoid infinite loop

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 lg:px-44 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/">
        <img className="w-32 sm:w-44" src={assets.logo} alt="logo" />
      </Link>

      <div   className="flex items-center gap-4">
        {/* Show Credits if signed in */}
        <SignedIn>
          <div onClick={()=>navigate('/buy')} role='button' className="cursor-pointer hidden sm:flex items-center gap-2 bg-zinc-100 px-4 py-2 rounded-full text-sm font-medium text-zinc-800 shadow-inner">
            <span >Credits:</span>
            <span className="text-green-600 font-semibold">{credits}</span>
          </div>
        </SignedIn>

        {/* User Button when signed in */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        {/* Get Started button when signed out */}
        <SignedOut>
          <button
            onClick={() => openSignIn()}
            className="bg-zinc-800 text-white flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm rounded-full hover:bg-zinc-900 transition-all duration-300"
          >
            Get started
            <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="icon" />
          </button>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
