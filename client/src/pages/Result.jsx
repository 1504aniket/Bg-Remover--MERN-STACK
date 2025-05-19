import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const { resultimage, image, setimage, setresultimage } = useContext(AppContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleTryAnother = () => {
    setimage(null);
    setresultimage(null);
    navigate('/');
  };

  const handleDownload = (e) => {
    if (!resultimage || !imageLoaded) {
      e.preventDefault();
      toast.error('Image not ready for download');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4 text-center">Image Result</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow">
        {/* Original Image */}
        <div>
          <p className="font-semibold text-gray-600 mb-2">Original Image</p>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Original"
              className="w-full border rounded"
            />
          ) : (
            <div className="text-gray-500 italic">No image selected</div>
          )}
        </div>

        {/* Processed Image */}
        <div>
          <p className="font-semibold text-gray-600 mb-2">Background Removed</p>
          {!resultimage ? (
            <div className="text-gray-500 italic">Processing image...</div>
          ) : imageError ? (
            <div className="text-red-500">
              Failed to load image.{' '}
              <button
                onClick={() => setImageError(false)}
                className="text-blue-600 underline ml-2"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="relative">
              {!imageLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10">
                  <div className="animate-spin h-8 w-8 border-4 border-violet-600 border-t-transparent rounded-full mb-2"></div>
                  <p className="text-sm text-gray-500">Loading image...</p>
                </div>
              )}
              <img
                src={resultimage}
                alt="Without Background"
                className={`w-full border rounded transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  console.error('❌ Failed to load result image:', resultimage?.slice(0, 100));
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mt-6 gap-4 flex-wrap">
        <button
          onClick={handleTryAnother}
          className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-transform hover:scale-105"
        >
          Try Another Image
        </button>

        {resultimage && imageLoaded && !imageError && (
          <a
            href={resultimage}
            download="image-without-bg.png"
            onClick={handleDownload}
            className="bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700 transition-transform hover:scale-105"
          >
            Download Image
          </a>
        )}
      </div>
    </div>
  );
};

export default Result;
