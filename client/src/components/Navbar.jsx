import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { 
  useClerk,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton 
} from '@clerk/clerk-react';

const Navbar = () => {
  const { openSignIn } = useClerk();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 lg:px-44 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/">
        <img className="w-32 sm:w-44" src={assets.logo} alt="logo" />
      </Link>

      <div className="flex items-center gap-4">
        {/* When signed in, show the user button */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        {/* When signed out, show Get Started button */}
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