import React, { useState } from 'react'
import { Box, IconButton, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import LineChart from '../../components/Charts/LineChart'
import ToggleGroup from '../../components/ToggleGroup'
import {
  TIME_PERIOD_TOGGLE_OPTIONS,
  VALUE_TOGGLE_OPTIONS,
  MOCK_STRATEGY_CHART_LABELS,
  MOCK_CHART_DATA_FOR_STRATEGY,
} from './const'

const useStyles = makeStyles((theme: Theme) => ({
  sectionWrapper: {
    padding: theme.spacing(4, 2),
    borderLeft: `1px solid ${theme.palette.border.secondary}`,
    height: '100%',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    marginRight: theme.spacing(1),
    lineHeight: 1,
  },
  menuIconButton: {
    marginLeft: theme.spacing(1),
  },
  menuIcon: {
    color: theme.palette.text.light,
    fontSize: theme.typography.pxToRem(12),
  },
  chartWrapper: {
    marginTop: theme.spacing(3),
    height: 'calc(100% - 64px)',
  },
}))

const PerformanceStrategyChart: React.FC = (props) => {
  const classes = useStyles(props)
  const [performanceHistoryTime, setPerformanceHistoryTime] = useState(TIME_PERIOD_TOGGLE_OPTIONS[0].value)

  const [performanceHistoryValueType, setPerformanceHistoryValueType] = useState(VALUE_TOGGLE_OPTIONS[0].value)

  const [chartLabel, setChartLabel] = useState(MOCK_STRATEGY_CHART_LABELS)
  const [chartData, setChartData] = useState([
    {
      data: MOCK_CHART_DATA_FOR_STRATEGY.YTD,
      color: MOCK_CHART_DATA_FOR_STRATEGY.color,
    },
  ])

  React.useEffect(() => {
    switch (performanceHistoryTime) {
      case TIME_PERIOD_TOGGLE_OPTIONS[0].value:
        setChartData([
          {
            color: MOCK_CHART_DATA_FOR_STRATEGY.color,
            data: MOCK_CHART_DATA_FOR_STRATEGY.YTD,
          },
        ])
        break
      case TIME_PERIOD_TOGGLE_OPTIONS[1].value:
        setChartData([
          {
            color: MOCK_CHART_DATA_FOR_STRATEGY.color,
            data: MOCK_CHART_DATA_FOR_STRATEGY.MTD,
          },
        ])
        break
      case TIME_PERIOD_TOGGLE_OPTIONS[2].value:
        setChartData([
          {
            color: MOCK_CHART_DATA_FOR_STRATEGY.color,
            data: MOCK_CHART_DATA_FOR_STRATEGY.TY,
          },
        ])
        break
      case TIME_PERIOD_TOGGLE_OPTIONS[3].value:
        setChartData([
          {
            color: MOCK_CHART_DATA_FOR_STRATEGY.color,
            data: MOCK_CHART_DATA_FOR_STRATEGY.TM,
          },
        ])
        break
      case TIME_PERIOD_TOGGLE_OPTIONS[4].value:
        setChartData([
          {
            color: MOCK_CHART_DATA_FOR_STRATEGY.color,
            data: MOCK_CHART_DATA_FOR_STRATEGY.TW,
          },
        ])
        break
      default:
        break
    }
  }, [performanceHistoryTime])

  const handlePerformanceHistoryTimeToggle = (e) => {
    setPerformanceHistoryTime(e.currentTarget.value)
  }

  return (
    <Box className={classes.sectionWrapper} display="flex" flexDirection="column">
      <Box className={classes.sectionHeader}>
        <Box display="flex">
          <Typography className={classes.sectionTitle} variant="h5">
            Performance by Strategy
          </Typography>
        </Box>
        <IconButton className={classes.menuIconButton}>
          <MoreVertIcon className={classes.menuIcon} />
        </IconButton>
      </Box>
      <Box mt={1.5} mb={1}>
        <ToggleGroup
          options={TIME_PERIOD_TOGGLE_OPTIONS}
          value={performanceHistoryTime}
          handleChange={handlePerformanceHistoryTimeToggle}
        />
      </Box>
      <Box className={classes.chartWrapper} flexGrow={1}>
        <LineChart
          lines={chartData}
          labels={chartLabel}
          valueType={performanceHistoryValueType}
          isVertical={false}
          maintainAspectRatio={false}
        />
      </Box>
    </Box>
  )
}

export default PerformanceStrategyChart
