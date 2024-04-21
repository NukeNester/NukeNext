// components/WasteStats.jsx
import React from 'react';

const WasteStats = ({ wasteData }) => {
  // Function to calculate total quantity
  const totalWaste = wasteData.reduce((acc, order) => acc + order.quantity, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-800">Total Nuclear Waste Stored</h2>
      <p className="text-2xl font-bold text-green-600 mt-2">{totalWaste} Tons</p>
      <p className="text-sm text-gray-500 mt-1">Your waste management in tons</p>
    </div>
  );
};

export default WasteStats;
