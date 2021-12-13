import React, { useState, useEffect } from 'react'
import { Box, IconButton, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import BubbleChart from '../../components/Charts/BubbleChart'
import { MOCK_CHART_DATA_FOR_RISK_BETA_LANDSCAPE } from './const'

const useStyles = makeStyles((theme: Theme) => ({
  sectionWrapper: {
    padding: theme.spacing(4, 0),
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

const RiskBetaLandscapeChart: React.FC = (props) => {
  const classes = useStyles(props)
  const [chartData, setChartData] = useState(MOCK_CHART_DATA_FOR_RISK_BETA_LANDSCAPE)

  return (
    <Box className={classes.sectionWrapper} display="flex" flexDirection="column">
      <Box className={classes.sectionHeader}>
        <Box display="flex">
          <Typography className={classes.sectionTitle} variant="h5">
            Risk/Beta Landscape
          </Typography>
        </Box>
        <IconButton className={classes.menuIconButton}>
          <MoreVertIcon className={classes.menuIcon} />
        </IconButton>
      </Box>
      <Box className={classes.chartWrapper} flexGrow={1}>
        <BubbleChart lines={chartData} />
      </Box>
    </Box>
  )
}

export default RiskBetaLandscapeChart
