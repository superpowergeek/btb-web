import React, { useState } from 'react'
import { Box, IconButton, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { MOCK_TOP_FIVE_CHART_LABELS, MOCK_CHART_DATA_FOR_TOP_FIVE } from './const'
import DoughnutChart from '../../components/Charts/DoughnutChart'

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

const TopFiveAssetsChart: React.FC = (props) => {
  const classes = useStyles(props)

  const [chartLabel, setChartLabel] = useState(MOCK_TOP_FIVE_CHART_LABELS)
  const [chartData, setChartData] = useState(MOCK_CHART_DATA_FOR_TOP_FIVE)

  return (
    <Box className={classes.sectionWrapper} display="flex" flexDirection="column">
      <Box className={classes.sectionHeader}>
        <Box display="flex">
          <Typography className={classes.sectionTitle} variant="h5">
            Top 5 Assets
          </Typography>
        </Box>
        <IconButton className={classes.menuIconButton}>
          <MoreVertIcon className={classes.menuIcon} />
        </IconButton>
      </Box>
      <Box className={classes.chartWrapper} flexGrow={1}>
        <DoughnutChart doughnuts={chartData} labels={chartLabel} />
      </Box>
    </Box>
  )
}

export default TopFiveAssetsChart
