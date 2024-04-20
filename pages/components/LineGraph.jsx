// components/LineGraph.jsx
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

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Monthly Energy Consumption',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // This allows the graph to fit into the div size specified
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Energy Consumption Over Time',
    },
  },
};

const LineGraph = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-1/3 h-64"> {/* Adjust width to 1/3 and height as necessary */}
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
