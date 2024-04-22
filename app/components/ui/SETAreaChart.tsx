import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

const SETAreaChart = () => {

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#718EBF',
        }
      },
      y: {
        ticks: {
          color: '#718EBF',
        }
      }
    }
  }

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
      },
    ],
  }

  return (
    <Line
      options={options}
      data={data}
      className='w-full max-h-[450px]'
    />
  )
}

export default SETAreaChart