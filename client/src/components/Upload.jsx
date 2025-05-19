import React, { useContext } from 'react';
import { assets } from '../assets/assets'; // Don't forget to import your assets
import { AppContext } from '../context/AppContext';

const Upload = () => {
  const{removeBG}=useContext(AppContext)
  return (
    <div className="pb-20 text-center">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6">
        See the magic. Try now
      </h1>

      {/* Upload Button */}
      <div className="mt-6">
        <input onChange={e=> removeBG(e.target.files[0])}  type="file" accept='image/*' id="upload1" hidden />
        <label
          htmlFor="upload1"
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition-transform duration-300 shadow-md"
        >
          <img width={20} src={assets.upload_btn_icon} alt="Upload Icon" />
          <span className="text-white text-sm">Upload your image</span>
        </label>
      </div>
    </div>
  );
};

export default Upload;
