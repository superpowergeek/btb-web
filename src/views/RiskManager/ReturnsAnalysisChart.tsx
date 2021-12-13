import React, { useState } from 'react'
import { Box, IconButton, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import LineChart from '../../components/Charts/LineChart'
import ColorBullet from '../../components/Charts/ColorBullet'
import ToggleGroup from '../../components/ToggleGroup'
import {
  TIME_PERIOD_TOGGLE_OPTIONS,
  VALUE_TOGGLE_OPTIONS,
  CHART_TYPE_TABS,
  MOCK_CHART_LABELS,
  MOCK_CHART_LABELS_FOR_YEAR,
  MOCK_CHART_LABELS_FOR_MONTH,
  MOCK_CHART_LABELS_FOR_WEEK,
  MOCK_CHART_LABELS_FOR_MTD,
} from './const'
import Tabs from '../../components/Tabs'

const useStyles = makeStyles((theme: Theme) => ({
  sectionWrapper: {
    padding: theme.spacing(4, 0),
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
  },
}))

const ReturnsAnalysisChart: React.FC = (props) => {
  const classes = useStyles(props)
  const [returnsAnalysisTime, setReturnsAnalysisTime] = useState(TIME_PERIOD_TOGGLE_OPTIONS[0].value)

  const [returnsAnalysisValueType, setReturnsAnalysisValueType] = useState(VALUE_TOGGLE_OPTIONS[0].value)

  const [returnsAnalysisTab, setReturnsAnalysisTab] = useState(0)
  const [chartLabel, setChartLabel] = useState(MOCK_CHART_LABELS)

  React.useEffect(() => {
    switch (returnsAnalysisTime) {
      case TIME_PERIOD_TOGGLE_OPTIONS[0].value:
        setChartLabel(MOCK_CHART_LABELS)
        break
      case TIME_PERIOD_TOGGLE_OPTIONS[1].value:
        setChartLabel(MOCK_CHART_LABELS_FOR_MTD)
        break
      case TIME_PERIOD_TOGGLE_OPTIONS[2].value:
        setChartLabel(MOCK_CHART_LABELS_FOR_YEAR)
        break
      case TIME_PERIOD_TOGGLE_OPTIONS[3].value:
        setChartLabel(MOCK_CHART_LABELS_FOR_MONTH)
        break
      case TIME_PERIOD_TOGGLE_OPTIONS[4].value:
        setChartLabel(MOCK_CHART_LABELS_FOR_WEEK)
        break
      default:
        break
    }
  }, [returnsAnalysisTime])

  const handleReturnsAnalysisTabChange = (e, newTab) => {
    setReturnsAnalysisTab(newTab)
  }

  const handleReturnsAnalysisTimeToggle = (e) => {
    setReturnsAnalysisTime(e.currentTarget.value)
  }

  const handleReturnsAnalysisValueTypeToggle = (e) => {
    setReturnsAnalysisValueType(e.currentTarget.value)
  }

  const getLines = () => {
    if (returnsAnalysisTab === 0) {
      return CHART_TYPE_TABS.map((chart) => ({
        data: chart.chartData,
        color: chart.color,
      }))
    }
    return [
      {
        data: CHART_TYPE_TABS[returnsAnalysisTab].chartData,
        color: CHART_TYPE_TABS[returnsAnalysisTab].color,
      },
    ]
  }

  return (
    <Box className={classes.sectionWrapper}>
      <Box className={classes.sectionHeader}>
        {/* Title and Toggle Buttons */}
        <Box display="flex">
          <Typography className={classes.sectionTitle} variant="h5">
            Returns Analysis
          </Typography>
          <ToggleGroup
            options={TIME_PERIOD_TOGGLE_OPTIONS}
            value={returnsAnalysisTime}
            handleChange={handleReturnsAnalysisTimeToggle}
          />
        </Box>
        {/* Value Type Buttons */}
        <Box display="flex">
          <ToggleGroup
            options={VALUE_TOGGLE_OPTIONS}
            value={returnsAnalysisValueType}
            handleChange={handleReturnsAnalysisValueTypeToggle}
          />
          <IconButton className={classes.menuIconButton}>
            <MoreVertIcon className={classes.menuIcon} />
          </IconButton>
        </Box>
      </Box>
      {/* Tabs */}
      <Box className={classes.sectionHeader}>
        <Tabs
          value={returnsAnalysisTab}
          onChange={handleReturnsAnalysisTabChange}
          items={CHART_TYPE_TABS.map((tab: any) => tab.title)}
        />
        <Box display="flex" alignItems="center" justifyContent="center">
          <ColorBullet title={CHART_TYPE_TABS[1].title} color={CHART_TYPE_TABS[1].color} />
          <ColorBullet title={CHART_TYPE_TABS[2].title} color={CHART_TYPE_TABS[2].color} />
          <ColorBullet title={CHART_TYPE_TABS[3].title} color={CHART_TYPE_TABS[3].color} />
        </Box>
      </Box>
      <Box className={classes.chartWrapper}>
        <LineChart lines={getLines()} labels={chartLabel} valueType={returnsAnalysisValueType} />
      </Box>
    </Box>
  )
}

export default ReturnsAnalysisChart
