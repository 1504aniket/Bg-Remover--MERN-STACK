import React from 'react';
import { assets, plans } from '../assets/assets';

const BuyCredit = () => {
  return (
    <div className="min-h-screen px-4 py-30 md:px-16 lg:px-32 bg-white">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-sm font-medium text-violet-600 uppercase tracking-wide mb-2">
          Our Plans
        </h2>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Choose the plan that’s right for you
        </h1>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col items-center text-center"
          >
            <img width={80} src={assets.logo} alt="logo" className="mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">{plan.id}</h3>
            <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>

            <div className="text-3xl font-bold text-gray-900 mb-1">${plan.price}</div>
            <p className="text-sm text-gray-500 mb-6">{plan.credits} credits</p>

            <button className="w-full mt-auto bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-medium py-2.5 px-6 rounded-full hover:scale-105 transition-transform duration-300">
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
