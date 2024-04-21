import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = ({ wasteData }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  
  // Initialize an array with zeros for each month
  const monthlyQuantities = new Array(12).fill(0);
  
  // Aggregate quantities by month
  wasteData.forEach(order => {
    const date = new Date(order.dateOrdered);
    const month = date.getMonth(); // getMonth returns the month (0-indexed)
    monthlyQuantities[month] += order.quantity;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Waste Quantity',
        data: monthlyQuantities,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Waste Management',
      },
    },
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow-lg w-full h-[350px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;