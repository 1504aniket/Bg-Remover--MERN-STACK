import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="border-t border-gray-200 px-4 lg:px-44 py-6 flex items-center justify-between gap-4 flex-wrap">
      
      {/* Logo */}
      <img width={150} src={assets.logo} alt="bg.removal logo" />

      {/* Copyright - hidden on small screens */}
      <p className="text-sm text-gray-500 max-sm:hidden">
        © {new Date().getFullYear()} bg.removal | All rights reserved.
      </p>

      {/* Social Icons */}
      <div className="flex gap-5 ml-auto sm:ml-0">
        <img
          src={assets.twitter_icon}
          alt="Twitter"
          className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer"
        />
        <img
          src={assets.facebook_icon}
          alt="Facebook"
          className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer"
        />
        <img
          src={assets.google_plus_icon}
          alt="Google Plus"
          className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Footer;
