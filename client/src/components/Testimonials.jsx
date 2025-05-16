import React from 'react';
import { testimonialsData } from '../assets/assets'; // Make sure the import path is correct
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  return (
    <div className="px-4 lg:px-44 py-20 bg-[#f8f9fb]">
      {/* Title */}
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 py-5">
        Customer Testimonials
      </h1>

      {/* Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {testimonialsData.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300"
          >
            <FaQuoteLeft className="text-xl text-gray-300 mb-4" />

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {testimonial.text}
            </p>

            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">{testimonial.author}</p>
                <p className="text-xs text-gray-500">{testimonial.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
