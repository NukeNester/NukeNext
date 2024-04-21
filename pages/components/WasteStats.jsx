import React from 'react';

const WasteStats = ({ wasteData }) => {
  // Check if wasteData is undefined or null
  if (!wasteData || !Array.isArray(wasteData)) {
    return <div>No data available</div>;
  }

  // Calculate total waste by summing up the quantities from each order
  const totalWaste = wasteData.reduce((acc, order) => acc + wasteData.quantity, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-800">Total Waste</h2>
      <p className="text-2xl font-bold text-green-600 mt-2">{totalWaste} Tons</p>
    </div>
  );
};

export default WasteStats;