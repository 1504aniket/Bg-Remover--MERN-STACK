import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-4 lg:px-44 mt-10 sm:mt-20">
      {/* Left Side */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">
          Remove the <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            background
          </span>{' '}
          from <br className="hidden md:block" />
          images for free
        </h1>

        <p className="my-6 text-sm md:text-base text-gray-500 leading-relaxed">
          Instantly remove image backgrounds with smart AI. Fast, free, and effective — no design skills needed.
        </p>

        <div>
          <input type="file" id="upload1" hidden />
          <label
            htmlFor="upload1"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition-transform duration-500"
          >
            <img width={20} src={assets.upload_btn_icon} alt="Upload Icon" />
            <span className="text-white text-sm">Upload your image</span>
          </label>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full max-w-md lg:w-1/2">
        <img src={assets.header_img} alt="Header Preview" className="w-full object-contain" />
      </div>
    </div>
  );
};

export default Header;
