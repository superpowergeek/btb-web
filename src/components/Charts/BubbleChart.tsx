import React from 'react'
import { Bubble } from 'react-chartjs-2'

interface ModelLine {
  data: Array<{
    x: number
    y: number
    r: number
  }>
  label: string
  color: string
}

interface BubbleChartProps {
  lines: ModelLine[]
  labels?: string[]
}

const getChartConfig = (label, color) => ({
  label,
  fill: false,
  lineTension: 0.1,
  backgroundColor: color,
  borderColor: color,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.5,
  borderJoinStyle: 'miter',
  pointBorderColor: color,
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: color,
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 3,
  pointHitRadius: 10,
})

const BubbleChart: React.FC<BubbleChartProps> = (props) => {
  const { lines, labels } = props
  const nextData = {
    labels,
    datasets: lines.map((line) => ({
      ...getChartConfig(line.label, line.color),
      data: line.data,
    })),
  }

  const optionsHorizontal = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            beginAtZero: true,
            max: 1,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
            zeroLineWidth: 1,
          },
          ticks: {
            beginAtZero: true,
            max: 100,
          },
          barPercentage: 0.6,
        },
      ],
    },
    legend: {
      display: false,
    },
  }

  return <Bubble data={nextData} options={optionsHorizontal} />
}

export default BubbleChart
