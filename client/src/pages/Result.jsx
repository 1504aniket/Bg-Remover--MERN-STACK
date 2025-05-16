import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Result = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="mx-4 my-3 lg:mx-44 mt-20 min-h-[75vh]">
      <div className="bg-white rounded-lg px-6 sm:px-8 py-6 drop-shadow-sm">
        
        {/* Image Comparison Container */}
        <div className="flex flex-col sm:grid grid-cols-2 gap-8">
          
          {/* Original Image */}
          <div>
            <p className="font-semibold text-gray-600 mb-2">Original</p>
            <img className="rounded-md border" src={assets.image_w_bg} alt="Original" />
          </div>

          {/* Background Removed Image */}
          <div className="flex flex-col">
            <p className="font-semibold text-gray-600 mb-2">Background Removed</p>
            <div className="relative rounded-md border border-gray-300 h-full overflow-hidden bg-layer flex justify-center items-center">
              
              {!imageLoaded && (
                <div className="absolute z-10">
                  <div className="border-4 border-violet-500 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
                </div>
              )}

              <img
                src={assets.image_wo_bg}
                alt="Without Background"
                className={`transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6">
          <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform">
            Try Another Image
          </button>
          <a
            href={assets.image_wo_bg}
            download
            className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform"
          >
            Download Image
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;
