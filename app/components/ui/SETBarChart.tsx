"use client"

import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SETBarChart = () => {

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

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: '#BEECE1',
        borderRadius: 8
      },
      {
        label: 'Expense',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: '#FCD4CF',
        borderRadius: 8
      },
      {
        label: 'Savings',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: '#F5E6C2',
        borderRadius: 8
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
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
  };

  return (
    <div>
      <Bar
        data={data}
        options={options}
      />
    </div>
  )
}

export default SETBarChart