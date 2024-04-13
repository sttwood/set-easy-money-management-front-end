"use client"

import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {Pie} from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const SETPieChart = () => {

  const labels = [
    'Salary',
    'Freelance',
    'Food',
    'Snacks',
    'Bills'
  ]

  const data = {
    labels,
    datasets: [
      {
        label: '# total amount',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderWidth: 0,
      },
    ]
  }

  return (
    <div>
      <Pie
        data={data}
      />
    </div>
  )
}

export default SETPieChart