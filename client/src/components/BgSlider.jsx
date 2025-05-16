import React, { useState } from 'react';
import { assets } from '../assets/assets';

const BgSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    
    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 pb-10">
            {/* Title - you might want to add your title text here */}
            <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 mb-8 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>
                Remove Background With High Quality and Accuracy
            </h1>
            
            <div className="relative w-full h-auto">
                {/* Base image (with background) */}
                <img 
                    src={assets.image_w_bg} 
                    alt="With background" 
                    className="w-full h-auto block"
                />
                
                {/* Image to compare (without background) - clipped based on slider position */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <img 
                        src={assets.image_wo_bg}  // Assuming you have this image
                        alt="Without background" 
                        className="w-full h-auto block"
                        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                    />
                </div>
                
                {/* Slider control */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={handleSliderChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                />
                
                {/* Slider line and handle */}
                <div 
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-md z-5"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute -left-2 -ml-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BgSlider;