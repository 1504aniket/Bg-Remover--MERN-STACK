import React from 'react';
import { assets } from '../assets/assets';

const Steps = () => {
  return (
    <div className="mx-4 lg:mx-44 py-20 xl:py-40">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
        Steps to remove background <br /> image in seconds
      </h1>

      <div className="flex flex-wrap justify-center gap-6 mt-16 xl:mt-24">
        {/* Step 1 */}
        <div className="flex items-start gap-5 bg-white border rounded-xl shadow-md p-6 sm:p-7 hover:scale-105 transition-transform duration-300 w-[280px] sm:w-[300px]">
          <img src={assets.upload_icon} alt="Upload Icon" className="w-10 h-10" />
          <div>
            <p className="text-xl font-medium">Upload Image</p>
            <p className="text-sm text-neutral-500 mt-1">
              Select your image from your device to get started.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-5 bg-white border rounded-xl shadow-md p-6 sm:p-7 hover:scale-105 transition-transform duration-300 w-[280px] sm:w-[300px]">
          <img src={assets.remove_bg_icon} alt="Remove BG Icon" className="w-10 h-10" />
          <div>
            <p className="text-xl font-medium">Remove Background</p>
            <p className="text-sm text-neutral-500 mt-1">
              Our AI automatically removes the background in seconds.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-5 bg-white border rounded-xl shadow-md p-6 sm:p-7 hover:scale-105 transition-transform duration-300 w-[280px] sm:w-[300px]">
          <img src={assets.download_icon} alt="Download Icon" className="w-10 h-10" />
          <div>
            <p className="text-xl font-medium">Download Image</p>
            <p className="text-sm text-neutral-500 mt-1">
              Instantly download your background-free image.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
