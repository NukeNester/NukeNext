// components/EmissionsSaved.jsx
import React from 'react';

const EmissionsSaved = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-800">Greenhouse Emissions Prevented</h2>
      <p className="text-3xl font-bold text-blue-600 mt-2">300k Tons of CO2</p>
      <p className="text-sm text-gray-500 mt-1">Contribution to reducing global warming</p>
    </div>
  );
};

export default EmissionsSaved;
