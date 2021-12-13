import React from 'react'
import { Line, HorizontalBar, Bar } from 'react-chartjs-2'
import { switchChart } from '../../utils/chartUtils'
import { CHART_TYPE, CHART_COLOR } from '../../views/Performance/const'

interface ModelLine {
  data: number[]
  color: string
}

interface LineChartProps {
  lines: ModelLine[]
  labels: string[]
  valueType: string
  isVertical?: boolean
  maintainAspectRatio?: boolean
  type?: string
}

const getChartColor = (color: string, data: number[], type: string): string | string[] => {
  if (type === CHART_TYPE.line) {
    return color
  }
  if (type === CHART_TYPE.bar) {
    return data.map((dataValue) => (dataValue > 0 ? color : CHART_COLOR.negative))
  }
  color
}

const getChartConfig = (color: string, data: number[], type: string) => ({
  fill: false,
  lineTension: 0.1,
  backgroundColor: getChartColor(color, data, type),
  borderColor: getChartColor(color, data, type),
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: getChartColor(color, data, type),
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: getChartColor(color, data, type),
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
})

const datasetKeyProvider = () => {
  return Math.random()
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const { lines, labels, valueType, isVertical = true, maintainAspectRatio = true, type = CHART_TYPE.line } = props

  const nextData = {
    labels,
    datasets: lines.map((line) => ({
      ...getChartConfig(line.color, line.data, type),
      data: switchChart(valueType, line.data, labels.length),
    })),
  }

  // TODO: Allow additional options as props
  const options = {
    responsive: true,
    maintainAspectRatio,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
            zeroLineWidth: 1,
          },
        },
      ],
    },
  }

  const optionsHorizontal = {
    responsive: true,
    maintainAspectRatio,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
            zeroLineWidth: 1,
          },
          barPercentage: 0.6,
        },
      ],
    },
    legend: {
      display: false,
    },
  }

  const optionsForBar = {
    responsive: true,
    maintainAspectRatio,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
          barPercentage: 0.6,
        },
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
            zeroLineWidth: 1,
          },
          barPercentage: 0.6,
        },
      ],
    },
    legend: {
      display: false,
    },
  }

  return (
    <>
      {isVertical ? (
        <>
          {type === CHART_TYPE.line && (
            <Line data={nextData} options={options} datasetKeyProvider={datasetKeyProvider} />
          )}
          {type === CHART_TYPE.bar && (
            <Bar data={nextData} options={optionsForBar} datasetKeyProvider={datasetKeyProvider} />
          )}
        </>
      ) : (
        <HorizontalBar data={nextData} options={optionsHorizontal} datasetKeyProvider={datasetKeyProvider} />
      )}
    </>
  )
}

export default LineChart
