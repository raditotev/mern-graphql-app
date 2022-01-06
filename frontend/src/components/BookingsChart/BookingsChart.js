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

import './BookingsChart.css';

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
      display: false,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Bookings by price',
    },
  },
  scales: {
    y: {
      max: 0,
    },
  },
};
const labels = ['Cheap', 'Normal', 'Expensive'];

const BookingsChart = ({ bookings }) => {
  const priceBuckets = {
    cheap: 0,
    normal: 0,
    expensive: 0,
  };

  bookings.forEach(({ event }) => {
    const { price } = event;
    if (price < 101) {
      priceBuckets.cheap++;
      return;
    }
    if (price < 201) {
      priceBuckets.normal++;
      return;
    }
    priceBuckets.expensive++;
  });

  options.scales.y.max = priceBuckets.expensive + 1;
  const data = {
    labels,
    datasets: [
      {
        label: 'Bookings',
        data: Object.values(priceBuckets),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <div className="booking-chart">
      <Bar options={options} data={data} />
    </div>
  );
};

export default BookingsChart;
