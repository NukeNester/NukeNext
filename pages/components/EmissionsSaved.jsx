import React from 'react';

const EmissionsSaved = ({ wasteData }) => {
  // Assuming 'quantity' is in tons of uranium and each ton of uranium avoids 30,738 tons of CO2
  const co2AvoidedPerTonUranium = 30738;
  const totalUranium = wasteData.reduce((acc, order) => acc + order.quantity, 0);
  const totalCO2Avoided = totalUranium * co2AvoidedPerTonUranium;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
    <h2 className="text-lg font-semibold text-gray-800 mb-3">Stopped Emissions</h2>
    <p className="text-2xl font-bold text-blue-600 mt-2">{totalCO2Avoided.toLocaleString()} Tons of CO2</p>
    <p className="text-sm text-gray-500 mt-1">Contribution to reducing global warming</p>
  </div>
  
  );
};

export default EmissionsSaved;
