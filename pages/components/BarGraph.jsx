// components/BarGraph.jsx
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Waste Storage Types',
      },
    },
  };
  
  // This is dummy data. Replace with your actual data.
  const data = {
    labels: ['Radioactive', 'Chemical', 'Organic', 'Other'],
    datasets: [
      {
        label: 'Amount of Waste Stored',
        data: [300, 150, 80, 45], // These numbers are examples
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const BarGraph = () => {
    return (
      <div className="bg-white p-4 rounded-md shadow-lg w-1/2"> {/* Adjust the width as needed */}
        <Bar data={data} options={options} />
      </div>
    );
  };
  
  
  export default BarGraph;
  