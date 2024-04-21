import React from 'react';

const EmissionsSaved = ({ wasteData }) => {
  // Assuming 'quantity' is in tons of uranium and each ton of uranium avoids 30,738 tons of CO2
  const co2AvoidedPerTonUranium = 30738;
  const totalUranium = wasteData.reduce((acc, order) => acc + order.quantity, 0);
  const totalCO2Avoided = totalUranium * co2AvoidedPerTonUranium;

  return (
    <div className="bg-white p-3 rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Emissions Stopped</h2>
      <p className="text-xl md:text-2xl font-bold text-blue-600">{totalCO2Avoided.toLocaleString()}</p>
      <p className="text-sm md:text-base font-bold text-blue-600">Lbs of CO2</p>
    </div>
  );
};

export default EmissionsSaved;
