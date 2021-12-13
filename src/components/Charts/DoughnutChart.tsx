import React from 'react'
import { Box, Typography, Theme } from '@material-ui/core'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import { Doughnut } from 'react-chartjs-2'

interface ModelDoughnut {
  data: number[]
  color: string
}

interface DoughnutChartProps {
  doughnuts: ModelDoughnut[]
  labels: string[]
}

const datasetKeyProvider = () => {
  return Math.random()
}

const useStyles = makeStyles((theme: Theme) => ({
  sumContainer: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  bottomContainer: {
    position: 'relative',
  },
  bottomList: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1, 0),
    alignItems: 'center',
  },
  listIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    margin: theme.spacing(0, 2),
  },
  listText: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}))

const DoughnutChart: React.FC<DoughnutChartProps> = (props) => {
  const { doughnuts, labels } = props
  const classes = useStyles(props)
  const theme = useTheme()
  const getSum = () =>
    doughnuts[0].data
      .reduce((total, num) => total + num, 0)
      .toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
  const nextData = {
    labels,
    datasets: doughnuts.map((obj) => ({
      ...obj,
      backgroundColor: [
        theme.palette.primary.dark,
        theme.palette.primary.main,
        theme.palette.primary.light,
        theme.palette.secondary.main,
        theme.palette.secondary.dark,
      ],
      hoverBackgroundColor: [
        theme.palette.primary.dark,
        theme.palette.primary.main,
        theme.palette.primary.light,
        theme.palette.secondary.main,
        theme.palette.secondary.dark,
      ],
    })),
  }
  // TODO: Allow additional options as props
  const options = {
    cutoutPercentage: 90,
    legend: { display: false },
    maintainAspectRatio: false,
    spanGaps: false,
  }

  return (
    <Box>
      <Box position="relative" height="240px">
        <Doughnut data={nextData} options={options} datasetKeyProvider={datasetKeyProvider} />
        <Box position="absolute" className={classes.sumContainer}>
          <Typography variant="h3">{getSum()}</Typography>
          <Typography variant="body1" align="center">
            Market Value
          </Typography>
        </Box>
      </Box>
      <Box className={classes.bottomContainer}>
        {nextData.datasets[0].data.map((obj, index) => (
          <div className={classes.bottomList}>
            <div
              className={classes.listIcon}
              style={{ backgroundColor: `${nextData.datasets[0].backgroundColor[index]}` }}
            />
            <div className={classes.listText}>
              <div>{`${nextData.labels[index]}`}</div>
              <div>{`${obj.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}</div>
            </div>
          </div>
        ))}
      </Box>
    </Box>
  )
}

export default DoughnutChart
