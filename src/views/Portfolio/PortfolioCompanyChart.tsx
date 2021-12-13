import React, { useState, useEffect } from 'react'
import { Box, IconButton, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import LineChart from '../../components/Charts/LineChart'
import ToggleGroup from '../../components/ToggleGroup'
import {
  TIME_PERIOD_TOGGLE_OPTIONS,
  VALUE_TOGGLE_OPTIONS,
  CHART_TYPE_TABS_FOR_COMPANY,
  CHART_TYPE,
  MOCK_COMPANY_CHART_LABELS,
} from '../Performance/const'
import Tabs from '../../components/Tabs'

const useStyles = makeStyles((theme: Theme) => ({
  sectionWrapper: {
    padding: theme.spacing(1, 0),
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

const PortfolioCompanyChart: React.FC = (props) => {
  const classes = useStyles(props)
  const [performanceHistoryTime, setPerformanceHistoryTime] = useState(TIME_PERIOD_TOGGLE_OPTIONS[0].value)

  const [performanceHistoryValueType, setPerformanceHistoryValueType] = useState(VALUE_TOGGLE_OPTIONS[0].value)

  const [performanceHistoryTab, setPerformanceHistoryTab] = useState(0)
  const [chartLabel, setChartLabel] = useState(MOCK_COMPANY_CHART_LABELS)
  const [chartData, setChartData] = useState([
    {
      data: CHART_TYPE_TABS_FOR_COMPANY[0].chartData.YTD,
      color: CHART_TYPE_TABS_FOR_COMPANY[0].color,
    },
  ])

  const getChartDataPerTime = (historyTab: number, period: string) => {
    switch (period) {
      case TIME_PERIOD_TOGGLE_OPTIONS[0].value:
        return [
          {
            color: CHART_TYPE_TABS_FOR_COMPANY[historyTab].color,
            data: CHART_TYPE_TABS_FOR_COMPANY[historyTab].chartData.YTD,
          },
        ]
      case TIME_PERIOD_TOGGLE_OPTIONS[1].value:
        return [
          {
            color: CHART_TYPE_TABS_FOR_COMPANY[historyTab].color,
            data: CHART_TYPE_TABS_FOR_COMPANY[historyTab].chartData.MTD,
          },
        ]
      case TIME_PERIOD_TOGGLE_OPTIONS[2].value:
        return [
          {
            color: CHART_TYPE_TABS_FOR_COMPANY[historyTab].color,
            data: CHART_TYPE_TABS_FOR_COMPANY[historyTab].chartData.TY,
          },
        ]
      case TIME_PERIOD_TOGGLE_OPTIONS[3].value:
        return [
          {
            color: CHART_TYPE_TABS_FOR_COMPANY[historyTab].color,
            data: CHART_TYPE_TABS_FOR_COMPANY[historyTab].chartData.TM,
          },
        ]
      case TIME_PERIOD_TOGGLE_OPTIONS[4].value:
        return [
          {
            color: CHART_TYPE_TABS_FOR_COMPANY[historyTab].color,
            data: CHART_TYPE_TABS_FOR_COMPANY[historyTab].chartData.TW,
          },
        ]
      default:
        return [
          {
            color: CHART_TYPE_TABS_FOR_COMPANY[historyTab].color,
            data: CHART_TYPE_TABS_FOR_COMPANY[historyTab].chartData.YTD,
          },
        ]
    }
  }

  useEffect(() => {
    setChartData(getChartDataPerTime(performanceHistoryTab, performanceHistoryTime))
  }, [performanceHistoryTime, performanceHistoryTab])

  const handlePerformanceHistoryTabChange = (e, newTab) => {
    setPerformanceHistoryTab(newTab)
  }

  const handlePerformanceHistoryValueTypeToggle = (e) => {
    setPerformanceHistoryValueType(e.currentTarget.value)
  }

  return (
    <Box className={classes.sectionWrapper} display="flex" flexDirection="column">
      <Box className={classes.sectionHeader}>
        {/* Title and Toggle Buttons */}
        <Box display="flex">
          <Typography className={classes.sectionTitle} variant="h5">
            Company Sector Widgets
          </Typography>
        </Box>
        {/* Value Type Buttons */}
        <Box display="flex">
          <ToggleGroup
            options={VALUE_TOGGLE_OPTIONS}
            value={performanceHistoryValueType}
            handleChange={handlePerformanceHistoryValueTypeToggle}
          />
          <IconButton className={classes.menuIconButton}>
            <MoreVertIcon className={classes.menuIcon} />
          </IconButton>
        </Box>
      </Box>
      {/* Tabs */}
      <Box className={classes.sectionHeader}>
        <Tabs
          value={performanceHistoryTab}
          onChange={handlePerformanceHistoryTabChange}
          items={CHART_TYPE_TABS_FOR_COMPANY.map((tab: any) => tab.title)}
        />
      </Box>
      <Box className={classes.chartWrapper} flexGrow={1}>
        <LineChart
          lines={chartData}
          labels={chartLabel}
          valueType={performanceHistoryValueType}
          maintainAspectRatio={false}
          type={CHART_TYPE.bar}
        />
      </Box>
    </Box>
  )
}

export default PortfolioCompanyChart
